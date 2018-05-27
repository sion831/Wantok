# Project Wantok

This project is a project for APEC 2018 App Challenges from the delegate of Rep. of Korea Economy. This project is a total program suite for a bilum maker to enhance their brand identity. 
In this project, an administrator may manage several brands for Bilum makers. This project contains following programs.

* QR Code Generator with Custom Brand Image
* QR Code Scanner
* Virtual Reality Tour using 360 Image
* Contents Management System for Virtual Reality Tour

## Prerequisite
This projects runs under HTTPS. Therefore, one who wants to execute this project should have vaild certificate to run HTTPS service. 
To setup and run the project on the localhost environment, refer the following materials. 
* https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec

After generating the `server.crt` and `server.key` files, put them into `[Project DIR]/cert`.

## To run this project

First run `$ npm install` to install node dependencies,

then run `$ brew install mongodb` to install MongoDB, (For macOS)

and run `$ mkdir -p [PROJECT DIR]/data/db` to create dir for db file,

and run `$ mongod --dbpath [PROJECT DIR]/data/db` to start a MongoDB instance,

finally `$ DEBUG=express:* node ./bin/www` to run server.

## Project structure

data - data store for MongoDB

models - Define DB models

public - Serving static files

routes - Serving Expressjs route files

views - Serving Pug template files

## Library Reference
- QR Code Generator - Nayuki
- jQuery
- Mongoose
- Bootstrap
- PUG-Bootstrap
- Instascan
- aframe
- python-shell
- ExpressJS
- body-parser
- express-fileupload

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