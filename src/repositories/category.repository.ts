import db from '../config/database'

interface CategoryCreateBody {
    name: string;
    description: string;
    category_id?: number | null;
}

export interface QueryProps {
    showDeleted?: string;
}

const tableName = "categories"

const category_repository = {

    async getCategories(query: QueryProps) {
        let queryBuilder = db(tableName);

        if (query.showDeleted === "true") {
            queryBuilder = queryBuilder;
        }
        else if (query.showDeleted === "onlyDeleted") {
            queryBuilder = queryBuilder.whereNotNull('deleted_at');
        }
        else {
            queryBuilder = queryBuilder.whereNull('deleted_at');
        }
        return queryBuilder
    },

    async getCategoryById(id: number) {
        return db(tableName).where({ id, deleted_at: null }).first()
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
        return db(tableName).where({ id, deleted_at: null }).update({ deleted_at: new Date() }).returning('*')
    }
}


export default category_repository;