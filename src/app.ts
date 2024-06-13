import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import allNotFound from './app/middlewares/allNotFound'
import router from './app/routes'

const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

// application routes

app.use('/api', router)

app.get('/', async (req: Request, res: Response) => {
  Promise.reject()
  res.send('The server is running')
})

app.use(notFound)
app.use(globalErrorHandler)

app.all('*', allNotFound)

export default app
