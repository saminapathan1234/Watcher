var app       =     require("express")();
var http      =     require('http').Server(app);
var io        =     require("socket.io")(http);
var fs   = require('fs');
var filelocation = process.argv[2]
var noOfLines = process.argv[3] || 10 ; 
var chokidar = require('chokidar');
app.get("/",function(req,res){
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(client) {  
    console.log('Client connected...');
    
    client.on('join', function(data) {
        console.log(data);
    chokidar.watch(filelocation, { ignored: /[\/\\]\./ }).on('all', function (event, path) {
         var file = fs.readFileSync(filelocation).toString().split('\n');
         var filearr=[];  
         for(var i=file.length-noOfLines; i<file.length;i++)
          {
             if(file[i])
             filearr.push(file[i])
           }
             console.log(filearr)
             client.emit('messages', filearr);
     
 });

    });
 });

http.listen(8080,function(){
    console.log("Listening on 8080");
});
