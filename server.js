var fs = require('fs');
var data = fs.readFileSync('bundles.json'); 
var service = JSON.parse(data);
function clone(a) {
  return JSON.parse(JSON.stringify(a));
}
var bundles = [];
var bundle = { services : [] ,
  price : 0
};
var connectionValue = 0;

function findEdges(idService, bundle, connectionValue){
  var numberService = idService.match(/\d/g);
  numberService = numberService.join("");
  var typeService = idService.replace(/[0-9]/g, '');
  var copyBundle = clone(bundle);
  copyBundle.services.push(idService);
  copyBundle.price = copyBundle.price + service[typeService][numberService].price + connectionValue;
  bundles.push(copyBundle);
  for(var i = 0; i < service[typeService][numberService].edges.length; i++){
    console.log(service[typeService][numberService].edges[i].id,service[typeService][numberService].edges.length);
    var addConnectValue = service[typeService][numberService].edges[i].extraPrice;
    findEdges(service[typeService][numberService].edges[i].id,copyBundle,addConnectValue);
  }
}

findEdges("bb1",bundle,connectionValue);
console.log(bundles.length);
console.log('///////////////');
console.log(bundles);
console.log('///////////////');
var j;
for(i = 0; i < service.bb.length; i++){
  j=0;
  while(service.bb[i].edges.length != 0 && j < service.bb[i].edges.length){
    var bundle = { services : [] ,
      price : 0
    };
    bundle.services.push(service.bb[i].id,service.bb[i].edges[j].id);
    bundle.price = bundle.price + service.bb[i].edges[j].extraPrice + service.bb[i].price;
    var copyBundle = clone(bundle);
    bundles.push(copyBundle);
    j++;
  }
}//console.log('bundlessssss');
//console.log(bundles);

const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: bundles});
});

app.listen(port, () => console.log(`Listening on port ${port}`));