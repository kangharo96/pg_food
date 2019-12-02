const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;
const appToken = "T4fTY4mWpk91TTTOVWnEPNaI4";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

/*
  IMPORTANT For some reason this endpoint can NEVER be called /establishments,
  literally had me working on this for hours, fml - Colin
  In other news, this gets all distinct establishments from the data and their
  latest inspection date.
*/
app.get('/allEstablishments', (req, res) => {
  /*
    ~11/20/19 Colin Hambright~
    New request URL gets every column and orders by establishment_id and
    inspection_date. Limit will need to change so that we can paginate data
    apiToken comes from my personal developer account with SODA.
  */
  const baseURL = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json?$'+
  'query=SELECT * ' +
  'ORDER BY establishment_id ASC, inspection_date DESC ' +

  fetch(baseURL)
    .then((r) => r.json())
    .then((data) => {
      /*
        ~11/20/19 Colin Hambright~
        Grab the first instance of a establishment and add it to a new array.
        This relies on the url query ordering the establishments by their IDs..
        and by their inspection dates.
      */
      let dataDistinct = [];
      let previousId = 0;
      for(row = 0; row < data.length; row++) {
        let currId = parseInt(data[row]["establishment_id"], 10);
        if (data[row]["establishment_id"] > previousId) {
          previousId = currId;
          dataDistinct.push(data[row]);
        }
      }
      console.log(dataDistinct);
      res.send({ data: dataDistinct });
    })
    .catch((err) => {
      console.log(err);
      //res.redirect('/error');
    });

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
