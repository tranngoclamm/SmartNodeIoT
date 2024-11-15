const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routers/authRoutes');
const projectRoutes = require('./routers/projectRoutes');
const datastreamRoutes = require('./routers/datastreamRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api', projectRoutes);
app.use('/api', datastreamRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
