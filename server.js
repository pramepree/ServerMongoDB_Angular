const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString, {
  tls: true // Enabling TLS explicitly if needed
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = mongoose.model('articles', ArticleSchema);

app.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json('ssss');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/articles', async (req, res) => {
  try {
    const newArticle = req.body;
    const createdArticle = await Article.create(newArticle);
    res.status(201).json(createdArticle);
  } catch (err) {
    res.status(500).send(err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
