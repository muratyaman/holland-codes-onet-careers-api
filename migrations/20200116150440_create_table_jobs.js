
exports.up = function(knex) {
  return knex.schema
    .createTable('gca_jobs', function (table) {
      table.string('id', 10).primary();
      table.string('title_en', 250).notNullable();
      table.string('title_ar', 250).notNullable();
      table.text('description_en').notNullable();
      table.text('description_ar').notNullable();
      table.boolean('active').notNullable().index();
      table.decimal('r', 4, 2).notNullable();
      table.decimal('i', 4, 2).notNullable();
      table.decimal('a', 4, 2).notNullable();
      table.decimal('s', 4, 2).notNullable();
      table.decimal('e', 4, 2).notNullable();
      table.decimal('c', 4, 2).notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('gca_jobs');
};
