import db from '../config/database';
const tableName = "products";
const product_repositories = {
    async getProducts(query) {
        let queryBuilder = db(tableName);
        if (query.category_id) {
            const id = query.category_id;
            queryBuilder = queryBuilder.where({ category_id: id }).first();
        }
        else if (query.showDeleted === "true") {
            queryBuilder = queryBuilder.whereNotNull('deleted_at');
        }
        else if (query.showDeleted === "onlyDeleted") {
            queryBuilder = queryBuilder.whereNull('deleted_at');
        }
        else {
            queryBuilder = queryBuilder;
        }
        return queryBuilder;
    },
    async getProductById(id) {
        return db(tableName).where({ id, deleted_at: null }).first();
    },
    async createProduct(data) {
        return db(tableName)
            .insert(data)
            .returning('*');
    },
    async updateProduct(id, data) {
        const updatedData = {
            ...data,
            updated_at: new Date()
        };
        return db(tableName)
            .where({ id })
            .update(updatedData)
            .returning('*');
    },
    async deleteProduct(id) {
        return db(tableName).where({ id, deleted_at: null }).update({ deleted_at: new Date() }).returning('*');
    }
};
export default product_repositories;
//# sourceMappingURL=product.repository.js.map