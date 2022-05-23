const mongoose = require('mongoose');
const app = require('./app/app.js');

require('./routers/malattia.js')
require('./routers/cartellino.js')
require('./routers/user.js');
require('./routers/login.js');
require('./routers/recuperoCredenziali.js');
require('./routers/ferie.js')
require('./routers/dipendenti.js')

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to database"))
    .catch((error) => console.error(`Error connecting to database: ${error}`));

let port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}`));