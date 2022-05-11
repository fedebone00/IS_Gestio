import { mongoose } from 'mongoose'
import app from './app/app.mjs'
import './routers/user.mjs'
import './routers/menu.mjs'
import './routers/prenotamensa.mjs'

try {
    await mongoose.connect('mongodb://casataramelli.duckdns.org:270/test');
    console.log("Connected to database");
} catch (error) {
    console.error(`Error connecting to database: ${error}`);
}

app.listen(8080, () => console.log('Listening on port 8080'));