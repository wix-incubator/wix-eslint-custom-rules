# wix-eslint-custom-rules
Custom ESLint rules used in Wix

## Installation
To install the package:

`npm i -D eslint-plugin-wix-custom-rules`

Then in your `eslintrc` file add the following line:
```json
"plugins": [
    "wix-custom-rules"
]
```

Now you can add any rule you want from the package like so:
```json
{
  "rules":
  {
    "wix-custom-rules/no-wallaby-file-only": "error",
  }
}
```

## Rules

Rule | Description
--- | ---
`wix-custom-rules/no-wallaby-file-only` | Makes sure no `//file.only` comment (Wallby.js annotation) is left by mistake.
`wix-custom-rules/wixstores-file-names` | File names rule - exported class files and react components should be PascalCase, everything else should be camelCase. Testkits should end with `.testKit`.
