# REST-API-MERN

This application was built with the MERN stack using Typescript. The Server follows REST standards

# Getting Started
You will need to be on the latest version of Node js

You will need to install yarn first

IF NPM INSTALL DOES NOT WORK, PLEASE RUN yarn install

``npm install --global yarn``

# Usage



There are 2 directories available

Client

Server

# Server

Navigate to the Server Directory 

``cd .\Server\``

Install the relavant packages using

``yarn install``

Next, to run the server, run the command,

``nodemon source/server.ts``

The server will be up and runnning in a few seconds. The server runs on port 1337

Here are the available routes for this API
````
GET - http://localhost:1337/users/validate     => Validates the access token
GET - http://localhost:1337/users/get/all   => Returns JSON of all users in database
GET - http://localhost:1337/members/getAllMembers  => Returns JSON of all Members in the database
POST - http://localhost:1337/users/login   => Validates login
POST - http://localhost:1337/users/register => Registers a new user
POST - http://localhost:1337/members/register => Registers a new member
DELETE - http://localhost:1337/members/deleteMember => Deletes a member
UPDATE - http://localhost:1337/members/updateMember =>Updates a member

````

# Client

Navigate to the Client directory using

`` cd .\Client\``

Next, navigate into the folder

``cd .\member-front\``


Then, install node modules using either,

``yarn install``

Next, start the client using 

`` npm start``

These are all the relavent routes related to the client side

# NOTE: IF USER IS NOT LOGGED IN, HOME(SHOW ALL MEMBERS), CREATE MEMBERS & EDIT MEMBERS WILL PROMPT THE USER TO LOG IN BY SHOWING AN ERROR MESSAGE

Credentials to login with default user 

````
Username - newuser123
Password - password
````

````
/ - This is the home directory. This will list all available members in the database
/login - This is the login page
/register - This is the register page
/create - This page is used to create new members
/edit - This page is used to delete and update existing members

````


