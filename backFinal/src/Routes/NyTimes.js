const express=require('express');
const router = express.Router();


const ctl=require('../Controllers/ApiNyTimes');

 router.get("/getGenres",ctl.getGenres);
 router.post("/byGenre",ctl.BooksByGenres);//parametro { "genre":"Animals"}
 router.post("/articles",ctl.ArticlesKeyword);//parametro { "keyword":"Animals"}
// router.post("/getCafeteria",cafeteria.getCafeteria);
// router.post("/altaCafeteria",cafeteria.altaCafeteria);

module.exports=router; 