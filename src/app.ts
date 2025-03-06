import express from 'express'
import category_routes from './routes/category.routes'
import product_routes from './routes/product.routes'

const app = express()

app.use(express.json())

app.use('/categories', category_routes)
app.use('/products', product_routes)


app.listen(process.env.PORT || 3000, () => {
    console.log(`Sunucu Şu Port'da ayakta!!! ${process.env.PORT}`)
})