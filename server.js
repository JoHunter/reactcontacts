
const express = require('express')
const app = express();
const connectDB = require('./config/db');

//Connect Database 
connectDB();

//Add Middleware -- now we can accept html body data
app.use(express.json({extended:false }));

app.get('/', (req, res) =>
  res.json({ msg: 'OK Doing it!' }));

  // Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

/**npm run server */