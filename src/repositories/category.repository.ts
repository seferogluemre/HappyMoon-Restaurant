import db from '../config/database'

interface CategoryBody {
    name: string;
    description: string;
}

const category_repository = {
    async createCategory(data: CategoryBody) {
        return db('categories')
            .insert(data)
            .returning('*');
    }
}


export default category_repository;