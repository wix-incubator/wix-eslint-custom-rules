module.exports = () => ({
    files: ['tsconfig.json', 'src/**/*.ts', 'rules/**/*.ts', 'test/**/*.ts', 'test/**/*.json', '!src/**/*.spec.ts', '!rules/**/*.spec.ts'],

    tests: ['rules/**/*.spec.ts'],

    env: {
        type: 'node',
        runner: 'node'
    },

    testFramework: 'jest'
});
