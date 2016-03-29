import postcss from "postcss"
import { get } from "lodash"
import { configurationError } from "./utils"
import ruleDefinitions from "./rules"
import disableRanges from "./disableRanges"
import normalizeRuleSettings from "./normalizeRuleSettings"

export default postcss.plugin("stylelint", (options = {}) => {
  return (root, result) => {
    const config = options.config

    // result.stylelint is the namespace for passing stylelint-related
    // configuration and data across sub-plugins via the PostCSS Result
    result.stylelint = result.stylelint || {}
    result.stylelint.ruleSeverities = {}
    result.stylelint.customMessages = {}

    if (!config) {
      throw configurationError("No configuration provided")
    }

    if (!config.rules) {
      throw configurationError("No rules found within configuration. Have you provided a \"rules\" property?")
    }

    // Register details about the configuration
    result.stylelint.quiet = config.quiet

    // First check for disabled ranges, adding them to the result object
    disableRanges(root, result)

    Object.keys(config.rules).forEach(ruleName => {
      if (!ruleDefinitions[ruleName]) {
        throw configurationError(`Undefined rule "${ruleName}"`)
      }

      const rawRuleSettings = config.rules[ruleName]
      const ruleSettings = normalizeRuleSettings(rawRuleSettings, ruleName)
      const primaryOption = ruleSettings[0]
      const secondaryOptions = ruleSettings[1]

      // Ignore the rule
      if (primaryOption === null) { return }

      // Log the rule's severity in the PostCSS result
      result.stylelint.ruleSeverities[ruleName] = get(secondaryOptions, "severity", "error")
      result.stylelint.customMessages[ruleName] = secondaryOptions && secondaryOptions.message

      // Run the rule with the primary and secondary options
      ruleDefinitions[ruleName](primaryOption, secondaryOptions)(root, result)
    })
  }
})
