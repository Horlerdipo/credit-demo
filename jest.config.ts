/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {

    "setupFiles": ["<rootDir>/jest.setup.ts"],

    clearMocks: true,

    collectCoverage: true,
    coverageDirectory: 'coverage',

    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/src/db/',
    ],

    coverageProvider: 'v8',

    coverageReporters: [
        'json',
        'text',
        'lcov',
        'clover',
    ],
    moduleFileExtensions: [
        'js',
        'ts',
        'tsx',
    ],
    preset: 'ts-jest',
    roots: [
        '<rootDir>',
    ],
    testEnvironment: 'node',
};

export default config;
