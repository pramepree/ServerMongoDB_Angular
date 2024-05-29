const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const connectionString = process.env.CONNECTION_STRING;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true
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

app.get('/articles', async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
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

app.get('/set-cookie', (req, res) => {
    const articles = [
        { id: 1, title: 'Article 1', content: 'Content of Article 1' },
        { id: 2, title: 'Article 2', content: 'Content of Article 2' },
        { id: 3, title: 'Article 3', content: 'Content of Article 3' },
    ];
    res.cookie('articles', JSON.stringify(articles), { maxAge: 900000, httpOnly: true });
    res.send('Cookie set');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});