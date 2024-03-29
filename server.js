// call all the required packages
const express = require('express')
const bodyParser= require('body-parser')
const multer = require('multer');
const fs = require('fs');
var path = require('path');
var os= require('os')
const hostName = '/Downloads/Export.csv';
const fileLocation = path.join(os.homedir(),hostName);
  
//CREATE EXPRESS APP
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });   
 
//ROUTES WILL GO HERE
// app.get('/', function(req, res) {
//     res.json({ message: 'WELCOME' });   
//     var test = path.join(os.homedir(),fileLocation)
// });


// Serve only the static files form the dist directory


app.get('/test', function(req, res) {
    res.send("Testing...")
})


app.get('/getFile', function(req, res) {
    console.log("inside getFile server.js")
    const file = path.join(fileLocation);
    
     res.download(file, function(err) {
         if (err) {
             console.log("error downloading file: ",err)
         }
     });
console.log("fetching file: ",file)
     if(fs.existsSync(fileLocation)) {
      
           console.log("file data fetched successfully")
    }
    else {
        console.log("File not exists")
    }
})

app.get('/downloadFile', function(req,res) {
    let downloadPath =path.join(fileLocation);
    console.log(downloadPath);

    // window.open('https://escavoxwebapi.azurewebsites.net/IoT/1.0/GetRaw/67510A100E/20190901-0000/20191010-0000')
})

app.delete('/delete', function(req, res) {

    fs.stat(path.join(fileLocation), function (err, stats) {
        console.log("delete api called")
        if (err) {
            console.error(err);
            // return(err);
        }
     
        if(fs.existsSync(fileLocation)) {
            fs.unlink(path.join(fileLocation), (err) => {
                if (err) {
                    console.log("Some error occured", err);
                };
                console.log('file was deleted');
              });
        }
        else {
            console.log("File not exists")
        }
})
 
})

app.listen(process.env.PORT || 4000, () => console.log('Server started on port 4000'));