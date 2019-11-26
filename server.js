const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/establishments', (req, res) => {
  const appToken = "T4fTY4mWpk91TTTOVWnEPNaI4";
  const baseURL = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json?$'+
  'query=SELECT establishment_id, name, owner, category, city, state, inspection_date, inspection_type, inspection_results ' +
  'ORDER BY establishment_id ASC ' +
  'LIMIT 5000&' + '$$app_token=' + appToken;
  fetch(baseURL)
    .then((r) => r.json())
    .then((data) => {
     
      res.status(200).json({ data: data });
    })
    .catch((err) => {
       res.status(500).json({'message': 'Opps!! something went wrong'})
      //res.redirect('/error');
    });

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
