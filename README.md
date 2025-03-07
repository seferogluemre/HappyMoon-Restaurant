Restaurant Menu Backend
This project is a backend application that manages a restaurant menu. It is developed using TypeScript, Express, PostgreSQL, and Knex.js. The project aims to manage various data related to the restaurant's menu, including categories, products, product ingredients, and ingredients.

Project Structure
The project is organized following the MVC (Model-View-Controller) architecture. It contains the following main structures:

Repositories:
Repositories are used for database operations, abstracting data querying and updating processes. This structure allows for easier management and reusability of database-related tasks.

Routes:
Defines the API endpoints for the application. It includes various RESTful API endpoints for categories, products, ingredients, and more.

Controllers:
Manages the functionality for each API endpoint. It processes incoming requests, performs necessary actions, and sends appropriate responses.

Config:
Contains the configuration files for the application. Database connections and general settings are configured here.

Migrations:
Uses Knex migrations for managing database schema creation and updates. These files make it easy to handle and modify the database structure.

Validation:
The project now includes class-validator for additional validation checks. Class validators are used in the creation and update routes for Categories, Products, and Ingredients to ensure that data adheres to specific formats and constraints before it is processed and stored in the database.

Technologies
TypeScript: For static typing and better code maintainability.
Express: A lightweight web framework for building APIs.
PostgreSQL: A powerful open-source relational database for storing menu data.
Knex.js: A SQL query builder used for interacting with the PostgreSQL database.
Knex Migrations: For handling and versioning the database schema.
class-validator: A library for validating class data in TypeScript, ensuring that the data conforms to certain rules before being processed.
Setup & Installation
Clone the repository:
bash
Kopyala
Düzenle
git clone https://github.com/your-username/restaurant-menu-backend.git
Install dependencies:
bash
Kopyala
Düzenle
cd restaurant-menu-backend
npm install
Set up your PostgreSQL database and configure the connection in the config folder.

Run database migrations:

bash
Kopyala
Düzenle
npm run migrate
Start the server:
bash
Kopyala
Düzenle
npm run dev
The server will now be running at http://localhost:3000.

API Endpoints
Category:
Create Category → POST /categories
List Categories → GET /categories
View Category → GET /categories/:id
Update Category → PATCH /categories/:id
Delete Category → DELETE /categories
Product:
Create Product → POST /products
List Products → GET /products
View Product → GET /products/:id
Update Product → PATCH /products/:id
Delete Product → DELETE /products/:id
Ingredient:
Create Ingredient → POST /ingredients
List Ingredients → GET /ingredients
View Ingredient → GET /ingredients/:id
Update Ingredient → PATCH /ingredients/:id
Delete Ingredient → DELETE /ingredients/:id
Additional Features - Validation Enhancements
As part of the improvements in this project, class-validator has been integrated into the create and update routes for Categories, Products, and Ingredients. This ensures that the data being sent to the backend meets certain standards before being processed or updated in the database. Below are the key validations added:

Category:

Validates required fields like name and description.
Ensures that the name is unique when creating or updating a category.
Product:

Ensures required fields such as name, price, and category_id are provided.
Validates that the price is a valid number.
Ensures that the category_id corresponds to an existing category.
Ingredient:

Ensures required fields like name and quantity are present.
Validates that the quantity is a positive number.
These validation checks help maintain the integrity of the data in the application and provide clear error messages to the user when the input doesn't match the expected formats.
