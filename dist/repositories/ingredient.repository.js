import db from '../config/database';
const tableName = "ingredients";
const ingredients_repositories = {
    async getIngredients() {
        return db(tableName).returning('*');
    },
    async getIngredientById(id) {
        return db(tableName).where({ id }).first();
    },
    async createIngredient(data) {
        return db(tableName).insert(data).returning('*');
    },
    async updateIngredient(id, data) {
        const updatedIngredient = {
            ...data,
            updated_at: new Date()
        };
        return db(tableName).where({ id }).update(updatedIngredient).returning('*');
    },
    async deleteIngredient(id) {
        return db(tableName).where({ id, deleted_at: null }).update({ deleted_at: new Date() });
    }
};
export default ingredients_repositories;
//# sourceMappingURL=ingredient.repository.js.map