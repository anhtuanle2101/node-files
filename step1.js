const fs = require('fs');

function cat(){
    const path = process.argv[2];

    fs.readFile(path, 'utf8', function(err, data){
        if (err){
            console.log('ERROR READING: '+path+' \n'+err);
            process.exit(1);
        }
        console.log(data);
    });
}