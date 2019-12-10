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
•	API library From P.G county website
•	Html, CSS, JavaScipt
•	Json package.

How to run your application on a server

Using herokuapp and cloud server
One need to copy the files that make up your application.
Copy .html, css and json files and put them in a folder that also matches the name when you deploy.
Copy image files.
Copy the executable files
Install express via npm install express

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

Created a Back end project in node js .
Server.js file has two API's
 /establishments gets by default all the establishments from the external API with given limit and token
if we pass the option e_id to /establishments API . it will get specific establishment details 
/establishmentSummary gets all the establishment summary of how many times it inspected so far. 
Created front end with html/css/javascript
default public/index.html file calls /establishmentSummary via AJAX and loads data to datatable. 
We render the data with establishmentID as clickable item to fetch that particular records for establishment. 
on click of establishment ID , we redirected to /html/establishments/index.html?e_id=<id> where we get the query params of establishmentID and pass to backend via AJAX call.
data is loaded based on the given e_id value and show all the records. 


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


 

