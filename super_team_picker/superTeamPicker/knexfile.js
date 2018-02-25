// Update with your config settings.

const sharedConfig = {
  client: 'pg', // this proprty tells knex which type of db we're using
  pool: {
    // this property configures how many db connections are open
    //  at a time to do multiple things
    min: 2,
    max: 10
  },
  migrations: {
    // this property configures the table used to keep track
    //  of our migration files and the location of the files
    // in our project
    tableName: 'knex_migrations',
    directory: './db/migrations'
  }
};


module.exports = {

  development: {
    ... sharedConfig, // ... when used with object will merge in all properties
    connection: {
      // this property tell connect where database can be found
      // (e.g. username, password, ip, db name, etc)
      database: 'super_team_picker_dev'
    }
  },

  staging: {
    ... sharedConfig, // ... when used with object will merge in all properties
    connection: {
      database: 'super_team_picker_staging'
    }
  },

  production: {
    ... sharedConfig, // ... when used with object will merge in all properties
    connection: {
      database: 'super_team_picker_production'
    }
  }

};
