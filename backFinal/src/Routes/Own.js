const express=require('express');
const router = express.Router();

const ctl=require('../Controllers/Own');

router.post("/prueba", ctl.prueba);

router.post("/insert", ctl.insert_Users);
/*
PARAMETROS PARA INSERT
todos son string menos type
"data":[
        {"name":"xxxxx","mail":"xxxxx","password":"xxxxx","type":"xxxxx"}
    ]
*/
router.post("/login", ctl.login_Users);
/*
PARAMETROS PARA INSERT
todos son string 
{"mail":"hola",
    "password":"redes221"}
*/
router.post("/addRating", ctl.addratingBooks_Rating);
/*
 Parametros paea addrating
 hay que estandarizar el campo api quedando, si el es comic pues sera de la api de marvel, y si es libro pues de NY
 entonces para marvel=marvel
             NyTimes=Ny
 todos string menos rate, OJO -> el campo info es variable, porque nose que se va a
                                guardar, me imagino que el nombre del libro o comic, autor,
                                ahi pueden mandar cualquier cosa(en su parte ddel front cuando
                                    reciban la peticion ponen los campos que enviaron para acceder al campo info)
 "data":[
        {
            "mail":"xxxx","api":"NY","info":[{"comic":"xxxx","otrodato":"xxxx"}],"rate":"x"
        }
    ]
 */
router.post("/getRating", ctl.GetratingBooks_Rating);
/*
    Paremetros para getRating

    {
    "mail":"xxxx"
    }
*/
router.post("/addToRead", ctl.addBooksToRead_Read);
/*
Parametros para addToRead
mismo caso que addRating, se estandariza que api es , y a informacion a mostrar,
estoy poniendo el api, para que ustedes en el front vean  que si es tal api me debe de regresar 
cierta informacion , y si es la otra, me trae otra informacion en el campo info
data:[
        {
            "mail":"xx","api":"xx","info":[{"titulo":"hola"}]
        }
    ]
*/
router.post("/getToRead", ctl.getBooksToRead_Read);
/*
Parametros para getToRead
{
   "mail":"xxx"
}

*/
router.post("/addWL", ctl.addWL_WhisList);
/*
Esta peticion solo es de NY es l que manda link de compra del libro, entonces haran una lista de deseos para compar estso libro
     "data":[{
    "mail":"roiter","title":"libro1","amazonlink":"adfasdfsadfasdf"
   }]
*/
router.post("/getWL", ctl.getdWL_WhisList);
/*
{
    "mail":"xxx"
}
 */
router.post("/addInfoProfile", ctl.infoProfile);
/* Igual, dividi por informacion de api , para que puedan acceder a las cosas que tiene cada api y asi
la puedan mostrar en el front
{
    "mail":"roiter2",
    "marveldata":[{"title":"tituloCOMIC2","author":"autor"}],
    "nydata":[{"book":"titulo de libro","author":"autor","otracosa":"masinfo"}]
}
*/
router.post("/getInfoProfile", ctl.getinfoProfile);
module.exports=router;