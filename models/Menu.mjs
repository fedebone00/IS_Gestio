import { mongoose } from 'mongoose';

const Menu = mongoose.model("menu", {data: String,primo: String ,secondo: String,dolce: String});

export default Menu;