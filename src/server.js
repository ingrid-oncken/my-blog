import express from 'express'
import mongoose from 'mongoose'
import listEndpoints from 'express-list-endpoints'

const articlesInfo = {
  'learn-react': {
    upvotes: 0,
    comments: [],
  },
  'learn-node': {
    upvotes: 0,
    comments: [],
  },
  'my-thoughts-on-resumes': {
    upvotes: 0,
    comments: [],
  },
}

const app = express()
app.use(express.json())

console.table(listEndpoints(app, 8000))
mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on('connected', () => {
  console.log('🐒 Mongo Connected 👍')
  app.listen(8000, () => {
    console.log(`🏃Server running on port 🚪8000`)
  })
})

app.get('/api/articles/:name', (req, res) => {
  const articleName = req.params.name
})

app.post('/api/articles/:name/upvote', (req, res) => {
  const articleName = req.params.name

  articlesInfo[articleName].upvotes += 1
  res
    .status(200)
    .send(`${articleName} now has ${articlesInfo[articleName].upvotes} upvotes`)
})

app.post('/api/articles/:name/add-comment', (req, res) => {
  const { username, text } = req.body
  const articleName = req.params.name

  articlesInfo[articleName].comments.push({ username, text })
  res.status(200).send(articlesInfo[articleName])
})
