const express = require('express');
const cors = require('cors');
const setupSwagger = require('./config/swagger');
require('dotenv').config();

const playlistRoutes = require('./routes/playlistRoutes');
const userRoutes = require('./routes/userRoutes');
const artistRoutes = require('./routes/artistRoutes');
const songRoutes = require('./routes/songRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/playlists', playlistRoutes);

setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`test porta ${PORT}`);
  console.log(`eu testando Swagger Docs: http://localhost:${PORT}/api-docs`);
});
