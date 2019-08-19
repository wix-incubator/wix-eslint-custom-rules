import {RuleTester} from  'eslint';
import rule from './no-wallaby-file-only';

const ruleTester = new RuleTester({
    parser: '@typescript-eslint/parser',
});

ruleTester.run('no-wallaby-file-only', rule as any, {
    valid: [
        {
            code: `/* aaa */let a;`,
            filename: 'code.ts',
        }
    ],
    invalid: [
        {
            code: `//aaa
            const b = 1;
            //file.only
            let a;`,
            filename: 'code.ts',
            errors: [
                {message: `wallaby comments are not allowed ('//file.only')`, column: 13, line: 3}
            ]
        }
    ]
});
