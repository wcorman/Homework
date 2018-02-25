exports.up = function(knex) {
  return knex.schema
  .createTable('team', table => {
    table.increments('id');
    table.string('name');
    table.string('members');
    table.string('logoUrl');
    table.timestamps(false, true);
  });
};

exports.down = function(knex) {
return knex.schema.dropTable('team');
};
