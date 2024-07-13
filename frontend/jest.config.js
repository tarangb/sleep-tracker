module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.(tsx)$': 'ts-jest',
    },
    // Other configurations...
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!echarts)',
    ],
    testMatch: ['**/test/**/*.test.ts', '**/test/**/*.test.tsx']
};

