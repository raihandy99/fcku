
var expresses = {
    password: "cok", // Ini Password nya. jadi pengaksesannya web.com:port/set?password=[password]
    index: function(req, res){

        if(req.query.password){

        if(expresses.password == req.query.password){
        res.sendFile(__dirname+'/edit.html');
        }else{
        res.send('Something Wrong');
        }
   
    }else{


    res.send('Something Wrong');
    }
    }
}
module.exports = expresses;