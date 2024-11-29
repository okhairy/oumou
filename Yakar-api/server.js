const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http'); // Module pour créer un serveur HTTP
const socketIo = require('socket.io'); // Importer socket.io
const Collecte = require('./models/Collecte'); // Si ce modèle n'est pas utilisé, vous pouvez le supprimer
const userRoutes = require('./routes/user');
const collecteRoutes = require('./routes/collecte');
const { swaggerDocs, swaggerUi } = require('./utils/swagger');

// Charger les variables d'environnement
dotenv.config();

// Initialiser l'application Express
const app = express();

// Configurer CORS avant d’ajouter les routes
app.use(
  cors({
    origin: 'http://localhost:4200', // Autoriser Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Méthodes HTTP autorisées
    credentials: true, // Autorise les cookies si nécessaire
  })
);

// Répondre aux pré-requêtes OPTIONS pour CORS
app.options('*', cors());

mongoose.connect('mongodb://localhost/yakarDB');

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Ajouter les routes API
app.use('/api/user', userRoutes);
app.use('/api/collecte', collecteRoutes);

// Route de base pour tester le serveur
app.get('/', (req, res) => {
  res.send("Bienvenue sur l'API YAKAR");
});

// Ajouter Swagger à Express
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Création du serveur HTTP
const server = http.createServer(app);

// Initialiser Socket.IO
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:4200', // Permettre les connexions depuis le frontend Angular
    methods: ['GET', 'POST'],
  },
});

// Gérer les connexions Socket.IO
io.on('connection', (socket) => {
  console.log('Client connecté via Socket.IO');

  // Gérer la déconnexion du client
  socket.on('disconnect', () => {
    console.log('Client déconnecté');
  });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Une erreur est survenue!');
});

// Définir le port et démarrer le serveur HTTP et Socket.IO
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});