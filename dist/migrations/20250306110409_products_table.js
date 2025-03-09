"use strict";
module.exports.up = async function (knex) {
    await knex.schema.createTable('products', (table) => {
        table.increments('id').primary();
        table.integer('category_id').references('id').inTable('categories').onDelete('CASCADE');
        table.string('name').notNullable();
        table.text('description').nullable();
        table.integer('price').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').nullable();
        table.timestamp('deleted_at').nullable();
    });
};
module.exports.down = async function (knex) {
    await knex.schema.dropTable('products');
};
//# sourceMappingURL=20250306110409_products_table.js.map