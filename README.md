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

## Route structure

```
// Get all village info (accecced via url)
GET /
related template: index.pug

// Get one village info (accecced via url)
GET /villages/:id 
related template: village-view.pug

// Get village list in admin mode (accecced via url)
GET /admin/villages
related template: village-list-view.pug

// Add new village (processed via button)
POST /admin/villages/new
related template: village-add.pug

// Delete a village (processed via button)
DELETE /admin/villages/:id
related template: village-list-view.pug

```