import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './config/swagger/swagger-output.js'
import './observer/loyaltyObserver.js';
import { adminJs, router as adminRouter } from "./config/admin/admin.js"
import { register } from './routes/index.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

register(app)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected')
    app.use(adminJs.options.rootPath, adminRouter)
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server running...")
    )
  })
  .catch(err => console.error(err))
