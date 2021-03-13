const fs = require('fs');
const axios = require('axios');

function webCat(url, out){
    axios.get(url)
    .then(res=>{
        handleOutput(out, res.data);
    })
    .catch(err=>{
        console.log('ERROR FETCHING: '+err);
        process.exit(1);
    })
}

function cat(path, out){
    fs.readFile(path, 'utf8', function(err, data){
        if (err){
            console.log('ERROR READING: '+path+' \n'+err);
            process.exit(1);
        }
        handleOutput(out, data);
    });
}

function handleOutput(out, data){
    if (out){
        fs.writeFile(out, data, 'utf8', function(err, data){
            if (err){
                console.log('ERROR WRITING \n'+err);
                process.exit(1);
            }
        })
    }else{
        console.log(data);
    }
}

let out;
let path;

const arg = process.argv[2];
if (arg === '--out'){
    out = process.argv[3];
    path = process.argv[4];
}else{
    path = process.argv[2];
}

if (arg.startsWith('https:')|| arg.startsWith('http:')){
    webCat(path, out);
}else{
    cat(path, out);
}

