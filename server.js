// DEPENDENCIES
// ==============================================================================
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const yelp = require('yelp-fusion');
const client = yelp.client('a81GMhSX7f45Iq00D723hoEnNDYrwPRaxmkTpfbZ94ylgHc9lkH1BWjjhUSd93rZR8_xcjxLiyiOcnlHlVu3-SjghePZN60_1PXIJCPAQs_PcBxFXzsD8usRo0JzWnYx');

// EXPRESS CONFIGURATION
// ==============================================================================
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("app/public"));

// ROUTER
// ================================================================================
'use strict';

app.get("/api/:latitude/:longitude", function(req, res) {

    const latitude = req.params.latitude;
    const longitude = req.params.longitude;
    
    client.search({
        term:'restaurants',
        price: 1,
        radius: 3219,
        latitude: latitude,
        longitude: longitude
    }).then(response => res.send(response.jsonBody.businesses));
});

// LISTENER
// =============================================================================
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});