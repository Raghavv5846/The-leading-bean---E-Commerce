
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    app.locals.assetPath = function(filePath){

        // console.log("ahskahkaksj",'/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/rev-manifest.json')))[filePath]);
        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/rev-manifest.json')))[filePath];
    }
}