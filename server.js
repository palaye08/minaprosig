const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Détecter automatiquement le chemin du build
function getDistPath() {
  const possiblePaths = [
    path.join(__dirname, 'dist/porfolio/browser'),
    path.join(__dirname, 'dist/porfolio'),
    path.join(__dirname, 'dist/browser'),
  ];

  for (const distPath of possiblePaths) {
    if (fs.existsSync(distPath)) {
      console.log(`📁 Dossier dist trouvé: ${distPath}`);
      return distPath;
    }
  }

  console.error('❌ Aucun dossier dist trouvé!');
  process.exit(1);
}

const distPath = getDistPath();

// Servir les fichiers statiques
app.use(express.static(distPath));

// Rediriger toutes les routes vers index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
  console.log(`🌐 Application disponible`);
});