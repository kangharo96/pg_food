# pg_food

#Created a Back end project in node js . 
 ## server.js file has two API's 
     #### /establishments gets by default all the establishments from the external API with given limit and token

            ##### if we pass the option e_id to /establishments API . it will get specific establishment details 

     #### /establishmentSummary gets all the establishment summary of how many times it inspected so far. 




#Created front end with html/css/javascript 
  
      ### default public/index.html file calls /establishmentSummary via AJAX and loads data to datatable. 
      ### We render the data with establishmentID as clickable item to fetch that particular records for establishment. 
      ### on click of establisment ID , we redirected to /html/establishments/index.html?e_id=<id> where we get the query params of establishmentID and pass to backend via AJAX call.
      ### data is loaded based on the given e_id value and show all the records. 



              