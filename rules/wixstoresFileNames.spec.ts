require('babel-eslint');
const RuleTester = require('eslint').RuleTester;
import rule from './wixstores-file-names';

const ruleTester = new RuleTester({
    parser: '@typescript-eslint/parser',
});

ruleTester.run('wixstores-file-names', rule as any, {
    valid: [
        //react components
        {
            code: `let a`,
            filename: 'src/not_components/AA/aaa.tsx',
        },
        {
            code: ``,
            filename: 'src/components/AA/aaa.ts',
        }, {
            code: ``,
            filename: 'src/components/ProductItem/ProductItem.tsx',
        }, {
            code: ``,
            filename: '/src/components/RadioOption/RadioOption.spec.ts',
        },
        //testkits
        {
            code: ``,
            filename: 'src/a.testKit.ts',
        },
        {
            code: ``,
            filename: 'src/atestKitblabla.ts',
        },
        //everything else should be camelCase
        {
            code: ``,
            filename: 'src/camelCase.ts',
        },
        //PascalCase when exported class
        {
            code: `class Test {};`,
            filename: `src/Test.ts`
        },
        {
            code: `class TestDriver {};`,
            filename: 'src/Test.driver.ts',
        },
        {
            code: `describe("lala", () => {})`,
            filename: 'src/Test.spec.ts',
        },
        {
            code: `describe("lala", () => {})`,
            filename: 'src/test.spec.ts',
        }
        ],
    invalid: [
        //react components
        {
            code: `let a;`,
            filename: 'src/components/AA/aaa.tsx',
            errors: [
                {message: "react components file names should be PascalCase", column: 1, line: 1}
            ]
        }, {
            code: `let a;`,
            filename: '/src/components/RadioOption/radio-option.spec.ts',
            errors: [
                {message: "non component files inside the component folder should be either camelCase or PascalCase", column: 1, line: 1}
            ]
        },
        //testkits
        {
            code: `let a;`,
            filename: 'src/a.testkit.ts',
            errors: [
                {message: "testkits file names should end with \".testKit\"", column: 1, line: 1}
            ]
        },{
            code: `let a;`,
            filename: 'src/a.testkit.ts',
            errors: [
                {message: "testkits file names should end with \".testKit\"", column: 1, line: 1}
            ]
        }
        ,{
            code: `let a;`,
            filename: 'src/aTestKit.ts',
            errors: [
                {message: "testkits file names should end with \".testKit\"", column: 1, line: 1}
            ]
        }
        ,{
            code: `let a;`,
            filename: 'src/aTestkit.ts',
            errors: [
                {message: "testkits file names should end with \".testKit\"", column: 1, line: 1}
            ]
        },
        //everything else should be camelCase
        {
            code: `let a;`,
            filename: 'src/PascalCase.ts',
            errors: [
                {message: "file names should be camelCase", column: 1, line: 1}
            ]
        },{
            code: `let a;`,
            filename: 'src/really_weird_name.ts',
            errors: [
                {message: "file names should be camelCase", column: 1, line: 1}
            ]
        },
        //PascalCase when exported class
        {
            code: `class Test {};`,
            filename: 'src/really_weird_name.ts',
            errors: [
                {message: "file names should be camelCase", column: 1, line: 1}
            ]
        },
        {
            code: `class Test {};`,
            filename: 'src/test.ts',
            errors: [
                {message: "class files should be PascalCase", column: 1, line: 1}
            ]
        },
    ]
});
