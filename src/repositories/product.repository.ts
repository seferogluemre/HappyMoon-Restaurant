import db from '../config/database'

interface ProductCreateBody {
    name: string;
    description: string;
    price?: number;
    category_id: number;
}

const tableName = "products"

const product_repositories = {

    async getProducts() {
        return db(tableName).where({ deleted_at: null }).returning('*');
    },

    async getProductById(id: number) {
        return db(tableName).where({ id, deleted_at: null }).first()
    },

    async createProduct(data: ProductCreateBody) {
        return db(tableName)
            .insert(data)
            .returning('*');
    },

    async updateProduct(id: number, data: ProductCreateBody) {
        const updatedData = {
            ...data,
            updated_at: new Date()
        };
        return db(tableName)
            .where({ id })
            .update(updatedData)
            .returning('*');
    },

    async deleteProduct(id: number) {
        return db(tableName).where({ id }).update({ deleted_at: new Date() }).returning('*')
    }

}

export default product_repositories;