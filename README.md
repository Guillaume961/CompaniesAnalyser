# COMPANIES ANALYSER

*NoSQL Project*

We chose the SGBD MongoDB because we had another project in which we used MongoDB and we already knew how to connect and execute queries from NodeJS.

## What to do
Run the following command in your directory to install all the modules needed.
You will need [Node.js](https://nodejs.org/en/) to run the application.
```node
npm install
```
You need to listen on http://localhost:3200/menu after having run the command :  
```command
node serv.js
```
You will need to import to your mongoDB database a correct companies dataset.
You can find .json samples in the folder dataset.

## What it does
It allows you to execute customized queries on the dataset and find companies informations such as the founded year, the number of emloyees, the countries it is located in, its turnover and its official website url.
