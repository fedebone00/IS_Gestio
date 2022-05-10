import mongoose from "mongoose";

try {
    await mongoose.connect("mongodb://casataramelli.duckdns.org:270/test");
    console.log("Connected to mongodb");
} catch (error) {
    console.log(`Error connecting to mongodb: ${error}`);
}

export const Cat = mongoose.model('cat', { name: String});