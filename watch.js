var app       =     require("express")();
var http      =     require('http').Server(app);
var io        =     require("socket.io")(http);
var fs   = require('fs');
var filelocation = process.argv[2]
var chokidar = require('chokidar');
app.get("/",function(req,res){
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(client) {  
    console.log('Client connected...');
    
    client.on('join', function(data) {
        console.log(data);
   
    chokidar.watch(filelocation, { ignored: /[\/\\]\./ }).on('all', function (event, path) {
         console.log(path +" file has been changed");
        var file = fs.readFileSync(filelocation);
        console.log('File content at : ' + new Date() + ' is \n' + file);
        client.emit('messages', path +" file has been changed \n, File content at :" + new Date() + ' is \n' + file);
     
 });

    });
 });

http.listen(8080,function(){
    console.log("Listening on 8080");
});
