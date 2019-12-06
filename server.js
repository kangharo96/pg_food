const express = require('express');
const fetch = require('node-fetch');
const uuid = require('uuid/v4');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 8080;
const appToken = "T4fTY4mWpk91TTTOVWnEPNaI4";

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

let distinctEstablishments = [];
let currentDisplayed = [];
let searchedEstablishments = [];

app.use(session({
  genid: (req) => {
    //console.log('Inside the session middleware')
    //console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

/*
  this gets all distinct establishments from the data and their
  latest inspection date.
*/
app.get('/allEstablishments', (req, res) => {
  /*
    ~11/20/19 Colin Hambright~
    New request URL gets every column and orders by establishment_id and
    inspection_date. Limit will need to change so that we can paginate data
    apiToken comes from my personal developer account with SODA.
  */
  req.session.pageNum = 0;
  req.session.searched = 0;
  if(req.session.establishmentId != null){
    console.log("From Server");
    // let firstTen = JSON.parse(JSON.stringify(distinctEstablishments.slice(0, 10)));
    let firstTen = distinctEstablishments.slice(0, 10);
    currentDisplayed = firstTen;
    res.send({data: currentDisplayed});
  }
  else{
    req.session.establishmentId = 0;
    console.log('TESTING: ' + req.session.establishmentId)
    const baseURL = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json?$'+
    'query=SELECT * ' +
    'ORDER BY establishment_id ASC, inspection_date DESC ' +
    'LIMIT 50000&' + '$$app_token=' + appToken;

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
        console.log(dataDistinct.length);
        distinctEstablishments = dataDistinct;
        // only show first 10, .slice() is noninclusive of end int
        // let firstTen = JSON.parse(JSON.stringify(dataDistinct.slice(0, 10)));
        let firstTen = dataDistinct.slice(0, 10);
        currentDisplayed = firstTen;
        res.send({ data: currentDisplayed});
      })
      .catch((err) => {
        console.log(err);
        //res.redirect('/error');
      });
  }
});

/*
  Gets the currenlty stored establishment's dataDistinct
  For use on the establishments page
  -Colin 12/4/19
*/
app.get('/establishment', (req, res) => {
  const baseURL = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json?$'+
  'query=SELECT * ' +
  'WHERE establishment_id = ' + req.session.establishmentId + ' ' +
  'ORDER BY establishment_id ASC, inspection_date DESC ' +
  'LIMIT 50000&' + '$$app_token=' + appToken;

  fetch(baseURL)
    .then((r) => r.json())
    .then((r) => {
      console.log(r);
      res.send({ data: r });
    })
    .catch((err) => {
      console.log(err);
      //res.redirect('/error');
    });
});

/* gets the currently stored establishment id
   - Colin 12/4/19
*/
app.get('/sessionId', (req, res) => {
  res.send({id: req.session.establishmentId});
});

/* posts the most recently clicked establishment id,
   replaces using a query string.
   - Colin 12/4/19
*/
app.post('/establishmentId', (req, res) => {
  req.session.establishmentId = req.body.establishmentId;
  res.send({url: 'https://localhost:8080/establisments/'});
});

/*
Colin 12/4/19
used to paginate between establishements.
Current page's data is stored in the currentDisplayed array, which then can be
used for the map to match the data.
*/
app.put('/changePage', (req, res) => {
  let currentPagedArray;

  if(req.session.searched === 1){
    currentPagedArray = searchedEstablishments;
  }
  else{
    currentPagedArray = distinctEstablishments
  }

  if(req.body.direction === 'next'){
    if(req.session.pageNum >= Math.floor(currentPagedArray.length / 10)){
      res.send({ data: currentDisplayed});
      console.log("HERE");
    }
    else{
      req.session.pageNum = req.session.pageNum + 1;
      let nextPage = currentPagedArray.slice(req.session.pageNum * 10, (req.session.pageNum + 1) * 10);
      currentDisplayed = nextPage;
      // req.session.pageNum = req.session.pageNum + 1;
      console.log(req.session.pageNum);
      res.send({ data: nextPage});
    }
  }
  else{
    if(req.session.pageNum === 0){
      res.send({ data: currentDisplayed});
    }
    else{
      req.session.pageNum = req.session.pageNum - 1;
      let previousPage = currentPagedArray.slice(req.session.pageNum * 10, (req.session.pageNum + 1) * 10);
      currentDisplayed = previousPage;
      res.send({ data: previousPage});
    }
  }
});

app.post('/search', (req, res) => {
  let query = req.body.filter;
  let filteredArray = distinctEstablishments.filter(establishment => {
    return establishment.name.includes(query.toUpperCase());
  });
  console.log(filteredArray);
  if(filteredArray != null ){
    req.session.pageNum = 0;
    req.session.searched = 1;
    searchedEstablishments = filteredArray;
    let firstTen = filteredArray.slice(0, 10);
    currentDisplayed = firstTen;
    res.send({data: firstTen});
  }
  else{
    res.send({data: currentDisplayed});
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
