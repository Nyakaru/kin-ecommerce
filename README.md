# kin-ecommerce

API that enlists ecommerce items and handles purchase details.

## Description

**kin-ecommerce** is the our solution for a simple Node-Js API that enlists ecommerce items and handles purchase details.

### Branches
* main - main branch: all source code after review and feedback.
* develop - all the features developed.

## Setup

### Dependencies

- [NodeJS](https://github.com/nodejs/node) - A JavaScript runtime environment

### Getting Started

- Install [Nodejs](https://nodejs.org/en/download/)
- Clone the repository by running the command

  ```[bash]
  git clone https://github.com/Nyakaru/kin-ecommerce.git
  ```

- Run `cd kin-ecommerce` to enter the application's directory

#### Local setup 
- Install the application's dependencies by running the command
  ```
  yarn install
  ```
- Start the application by running
  ```
  yarn start
  ```
- The application should now be running on the `port 5000`
- Navigate to postman to test the APIs out on `http://localhost:5000`


#### Using docker
- Buld the application by running the following command
```
  docker-compose build
  ```
- Run your dockerized app, just execute the command below
```
  docker-compose up
  ```
- The application should now be running on the `port 8080`
- Navigate to postman to test the APIs out on `http://localhost:8080`

## API Documentation
https://documenter.getpostman.com/view/5294981/TVes5ki4

## Endpoints

| URL                                                       | Methods | Description              | Requires Auth  |
|-----------------------------------------------------------|---------|--------------------------|----------------|
| `/`                                                       | GET     | The base URL             | FALSE          |
| `/signup`                                                 | POST    | Register User            | FALSE          |
| `/login`                                                  | POST    | Login User               | FALSE          |
| `/product`                                                | POST    | Creates Product          | TRUE           |
| `/product`                                                | GET     | Gets all products        | TRUE           |
| `/product/<:id>`                                          | PUT     | Update a product         | TRUE           |
| `/product/<:id>`                                          | DELETE  | Deletes a product        | TRUE           |
| `/product/<:id>`                                          | GET     | Returns one product      | TRUE           |
| `/cart`                                                   | GET     | Gets cart items          | TRUE           |
| `/cart`                                                   | POST    | Add product to cart      | TRUE           |
| `/cart/empty`                                             | DELETE  | Deletes a cart           | TRUE           |
