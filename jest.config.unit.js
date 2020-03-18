var config = require('./jest.config')
config.testMatch = ['**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)']
module.exports = config
