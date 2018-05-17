# Project Wantok

QR Code Generator - Nayuki
PUG-Bootstrap
Instascan
aframe

## Project structure

data - data store for MongoDB

models - Define DB models

public - Serving static files

routes - Serving Expressjs route files

views - Serving Pug template files

## To run this project

First run `$ npm install` to install node dependencies,

then run `$ brew install mongodb` to install MongoDB,

and run `$ mkdir -p [PROJECT DIR]/data/db` to create dir for db file,

and run `$ mongod --dbpath [PROJECT DIR]/data/db` to start a MongoDB instance,

finally `$ DEBUG=express:* node ./bin/www` to run server.
