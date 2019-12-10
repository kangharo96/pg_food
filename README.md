# pg_food
# Title: Food Safety in PG County

# Description: Have you ever eatin at any food establishment in Prince George's county only to be greeted by an upset stomach the first thing in the morning? Then this webpage is for you. Our goal with this website is to help people who are known to have typically weaker stomachs or immune systems know which restaurants they can eat at and not have to worry about getting indigestion.

# Here is our Heroku Link: https://pg-foods.herokuapp.com/

# Target browsers: Our team don’t discriminate, we aim to have this website work on ALL platforms

# User Manual
Link: https://github.com/kangharo96/pg_food/blob/master/docs/user.md

# Final.md
Link: https://github.com/kangharo96/pg_food/blob/master/docs/final.md

                      				 Developer Manual

How to install your application and all dependencies

System requirements
•	 Laptop or Computer with coding capability
•	 Github Desktop
•	 Git setup with command line and text editor. 		
Third party components
•	Jquery, Herokuapp to deploy
•	JavaScript library From P.G county website
•	Html,CSS
•	Json package.

How to run your application on a server

Using herokuapp and cloud server
One need to copy the files that make up your application.
Copy .html, css and json files and put them in a folder that also matches the name when you deploy.
Copy image files.
Copy the executable files
Install express via npm install express. install express-session via npm install express-session. Install node-fetch via npm install node-fetch. Finally, install uuid/v4 via npm install uuid/v4.

How to run any tests you have written for your software

Make sure that you have npm installed so you can use the server
Once you have navigated to where the folder is located via terminal enter the command “npm start”
From here you can test the application based off of the last save that was made to any of the html files and git repository

Title: Login Page – Authenticate Successfully on gmail.com/email/permisson needed

Description: A registered or permitted user should be able to successfully login.

Precondition: the user must already be logged into his verified email.

Assumption: Chrome or Firefox or Safari or other supported browser must be used.

Test Steps:

Navigate to github.com
Signup with the username and password and verify with the email you got in inbox.
Click the ‘ upload file’ button.
Upload all the html,json package and css file
Click ‘merge’ or submit
Click push to live or origin in github desktop
Expected Result: You should be able to deploy the website through herokuapp.

The API for your server application - all GET, POST, PATCH, etc endpoints, and what they each do

All endpoints send data via JSON.

The initial GET endpoint on our API is /allEstablishments. This endpoint will set request session variable to initialize the page's page number (for pagination), the variable indicating whether a search has been done, and the variable representing the current establishment id. By default these are all zero. Besides this, this endpoint returns the first 10 establishments from the PG County dataset. These first ten are then set to a currentDisplayed array representing the page's current view state. It also sets the distinctEstablishments array to all of the distinct establishments from the dataset, which will be used for searching.

The GET /establishment endpoint returns the current establishment that has been looked at on the establishments page. So any time a user clicks on an establishment link from the main page they will be redirected to an establishments page, which then uses this endpoint to bind all the necessary data for that clicked establishment. It gets the data depending on what is stored in the establishment session variable. This gets the establishments data through an API call to the PG county data and returns that single object.

The GET /sessionId is a test endpoint to ensure that the establishment session variable is being stored correctly. This returns the current establishment id stored in that variable.

The POST /establishmentId endpoint updates the establishment id session variable based the json passed into the request body. The body should be a single json object with just one field called establishmentId. This happens on every click of an establishment from the home page.

The PUT /changePage endpoint updates session variable representing the current page of the pagination. The variable is updated via the request body variable "direction" which should be either "next" or "prev" representing which way to go. The resulting new currentDisplayed array is sent back representing the new data.

The POST /search endpoint takes a body parameter of "filter" which contains the current searched term in the search box. This is then used to filter through the distinctEstablishments array for matching establishment names. Once found the currentDisplayed array is updated to match the search filter and is then sent back to the client.

All endpoints return data as json objects in an array under the "data" field. 


A clear set of expectations around known bugs and a road-map for future development.

We ran into problems such as downloading git through command line. There is a clear set of instructions but depending on computers (MACOS / Windows) the patch might not work.
In that case you have to download the older patch.
Deploying could be a pain if all the html,css and package json file is not there.
Adding backend through node.js is also time consuming
Breaking up a database with jquery and filter the data you need is also another barrier.
There is browser compatibility problems and we highly recommend to use the latest updated browser such as Chrome and Safari or Firefox
Website might not always be responsive and in that case the common fix would be to go to the development mode and source code and resizing the pixel.
Inspecting element in MACOS is another way to find common bugs.
Make sure to remove all noindex codes as well.
				References

https://supportline.microfocus.com/documentation/books/sx20books/pidepl.htm
https://www.impactbnd.com/blog/website-bugs-after-site-launch
https://blog.testlodge.com/how-to-write-test-cases-for-software-with-sample/
