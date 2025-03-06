/**
 * @param {import("knex").Knex} knex
 */
module.exports.up = async function (knex) {
    await knex.schema.createTable('ingredients', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.boolean('is_allergen').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').nullable();
        table.timestamp('deleted_at').nullable();
    })
}
/**
 * @param {import("knex").Knex} knex
 */

module.exports.down = async function (knex) {
    await knex.schema.dropTable('ingredients')
}