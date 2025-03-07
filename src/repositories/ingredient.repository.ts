import db from '../config/database'

interface CreateIngredientBody {
    name: string;
    is_allergen?: boolean;
}

const tableName = "ingredients"

const ingredients_repositories = {

    async getIngredients() {
        return db(tableName).returning('*')
    },

    async getIngredientById(id: number) {
        return db(tableName).where({ id }).first();
    },

    async createIngredient(data: CreateIngredientBody) {
        return db(tableName).insert(data).returning('*')
    },

    async updateIngredient(id: number, data: CreateIngredientBody) {
        const updatedIngredient = {
            ...data,
            updated_at: new Date()
        }
        return db(tableName).where({ id }).update(updatedIngredient).returning('*')
    },

    async deleteIngredient(id: number) {
        return db(tableName).where({ id, deleted_at: null }).update({ deleted_at: new Date() })
    }
}

export default ingredients_repositories;