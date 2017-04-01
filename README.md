# COMPANIES ANALYSER

*NoSQL Project*

We chose the SGBD MongoDB because we had another project in which we used MongoDB and we already knew how to connect and execute queries from NodeJS.

## What to do
Run the following command in your directory to install all the modules needed.<br/>
You will need [Node.js](https://nodejs.org/en/) to run the application.
```node
npm install
```
You need to listen on http://localhost:3200/menu after having run the command :  
```command
node serv.js
```

For the importation you can find .json samples in the folder dataset.<br/>
Pay attention to import data one by one.

## What it does
It allows you to execute customized queries on the dataset and find companies informations such as the founded year, the number of emloyees, the countries it is located in, its turnover and its official website url.


## Warnings
First thing insert only .json files any other extention will crash the application.<br/>
Second thing we are going to deal with the query filters: <br/>
 - If you enter any name filter do not choose any other filters below <br/>
 - If not, pay attention to choose every other filters below the name filter <br/>
 
These warnings are very important, the application could crash if you don't follow them correctly.
 
## Licence
[Uncopyrighted](http://zenhabits.net/uncopyright/)