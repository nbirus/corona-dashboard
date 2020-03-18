var config = require('./jest.config')
config.testMatch = ['**/tests/integration/**/*.spec.(js|jsx|ts|tsx)']
module.exports = config
