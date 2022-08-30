# Backend Music Library.
___
## Description.
This was my first backend project which involved using SQL, MySQL and express.js, which was tested using Mocha/Chai and Supertest, the tests can be found in the tests folder.

A music library is created using CRUD operations for an Artist table and an Album table. The Album table is linked to the Artist table via id in the artist table being a foreign key (artist id) in the Album table.
In the future I would like to add 
* Validations and constraints to the models. 
* Helper functions to make the code DRY.
* Mocks, stubs and spies in testing.

___

## Download and setup.
This project has the following dependencies: JavaScript, Express and MySQL2 and additional dev dependencies Mocha, Chai, Supertest, Dotenv, Nodemon.  You will need to have MySQL running in a docker container on your machine. To use the database you can use [Postman](https://www.postman.com/)  To download the project:
* Fork the repository.
* Clone down your fork using ```git clone```.
* Change directory into your cloned folder and run ``` npm install ```.
* Run ``` npm i -S express ```.
* Run ``` npm i -D nodemon mocha chai supertest```. if you want to use make changes to the code and run the tests.
* To start the app run ```npm start```.


## Using the music library
To start you will need to create at least 1 artist. Using Postman send a POST request to the route ```localhost:3000/artist``` with the follow JSON body.
```
{
    "name": "<artist name>",
    "genre": "<artist genre>"
} 
```

There are 4 more routes that can be used:
| Request | Route | Description |
| ------ | ------ | ------ |
|GET|```localhost:3000/artist```| Displays all artists in the database.| 
|GET|```localhost:3000/artist/<id>```|Displays the artist that matches the given id.|
|PATCH|```localhost:3000/artist/<id>```|Updates the entry with the given id and the data sent in the JSON body. Can update the whole entry or just parts of it.|
|DELETE|```localhost:3000/artist/<id>```|Deletes the artist entry from the database, with the given id.|

The Album table works in a similar way. An entry is created by sending a POST request to ```localhost:3000/artist/<artistid>/album``` (artistid must match an id that exists in the artist table). Send the request with a JSON body like this:
```
{
    "name": "<album name>",
    "year": <year album was released>
} 
```
There are 4 more routes:
|Request | Route | Description |
| ------ | ------ | ------ |
|GET|```localhost:3000/album```| Displays all albums in the database.| 
|GET|```localhost:3000/album/<id>```|Displays the album that matches the given id.|
|PATCH|```localhost:3000/album/<id>```|Updates the album entry with the given id and the data sent in the JSON body. Can update the whole entry or just parts of it.|
|DELETE|```localhost:3000/album/<id>```|Deletes the album entry from the database, with the given id.|
___
## Author.
Lisa Heffernan

* Twitter [@Iisaheffernan](https://twitter.com/Iisaheffernan)
* GitHub [@LCHeffernan](https://github.com/LCHeffernan)
* LinkedIn [Lisa Heffernan](https://www.linkedin.com/in/lisa-heffernan-54b61312a)
