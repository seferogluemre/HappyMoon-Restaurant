/**
 * @param {import("knex").Knex} knex
 */

module.exports.up = async function (knex) {
    await knex.schema.createTable('categories', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').nullable();
        table.timestamp('deleted_at').nullable();
    })
}
/**
 * @param {import("knex").Knex} knex
 */
module.exports.down = async function (knex) {
    return knex.schema.dropTable("categories");
};