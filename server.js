const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/establishments', (req, res) => {
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

  // dataDistinct = fetch(baseURL2)
  //   .then((r) => r.json())
  //   .then((data) => {
  //     console.log(data);
  //     // data = data.filter(course => course.course_id.includes("INST"))
  //     // console.log(data)
  //     res.send({ data: data });
  //   });
  //   // .catch((err) => {
  //   //   console.log(err);
  //   //   res.redirect('/error');
  //   // });
  //
  const baseURL2 = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json?$';

  fetch(baseURL2)
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      // data = data.filter(course => course.course_id.includes("INST"))
      // console.log(data)
      res.send({ data: data });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/error');
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
