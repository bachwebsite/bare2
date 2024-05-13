const express = require('express');
const app = express();
const port = 8080;

app.get('/caddy/ask', (req, res) => {
    const domain = req.query.domain;
    if (domain) {
        // Perform domain validation logic here
        // For simplicity, we'll just echo back the domain
        res.status(200).send(`Domain validation successful for ${domain}`);
    } else {
        res.status(400).send('No domain provided');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
