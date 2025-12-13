require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


const routes = require('./routes/index');
const galleryRoutes = require('./routes/gallery');
const uploadRoutes = require('./routes/upload');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Serve local public as fallback (development)
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/gallery', galleryRoutes);
app.use('/upload', uploadRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
