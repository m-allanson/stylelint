import postcss from "postcss"
import _ from "lodash"
import scssSyntax from "postcss-scss"
import stylelintPostcssPlugin from "./postcssSimplePlugin"
import * as formatters from "./formatters"

export default function ({
  code,
  codeFilename,
  config,
  syntax,
  formatter = "json",
} = {}) {
  if (typeof code !== "string") {
    throw new Error("You must pass a `code` string, or use the node or CLI APIs to pass a `files` glob")
  }

  const chosenFormatter = (typeof formatter === "string")
    ? formatters[formatter]
    : formatter

  let errored = false

  return lintString(code, codeFilename).then(result => {
    const results = [result]
    const output = chosenFormatter(results)
    return {
      output,
      results,
      errored,
    }
  })

  function lintString(code, filepath) {
    const postcssProcessOptions = {}
    if (filepath) {
      postcssProcessOptions.from = filepath
    }
    if (syntax === "scss") {
      postcssProcessOptions.syntax = scssSyntax
    }

    return postcss()
      .use(stylelintPostcssPlugin({
        config,
      }))
      .process(code, postcssProcessOptions)
      .then(handleResult)

    function handleResult(postcssResult) {
      const source = (!postcssResult.root.source)
        ? undefined
        : postcssResult.root.source.input.file || postcssResult.root.source.input.id

      if (postcssResult.stylelint.stylelintError) { errored = true }

      // Strip out deprecation warnings from the messages
      const deprecations = _.remove(postcssResult.messages, { stylelintType: "deprecation" }).map(d => {
        return {
          text: d.text,
          reference: d.stylelintReference,
        }
      })

      // Also strip out invalid options
      const invalidOptionWarnings = _.remove(postcssResult.messages, { stylelintType: "invalidOption" }).map(w => {
        return { text: w.text }
      })

      return {
        source,
        deprecations,
        invalidOptionWarnings,
        errored: postcssResult.stylelint.stylelintError,
        warnings: postcssResult.messages.map(message => ({
          line: message.line,
          column: message.column,
          rule: message.rule,
          severity: message.severity,
          text: message.text,
        })),
      }
    }
  }
}
