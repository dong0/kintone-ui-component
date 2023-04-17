module.exports = {
  verbose: true,

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '.+\\.(css|style)$': 'jest-transform-css'
  },
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
        ignoreCodes: [2322, 2339]
      }
    }
  },

  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

  moduleFileExtensions: ['tsx', 'js', 'ts'],

  testEnvironment: 'jsdom'
};