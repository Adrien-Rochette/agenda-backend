// Import des modules
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Charge les variables du fichier .env
console.log("📦 DATABASE_URL:", process.env.DATABASE_URL);
const db = require('./db');


// Création de l'application Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Pour lire le JSON envoyé dans les requêtes

// Route test
app.get('/', (req, res) => {
    res.send('🚀 Backend agenda opérationnel');
});

if (!process.env.PORT) {
  throw new Error("❌ PORT n'est pas défini dans les variables d'environnement.");
}

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});


app.get('/test-db', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW()');
        res.json({ time: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
