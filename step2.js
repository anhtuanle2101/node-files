const fs = require('fs');
const axios = require('axios');

function webCat(url){
    axios.get(url)
    .then(res=>{
        console.log(res.data);
    })
    .catch(err=>{
        console.log('ERROR FETCHING: '+err);
        process.exit(1);
    })
}

function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if (err){
            console.log('ERROR READING: '+path+' \n'+err);
            process.exit(1);
        }
        console.log(data);
    });
}

const arg = process.argv[2];
if (arg.startsWith('https:')|| arg.startsWith('http:')){
    webCat(arg);
}else{
    cat(arg);
}