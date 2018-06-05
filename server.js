var telecom = require('./telecom')
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/list-all', function(req, res, next) {
  const serviceSearch = req.query.serviceSearch;
  var bundles = telecom.listBundles(serviceSearch);
  res.send({bundles});
  telecom.resetBundles();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;