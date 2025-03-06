import express, { Response } from 'express'

const app = express()

app.use(express.json())


app.listen(process.env.PORT || 3000, () => {
    console.log(`Sunucu Şu Port'da ayakta!!! ${process.env.PORT}`)
})