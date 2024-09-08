import express from "express";
import path from 'path';
/*
    1-ENTRENCE
*/
const app = express();
console.log("__dirname:", __dirname);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());




/*
    2-SESSIONS
*/
// Authentication vs Authorization

// member: USER & RESTAURANT

// member: USER & AGENT & ADMIN







/*
    3-VIEWS
*/
app.set('view', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');






/*
    4-ROUTERS
*/

export default app; // CommonJS: module.exports = , 