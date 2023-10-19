# Introduction

Demo credit is an MVP wallets API for LendSqr.![ER Diagram for the Database](https://raw.githubusercontent.com/Horlerdipo/credit-demo/main/public/demo-credit.png)

1. Folder Structure

   The folder structure of the source code is inspired by the folder structure of the popular Node.js backend framework [Nest.js](https://nestjs.com/) where projects are divided into modules and instantiated in a single module.
2. Live Sever URL

   The URL endpoint for the project is [here](https://umar-lendsqr-be-test.onrender.com/)
3. Postman Collection Documentation

   The URL endpoint for the postman collection documentation of the available API endpoints  is [here](https://documenter.getpostman.com/view/24743276/2s9YR9XsKg)
4. Postman Collection URL

   The URL endpoint for the postman collection of the available API endpoints  is [here]( https://api.postman.com/collections/24743276-5731b5ef-ee50-4739-a7b2-b43aa7568cd3?access_key=PMAT-01HD1KRD8PNJYNHVTQ7SC2PKXF)

# Features

Features implemented in the API includes

- User Creation
- Get User Auth Token
- Get User Details
- Fund User Wallet
- Inter-Wallet Transfer
- Withdraw Fund
- Get User Transactions

# Technical Info
## Technologies Used

- Node.js
- Typescript
- Express.js
- MySQL
- Knex.js ORM


## Installation

1. Clone the repository into the machine you intend to run it on.
2. Run `npm install` to install all required dependencies.
3. Create a .env file at the root folder of the project, you can copy and paste .env.example file.
4. Create a database and provide the database credentials in the .env file.
5. Navigate to src/database/knexfile.ts and change dotenv.config path from path: '.env' to path: '../../.env'
6. Run the command`npm run migrate` on your the root folder of the project to run the Knex.js migration.
7. Repeat step 4 and change from path: '../../.env' to  path: '.env'
8. Run the command `npm run start:dev` and your application will start on the port you specified in the .env file

## Testing
1. Set up test database(can be MYSQL or sqlite).
2. Run `npm run test`.