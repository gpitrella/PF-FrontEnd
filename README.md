# PF-FrontEnd
App Tech Ecommerce - Front End
Main Stack in this Proyect:
- React
- Redux
- SendGrid
- Integration with Google, Google Maps
- Integration with Mercado Pago

<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Tech Market

## Introduction

This is a student group project, in which all the technologies learned in the SoyHenry bootcamp come together. The project is a fully functional e-commerce of technology products on the user side, as well as on the side of the administrator or owner of the e-commerce.

## Project Objetives

- Build a JavaScript App from scratch
- Afirm and conect all the learned concepts in the Carreer 
- Learn and practice GIT workflow / team work
- Use Scrum agile methodology

## Stack of Technologies

### Front End:
HTML, CSS, Javascript, React, React-Bootstrap, Redux, SendGrid, Google and Mercado Pago Integration, Material UI, SASS

### Back End:
Node.js, Express, Passport, Sequelize

### Database:
PostgreSQL

## **Starting Instructions** 

__IMPORTANT:__ Necesary version of node and NPM 

 * __Node__: 12.18.3 or higher
 * __NPM__: 6.14.16 or higher

 
## BoilerPlate

The boilerPlate has two folders: `api` and `client`.
You can find the first folder 'client' in this repo and the second folder like 'PF-BackEnd' in this same github.

Inside `api` you must have to create a file called: `.env` 
that has the following form: 

```
DB_USER=postgress
DB_PASSWORD=12345
DB_HOST=localhost:5432
PORT=3001
DB_KEY=techmarket
ACCESS_TOKEN=*****

# Auth Config
AUTH_SECRET=****
AUTH_EXPIRES=1d
AUTH_ROUNDS=10
CLIENT_URL=http://localhost:3000
GOOGLE_CLIENT_ID=*****
GOOGLE_CLIENT_SECRET=*****
SENDGRID_API_KEY=*****
```

You have to replace `DB_USER` and `DB_PASSWORD` with your own credentials to connect to postgres database. This file will be ignored by github, as it contains sensitive information (the credentials).

The DB_KEY is a random security keyword, you can change or keep it.  

In Auth Config you must generated your own Google and SendGrid credential to use this functionalities.

## Next 
### _Connect the data base_

 - Go to your postgres database manager and create a new  database called `techmarket`, this is the name of the database to which we will connect.

### _Install the necesary package to run it_

- Open the project console
    + Inside `api` folder, run the command line, `npm install`
    + Inside `client` folder, run the command line, `npm install` 

### _Run the project_

- Open the project console
    + Inside `api` folder, run the command line, `npm start`
    + Inside `api` folder, run the command line, `node Api-Store.js` and `node Api-Users.js` to create standard products and users.
        
    + Inside `client` folder, run the command line, `npm start` (go to http://localhost:3000/) 

# For testing

- You can find in `api/index.js`
    + `conn.sync({ force: false })`, switch it between " true " ( if you want reset database in each loaded ) or " false "( if you dont want reset database in each loaded ) 

- You can use a testing admin user with login credentials, look inside Api-Users.js to find admin users.

# Deploy Project 

https://techmarketfront.vercel.app/

# Project Screens 

- Landing-Page
![Landing-ecommerce](https://user-images.githubusercontent.com/66705822/99189972-c6b4e200-2742-11eb-89c1-399e42481fd1.png)

- Register, we can do it using the ecommerce platform (by form) or authenticate with github, google or twitter.
![register](https://user-images.githubusercontent.com/66705822/99189999-e5b37400-2742-11eb-8dbd-dd80f80039e8.png)

 - Welcome message when we get registered
![mail](https://user-images.githubusercontent.com/66705822/99190023-01b71580-2743-11eb-80fc-66901ab019d8.png)

 - Catalogue with products
![Catalogue-ecommerce](https://user-images.githubusercontent.com/66705822/99189993-db917580-2742-11eb-83df-dab0391da063.png)

 - Products in detail
![Products-detail](https://user-images.githubusercontent.com/66705822/99190009-f8c64400-2742-11eb-84f9-682887512d27.png)

 - Cart
![cart](https://user-images.githubusercontent.com/66705822/99190035-0d0a4100-2743-11eb-8a89-d1a00ffd13ca.png)

- Checkout. You can pay using paypal or with a debit/credit card
![Checkout](https://user-images.githubusercontent.com/66705822/99190228-2790ea00-2744-11eb-82d8-8663ba6dfc9b.png)

- Profile
![profile](https://user-images.githubusercontent.com/66718960/99322129-103e2380-284e-11eb-8d1d-9e1bf4365633.JPG) 

 - We can add reviews to the products that we had purchase
![add-review](https://user-images.githubusercontent.com/66705822/99190564-f31e2d80-2745-11eb-80d8-e53ae7cc1ab2.png)

 - After add a review we can see it in products-detail
![reviews-footer](https://user-images.githubusercontent.com/66705822/99190568-f74a4b00-2745-11eb-92db-e8ff50a8e951.png)

- There is an admin section where we have a CRUD of products, categories, orders and users.
![Admin-panel](https://user-images.githubusercontent.com/66705822/99190252-47281280-2744-11eb-92bb-210656defceb.png)
