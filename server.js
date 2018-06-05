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
function parseId(idService){
  var numberService = idService.match(/\d/g);
  numberService = numberService.join("");
  var typeService = idService.replace(/[0-9]/g, '');
 return {number: numberService, type: typeService}
}
function findEdges(idService, bundle, connectionValue){
  const{number, type} = parseId(idService);
  var copyBundle = clone(bundle);
  copyBundle.services.push(service[type][number].name);
  copyBundle.price = copyBundle.price + service[type][number].price + connectionValue;
  bundles.push(copyBundle);
  for(var i = 0; i < service[type][number].edges.length; i++){
    var addConnectValue = service[type][number].edges[i].extraPrice;
    findEdges(service[type][number].edges[i].id,copyBundle,addConnectValue);
  }
}
function sortByPrice(bundles){
  bundles.sort(function(a, b) {
      return a.price -b.price;
  });
  return bundles;
}
function listBundles(typeService){
  for(i = 0; i < service[typeService].length; i++){
    var connectionValue = 0;
    findEdges(service[typeService][i].id,bundle,connectionValue);
  }
  bundles = sortByPrice(bundles);
}

var connectionValue = 0;

const express = require('express');

const app = express();
const port = process.env.PORT || 5000;


app.get('/api/hello', function(req, res, next) {
  const serviceSearch = req.query.serviceSearch;
  listBundles(serviceSearch);
  res.send({bundles});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;