"use strict";
module.exports.up = async function (knex) {
    await knex.schema.createTable('ingredients', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.boolean('is_allergen').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').nullable();
        table.timestamp('deleted_at').nullable();
    });
};
module.exports.down = async function (knex) {
    await knex.schema.dropTable('ingredients');
};
//# sourceMappingURL=20250306114428_ingredients_table.js.map