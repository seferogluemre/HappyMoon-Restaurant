"use strict";
module.exports.up = async function (knex) {
    await knex.schema.createTable('products_ingredients', (table) => {
        table.integer('product_id').references('id').inTable('products').onDelete('CASCADE');
        table.integer('ingredient_id').references('id').inTable('ingredients').onDelete('CASCADE');
    });
};
module.exports.down = async function (knex) {
    await knex.schema.dropTable('products_ingredients');
};
//# sourceMappingURL=20250306114840_products_ingredients_table.js.map