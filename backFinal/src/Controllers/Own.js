const bcrypt = require("bcryptjs");
const kj = require("fs");

const path = require("path");

const ruta_carpeta_compartida ="C:\\Users\\fer_o\\Documents\\Universidad\\7mo_semestre\\backFinal\\src\\public\\";

const tabla1 = "users.txt";
const tabla2 = "whislist.txt";
const tabla3 = "toread.txt";
const tabla4 = "rating.txt";
const tabla5 = "profile.txt";

ownController = {};

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
} 

ownController.prueba = async (req, res) =>{
  console.log(__dirname);
}

ownController.insert_Users = async (req, res) => {
  let auxString = "";
  let auxjson = [];
  let aux;
  if (kj.existsSync(ruta_carpeta_compartida + tabla1)) {
    kj.readFile(ruta_carpeta_compartida + tabla1, (err, data2) => {
      let info = data2.toString();
      for (let i of info) {
        if (i == "\n") {
          aux = JSON.parse(auxString);
          auxjson.push(aux);
          auxString = "";
        } else {
          auxString = auxString + i;
        }
      }
      console.log(req.body.data);
      if (auxjson.some((data3) => data3.mail === req.body.mail)) {
        return res.status(200).json({
          ok: true,
          cancreate: false,
        });
      } else {
        let aux = JSON.stringify(req.body);
        let json = JSON.parse(aux);

        let contra = bcrypt.hashSync(json.password);
        json.password = contra;

        let usuario = JSON.stringify(json) + "\n";
        kj.appendFile(
          ruta_carpeta_compartida + tabla1,
          usuario,
          function (err) {
            console.log("txt files is generated");
          }
        );
        return res.status(200).json({
          ok: true,
          cancreate: true,
        });
      }
    });
  } else {
    let aux = JSON.stringify(req.body);
    let json = JSON.parse(aux);

    let contra = bcrypt.hashSync(json.password);
    json.password = contra;

    let usuario = JSON.stringify(json) + "\n";
    kj.writeFile(ruta_carpeta_compartida + tabla1, usuario, function (err) {
      console.log("txt files is generated");
    });
  }
};

ownController.login_Users = async (req, res) => {
  let answer = [];
  let auxString = "";
  let auxjson = [];
  let aux;
  kj.readFile(ruta_carpeta_compartida + tabla1, async (err, data) => {
    if (err) {
      return res.status(400).json({
        ok: false,
      });
    } else {
      let info = data.toString();
      for (let i of info) {
        if (i == "\n") {
          aux = JSON.parse(auxString);
          auxjson.push(aux);
          auxString = "";
        } else {
          auxString = auxString + i;
        }
      }

      if (auxjson.some((data) => data.mail === req.body.mail)) {
        for (let i of auxjson) {
          if (i.mail == req.body.mail) {
            const contraValida = await bcrypt.compare(
              req.body.password,
              i.password
            );
            if (contraValida) {
              answer.push({
                exist: true,
                pswCorrect: true,
                name: i.name,
                type: i.type,
              });
            } else {
              answer.push({ exist: true, pswCorrect: false });
            }
          }
        }
      } else {
        answer.push({ exist: false });
      }

      return res.status(200).json({
        ok: true,
        info: answer,
      });
    }
  });
};

ownController.addratingBooks_Rating = async (req, res) => {
  if (kj.existsSync(ruta_carpeta_compartida + tabla4)) {
    let aux = JSON.stringify(req.body);
    let json = JSON.parse(aux);
    let usuario = JSON.stringify(json) + "\n";
    kj.appendFile(ruta_carpeta_compartida + tabla4, usuario, function (err) {
      console.log("txt files is generated");
    });
  } else {
    let aux = JSON.stringify(req.body);
    let json = JSON.parse(aux);
    let usuario = JSON.stringify(json) + "\n";
    kj.writeFile(ruta_carpeta_compartida + tabla4, usuario, function (err) {
      console.log("txt files is generated");
    });
  }
  return res.status(200).json({
    ok: true,
  });
};

ownController.GetratingBooks_Rating = async (req, res) => {
  kj.readFile(ruta_carpeta_compartida + tabla4, async (err, data) => {
    if (err) {
      return res.status(400).json({
        ok: false,
      });
    } else {
      let answer = [];
      let auxString = "";
      let auxjson = [];
      let aux;
      let info = data.toString();
      for (let i of info) {
        if (i == "\n") {
          aux = JSON.parse(auxString);
          auxjson.push(aux);
          auxString = "";
        } else {
          auxString = auxString + i;
        }
      }
      for (let i of auxjson) {
        if (i.mail == req.body.mail) {
          answer.push(i);
        }
      }

      return res.status(200).json({
        ok: true,
        info: answer,
      });
    }
  });
};

