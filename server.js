const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir les fichiers statiques du dossier dist
app.use(express.static(path.join(__dirname, 'dist/minaprosig/browser')));

// Rediriger toutes les routes vers index.html (pour Angular routing)
// Utiliser '*' au lieu de '/*'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/minaprosig/browser/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
  console.log(`🌐 Application disponible sur http://localhost:${PORT}`);
});