export async function up(knex) {
    await knex.schema.createTable('products_ingredients', (table) => {
        table.integer('product_id').references('id').inTable('products').onDelete('CASCADE')
        table.integer('ingredient_id').references('id').inTable('ingredients').onDelete('CASCADE')
    })
}

export async function down(knex) {
    await knex.schema.dropTable('products_ingredients')
}