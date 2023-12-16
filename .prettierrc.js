module.exports = {
  bracketSpacing: false,
  singleQuote: false,
  trailingComma: "none",
  printWidth: 120,
  importOrder:
    [
      "^@nestjs.+$",
      "<THIRD_PARTY_MODULES>",
      ".*module",
      ".*controller",
      ".*service",
      ".*guard",
      ".*\\/utilities\\/.*",
      "^[./]",
    ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
  importOrderParserPlugins: ["typescript", "decorators-legacy"]
}
