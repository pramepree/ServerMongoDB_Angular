// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://pramepreejobe:hylZa0TEmLlrb6jG@cluster0.znplgct.mongodb.net/articles', { useNewUrlParser: true, useUnifiedTopology: true });

const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = mongoose.model('articles', ArticleSchema);

app.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    const myJSON = JSON.stringify(articles);
    res.json(myJSON);
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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});




// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.send('ssss');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
