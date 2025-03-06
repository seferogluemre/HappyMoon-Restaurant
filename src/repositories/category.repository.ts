import db from '../config/database'

interface CategoryCreateBody {
    name: string;
    description: string;
}

const tableName = "categories"

const category_repository = {

    async getCategories() {
        return db(tableName).returning('*');
    },

    async getCategoryById(id: number) {
        return db(tableName).where({ id }).first()
    },

    async createCategory(data: CategoryCreateBody) {
        return db(tableName)
            .insert(data)
            .returning('*');
    },

    async updateCategory(id: number, data: CategoryCreateBody) {
        const updatedData = {
            ...data,
            updated_at: new Date()
        };
        return db(tableName)
            .where({ id })
            .update(updatedData)
            .returning('*');
    },

    async deleteCategory(id: number) {
        return db(tableName).where({ id }).update({ deleted_at: new Date() }).returning('*')
    }

}


export default category_repository;