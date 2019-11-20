const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;
const appToken = "T4fTY4mWpk91TTTOVWnEPNaI4";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// app.get('/establishments', (req, res) => {
  // const baseURL = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json?$'+
  // 'query=SELECT DISTINCT establishment_id, name, category, city, state, zip,' +
  // 'address_line_1, address_line_2, owner '+
  // ''+
  // 'ORDER BY establishment_id ASC ' +
  // 'LIMIT 50000';
  //
  // const baseURL2 = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json?$'+
  // 'query=SELECT establishment_id, max(inspection_date) '+
  // 'GROUP BY establishment_id '+
  // 'ORDER BY establishment_id ASC ' +
  // 'LIMIT 50000';
// });

/*
  IMPORTANT For some reason this endpoint can NEVER be called /establishments,
  literally had me working on this for hours, fml - Colin
  In other news, this gets all distinct establishments from the data and their
  latest inspection date.
*/
// const baseURL = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json?$'+
// 'query=SELECT establishment_id, max(inspection_date)' +
// 'GROUP BY establishment_id '+
// 'ORDER BY establishment_id ASC ' +
// 'LIMIT 50000&' + '$$app_token=' + appToken;
app.get('/allEstablishments', (req, res) => {
  const baseURL = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json?$'+
  'query=SELECT * ' +
  'ORDER BY establishment_id ASC, inspection_date DESC ' +
  'LIMIT 50000&' + '$$app_token=' + appToken;

  fetch(baseURL)
    .then((r) => r.json())
    .then((data) => {
      let dataDistinct = [];
      let previousId = 0;
      for(row = 0; row < data.length; row++){
        let currId = parseInt(data[row]["establishment_id"], 10);
        if(data[row]["establishment_id"] > previousId){
          previousId = currId;
          dataDistinct.push(data[row]);
        }
      }
      console.log(dataDistinct);
      //console.log(data);
      res.send({ data: dataDistinct });
    })
    .catch((err) => {
      console.log(err);
      //res.redirect('/error');
    });

});

// app.post('/establishment', (req, res) => {
//
//
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
