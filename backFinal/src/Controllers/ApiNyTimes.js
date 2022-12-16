const request=require('request')
NyController={};

NyController.getGenres=async(req,res)=>{
    let info=[];
    let options ={
        method:'GET',
        json:true,
      }
      request('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=JfwY3TjMsv017igaTwEM77tAlGyEAnez',options,function(err,r){
        for(let i of r.body.results){
            info.push(i.list_name)
        }  
      res.send(info)
      })
}

NyController.BooksByGenres=async(req,res)=>{
    let info=[];
    let options ={
        method:'GET',
        json:true,
      }
      request('https://api.nytimes.com/svc/books/v3/lists.json?list='+req.body.genre+'&api-key=JfwY3TjMsv017igaTwEM77tAlGyEAnez',options,function(err,r){
        for(let i of r.body.results){
            info.push({amazonlink:i.amazon_product_url,data:i.book_details})
        }
      res.send(info)
      })
}

NyController.ArticlesKeyword=async(req,res)=>{
    let info=[];
    let options ={
        method:'GET',
        json:true,
      }
      request('https://api.nytimes.com/svc/search/v2/articlesearch.json?fq='+req.body.keyword+'&api-key=JfwY3TjMsv017igaTwEM77tAlGyEAnez',options,function(err,r){
      res.send(r.body.response.docs)
      })
}

  
module.exports=NyController;  