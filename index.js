const mongoose = require('mongoose');
const app = require('./app/app.js');
require('./routers/user.js');

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to database"))
    .catch((error) => console.error(`Error connecting to database: ${error}`));

let port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}`));