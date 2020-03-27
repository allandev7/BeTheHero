// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      port: '5433',
      database: 'tobehero',
      user: 'postgres',
      password: 'admin'
    },
    migrations:{
      directory: './src/database/migrations'
    }
  },

  test: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      port: '5433',
      database: 'tobeherotest',
      user: 'postgres',
      password: 'admin'
    },
    migrations:{
      directory: './src/database/migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
