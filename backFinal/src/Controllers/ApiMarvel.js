const request=require('request')
marvelController={};

marvelController.getCharacters=async(req,res)=>{
    let options ={
        method:'GET',
        json:true,
      }
      request('https://gateway.marvel.com:443/v1/public/characters?orderBy=modified&ts=1&apikey=09409c37bdbfa9c02c97dc71d3e84fdb&hash=069cbf680ba70b538f1db690992967be',options,function(err,r){
        res.send(r.body.data.results)
      })
}

marvelController.ComicsByFirstLetter=async(req,res)=>{
  let options ={
      method:'GET',
      json:true,
    }
    request('https://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&noVariants=true&titleStartsWith='+req.body.letter+'&orderBy=title&ts=1&apikey=09409c37bdbfa9c02c97dc71d3e84fdb&hash=069cbf680ba70b538f1db690992967be',options,function(err,r){
      res.send(r.body.data.results)
    })
}


module.exports=marvelController;