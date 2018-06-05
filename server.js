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
    console.log(service[type][number].edges[i].id,service[type][number].edges.length);
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
// tService = 'bb';
// console.log('length',service[tService].length)
// listBundles('bb');
// console.log(bundles)
var connectionValue = 0;
// for(i = 0; i < service.bb.length; i++){
//   var connectionValue = 0;
//   findEdges(service.bb[i].id,bundle,connectionValue);
// }
// //findEdges("bb0",bundle,connectionValue);
// bundles.sort(function(a, b) {
//   return a.price -b.price;
// });

// console.log('///////////////');
// console.log(bundles);
// console.log('///////////////');
// var j;
// for(i = 0; i < service.bb.length; i++){
//   j=0;
//   while(service.bb[i].edges.length != 0 && j < service.bb[i].edges.length){
//     var bundle = { services : [] ,
//       price : 0
//     };
//     bundle.services.push(service.bb[i].id,service.bb[i].edges[j].id);
//     bundle.price = bundle.price + service.bb[i].edges[j].extraPrice + service.bb[i].price;
//     var copyBundle = clone(bundle);
//     bundles.push(copyBundle);
//     j++;
//   }
// }//console.log('bundlessssss');
//console.log(bundles);

const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

//app.get('/api/hello', (req, res) => {
app.get('/api/hello', function(req, res, next) {
  const serviceSearch = req.query.serviceSearch;
  console.log(serviceSearch);
  listBundles(serviceSearch);
  //findEdges(service[serviceSearch][0].id,bundle,connectionValue);
  console.log(bundles)
  res.send({bundles});
});
// app.get('/api/search',function (req, res) {
//   const serviceSearch = req.query.serviceSearch;
//   console.log(serviceSearch);
//   findEdges(service[serviceSearch][0].id,bundle,connectionValue);
//   console.log(bundles)
//   res.send(bundles);
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;