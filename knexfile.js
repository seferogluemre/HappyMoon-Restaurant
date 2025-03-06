require('dotenv').config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.PORT,
      host: process.env.DB_HOST
    },
    migrations: {
      directory: './src/migrations'
    }
  },
};
