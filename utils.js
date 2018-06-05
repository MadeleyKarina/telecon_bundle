module.exports = {
    clone: function (obj) {
        return JSON.parse(JSON.stringify(obj));
      },
    parseId: function(idService){
        var number = idService.match(/\d/g).join("");
        var type = idService.replace(/[0-9]/g, '');
        return {numberService: number, typeService: type};
      },
  };