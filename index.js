const mongoose = require('mongoose');
const app = require('./app/app.js');

let port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URL ? process.env.MONGO_URL : 'mongodb://casataramelli.duckdns.org:270/test', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connected to database")
        app.listen(port, () => console.log(`Listening on port ${port}`));
    })
    .catch((error) => console.error(`Error connecting to database: ${error}`));