ownController.addBooksToRead_Read = async (req, res) => {
  if (kj.existsSync(ruta_carpeta_compartida + tabla3)) {
    let aux = JSON.stringify(req.body);
    let json = JSON.parse(aux);
    let usuario = JSON.stringify(json) + "\n";
    kj.appendFile(ruta_carpeta_compartida + tabla3, usuario, function (err) {
      console.log("txt files is generated");
    });
  } else {
    let aux = JSON.stringify(req.body);
    let json = JSON.parse(aux);
    let usuario = JSON.stringify(json) + "\n";
    kj.writeFile(ruta_carpeta_compartida + tabla3, usuario, function (err) {
      console.log("txt files is generated");
    });
  }
  return res.status(200).json({
    ok: true,
  });
};
ownController.getBooksToRead_Read = async (req, res) => {
  kj.readFile(ruta_carpeta_compartida + tabla3, async (err, data) => {
    if (err) {
      return res.status(400).json({
        ok: false,
      });
    } else {
      let answer = [];
      let auxString = "";
      let auxjson = [];
      let aux;
      let info = data.toString();
      for (let i of info) {
        if (i == "\n") {
          aux = JSON.parse(auxString);
          auxjson.push(aux);
          auxString = "";
        } else {
          auxString = auxString + i;
        }
      }
      for (let i of auxjson) {
        if (i.mail == req.body.mail) {
          answer.push(i);
        }
      }
      return res.status(200).json({
        ok: true,
        info: answer,
      });
    }
  });
};
ownController.addWL_WhisList = async (req, res) => {
  if (kj.existsSync(ruta_carpeta_compartida + tabla2)) {
    let aux = JSON.stringify(req.body);
    let json = JSON.parse(aux);
    let usuario = JSON.stringify(json) + "\n";
    kj.appendFile(ruta_carpeta_compartida + tabla2, usuario, function (err) {
      console.log("txt files is generated");
    });
  } else {
    let aux = JSON.stringify(req.body);
    let json = JSON.parse(aux);
    let usuario = JSON.stringify(json) + "\n";
    kj.writeFile(ruta_carpeta_compartida + tabla2, usuario, function (err) {
      console.log("txt files is generated");
    });
  }
  return res.status(200).json({
    ok: true,
  });
};
ownController.getdWL_WhisList = async (req, res) => {
  kj.readFile(ruta_carpeta_compartida + tabla2, async (err, data) => {
    if (err) {
      return res.status(400).json({
        ok: false,
      });
    } else {
      let answer = [];
      let auxString = "";
      let auxjson = [];
      let aux;
      let info = data.toString();
      for (let i of info) {
        if (i == "\n") {
          aux = JSON.parse(auxString);
          auxjson.push(aux);
          auxString = "";
        } else {
          auxString = auxString + i;
        }
      }
      for (let i of auxjson) {
        if (i.mail == req.body.mail) {
          answer.push(i);
        }
      }
      return res.status(200).json({
        ok: true,
        info: answer,
      });
    }
  });
};
ownController.infoProfile = async (req, res) => {
  if (kj.existsSync(ruta_carpeta_compartida + tabla5)) {
    kj.readFile(ruta_carpeta_compartida + tabla5, async (err, data) => {
      let auxString = "";
      let auxjson = [];
      let aux;
      let info = data.toString();
      for (let i of info) {
        if (i == "\n") {
          aux = JSON.parse(auxString);
          auxjson.push(aux);
          auxString = "";
        } else {
          auxString = auxString + i;
        }
      }
      if (auxjson.some((data3) => data3.mail === req.body.mail)){
        for(let i of auxjson){
          
          if(i.mail==req.body.mail){
             
            if(req.body.marveldata.length>0){
              for(let j of req.body.marveldata){
                i.data[0].marvelData.push(j)
              }
            }
            if(req.body.nydata.length>0){
              for(let j of req.body.nydata){
                i.data[1].NyData.push(j)
              }
            }
            
          }
        
        }
        
        //AQUI YA aux.json esta actualizado
        let cont=0;
        
        for(let i of auxjson){
          let auxs=JSON.stringify(i)+"\n";
          if(cont==0){
            kj.writeFile(ruta_carpeta_compartida + tabla5, auxs, async function (err) {
              console.log("txt files is generated");
             await delay(2000)
            });
          }else{
            kj.appendFile(ruta_carpeta_compartida + tabla5, auxs, function (err) {
              console.log("append file");
            });
          }
          cont++;
        }
        
        
        

      }else{//no existe registro de ese perfil
        let squemaProfile={
          mail:req.body.mail,data:[
            {marvelData:req.body.marveldata},
            {NyData:req.body.nydata}
          ]}
        
        let usuario = JSON.stringify(squemaProfile) + "\n";
        kj.appendFile(ruta_carpeta_compartida + tabla5, usuario, function (err) {
          console.log("txt files is generated");
        });
      }
      
    });
  } else {
    let squemaProfile={
      mail:req.body.mail,data:[
        {marvelData:req.body.marveldata},
        {NyData:req.body.nydata}
      ]}
    
    let usuario = JSON.stringify(squemaProfile) + "\n";
    kj.writeFile(ruta_carpeta_compartida + tabla5, usuario, function (err) {
      console.log("txt files is generated");
    });
  }
};
ownController.getinfoProfile = async (req, res) =>{
  kj.readFile(ruta_carpeta_compartida + tabla5, async (err, data) =>{
      if(err){
        return res.status(400).json({
          ok: false,
        });
      }else{
        let answer = [];
      let auxString = "";
      let auxjson = [];
      let aux;
      let info = data.toString();
      for (let i of info) {
        if (i == "\n") {
          aux = JSON.parse(auxString);
          auxjson.push(aux);
          auxString = "";
        } else {
          auxString = auxString + i;
        }
      }
      for (let i of auxjson) {
        if (i.mail == req.body.mail) {
          answer.push(i);
        }
      }
      return res.status(200).json({
        ok: true,
        info: answer,
      });
      }

  })
}

/*
let squemaProfile=[
      {mail:req.body.mail,data:[
        {marvelData:[{title:"tituloCOMIC1",author:"autor"},{title:"tituloCOMIC2",autor:"autor2"}]},
        {NyData:[{book:"titulo de libro",author:"autor",otracosa:"masinfo"},{book:"titulo de libro",author:"autor",otracosa:"masinfo"}]}
      ]}
    ]
*/
module.exports = ownController;
