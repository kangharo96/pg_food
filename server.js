const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/establishments', (req, res) => {
  const baseURL = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json?$select=distinct establisment_id';
  fetch(baseURL)
    .then((r) => r.json())
    .then((data) => {
      console.log(data)
      // data = data.filter(course => course.course_id.includes("INST"))
      // console.log(data)
      // res.send({ data: data });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/error');
    });
});

app.get('/api', (req, res) => {
  const baseURL = 'https://api.umd.io/v0/courses/list?semester=201908';
  fetch(baseURL)
    .then((r) => r.json())
    .then((data) => {
      data = data.filter(course => course.course_id.includes("INST"))
      console.log(data)
      res.send({ data: data });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/error');
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
