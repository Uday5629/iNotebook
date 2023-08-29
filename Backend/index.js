const connectToMongo=require('./db');
const express = require('express');
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000;

app.use(cors())
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
// app.use('/api/check',require('./routes/check'));
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
