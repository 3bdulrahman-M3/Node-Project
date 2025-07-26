const config = {
  jwtSecret: "1234567890",
  jwtExpiration: "1h",
  database: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "abdo",
    dbName: "todo_list_app",
  }
};

module.exports = config;
