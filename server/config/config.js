module.exports = {
  development: {
    port: process.env.PORT || 2000,
    dbPath: 'mongodb://localhost:27017/ContactBook'
  },
  production: {}
};