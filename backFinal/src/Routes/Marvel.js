const express=require('express');
const router = express.Router();


const ctl=require('../Controllers/ApiMarvel');

router.get("/getComics",ctl.getCharacters);
router.post("/ComicsByLetter",ctl.ComicsByFirstLetter);
//ocupa parametro el cual es { "letter":"x"}
// router.post("/getCafeteria",cafeteria.getCafeteria);
// router.post("/altaCafeteria",cafeteria.altaCafeteria);

module.exports=router;