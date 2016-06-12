require('dotenv').config()

module.exports = {

  development: {
    client: 'postgres',
    connection: 'postgres://localhost:5432/dividedb'
  },

  staging: {
    client: 'postgres',
    connection: {
      database: 'dividedb.c4sisckqzvvb.us-east-1.rds.amazonaws.com:5432',
      user:     'dividedb',
      password: 'vdXq*#*YVNB5'
    },
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
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
