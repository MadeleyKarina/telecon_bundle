var fs = require('fs');
var utils = require('./utils')

var service = [];
var bundles = [];

function findEdges(idService, bundle, extraPrice) {
  const {numberService, typeService} = utils.parseId(idService);
  var copy = utils.clone(bundle);
  var serviceNode = service[typeService][numberService];
  copy.services.push(serviceNode.name);
  copy.price = copy.price + serviceNode.price + extraPrice;
  bundles.push(copy);
  serviceNode.edges.forEach(edge => {
    findEdges(edge.id, copy, edge.extraPrice)
  });
}

function sortedBundles(){
  bundles.sort(function(a, b) {
      return a.price - b.price;
  });
  return bundles;
}
function loadInputFile() {
    var data = fs.readFileSync('bundles.json'); 
    service = JSON.parse(data);
}
module.exports = {
    listBundles: function(typeService) {
        if (service.length == 0) {
         loadInputFile() 
        }
        var initBundle = {
            services : [] ,
            price : 0
        };
        var initExtraPrice = 0;
        service[typeService].forEach(serviceObj => {
        findEdges(serviceObj.id, initBundle, initExtraPrice);
        }) 
        return sortedBundles()
    },
    resetBundles: function() {
        bundles = []
    },
};