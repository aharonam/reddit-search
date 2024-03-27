const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const port = process.env.PORT || 5001;

app.get('/api/search', async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ message: 'Search term is required' });
    }

    try {
        const response = await axios.get(`https://www.reddit.com/search.json?q=${q}&sort=new`);
        const results = response.data.data.children.map((child) => ({
            id: child.data.id,
            // Access properties only if they exist in the response
            author: child.data.author,
            url: child.data.url,
            title: child.data.title,
            selftext: child.data.selftext,
            thumbnail: child.data.thumbnail,
            preview: child.data.preview && child.data.preview.images && child.data.preview.images[0].source.url,
        }));
        res.json({ results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching results' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
