const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Servir les fichiers statiques Angular
app.use(express.static(path.join(__dirname, 'dist/minaprosig/browser')));

// Route de fallback pour SPA (Single Page Application)
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/minaprosig/browser/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Application running on port ${port}`);
});