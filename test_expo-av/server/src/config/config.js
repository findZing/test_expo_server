
module.exports = {
  development: {
    username: 'postgres',
    password: '123',
    database: 'database_development',
    host: "127.0.0.1",
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: '123',
    database: 'database_test',
    host: "127.0.0.1",
    dialect: 'postgres'
  },
  production: {
    username: 'postgres',
    password: '123',
    database: 'database_production',
    host: "127.0.0.1",
    dialect: 'postgres'
  }
}
