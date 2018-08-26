var request = require('request');

var jsonfile = require('jsonfile');

var fs = require('fs');



jsonLoc = require("./locations.json")

var districts = [];

var SQLdistricts = [];

for (i=0; i<jsonLoc.length; i++) {

    var temp = jsonLoc[i];
    var tempName =temp.name
    districts.push(tempName)
    
}

console.log(districts + "<<<DISTRICTS")
for (q=0; q<districts.length; q++){
    fixed = districts[q].replace("-", "")
    SQLdistricts.push(fixed)
}

console.log(districts.length)

function apiHit(){

    var queryURL =  "https://theunitedstates.io/districts/cds/2012/"+districts[p]+"/shape.geojson "

    console.log(queryURL)
    console.log(districts[p])
    var locations = {};
      

    
    request(queryURL,{json: true}, function (error, response, data) {
        console.log('error:', error); 
        console.log('statusCode:', response && response.statusCode); 
       
        // console.log(JSON.stringify(response.body))

            fs.appendFile("./locations/"+SQLdistricts[p]+".geojson", JSON.stringify(response.body), function (err) {
                if (err) throw err;
                console.log('Saved!');
              });

            if (!error){

              p++
                apiHit()
            }
    })
}
  
apiHit()
 