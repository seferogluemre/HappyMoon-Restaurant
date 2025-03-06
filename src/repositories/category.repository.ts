import db from '../config/database'

interface CategoryBody {
    name: string;
    description: string;
}

const tableName = "categories"

const category_repository = {

    async getCategories() {
        return db(tableName).returning('*');
    },

    async createCategory(data: CategoryBody) {
        return db(tableName)
            .insert(data)
            .returning('*');
    },

    async getCategoryById(id: number) {
        return db(tableName).where({ id }).first()
    }

}


export default category_repository;