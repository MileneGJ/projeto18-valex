<!-- PROJECT LOGO -->
<br />
<div align="center">
    <h3 align="center">VALEX - API DOCUMENTATION</h3>
  <p>
    Back-end Development Project for Driven Bootcamp course
    <br />
    <a href="https://github.com/MileneGJ/projeto18-valex/blob/main/src/index.ts"><strong>Browse TypeScript code»</strong></a>
</div>

<div align="center">
  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  
</div>

<!-- Table of Contents -->

# Table of Contents

- [Getting Started](#getting-started)
  - [Database](#database)
- [API Reference](#api-reference)
  - [Routes](#routes)
  - [Cards](#cards)
  - [Payments](#payments)
  - [Recharges](#recharges)

<!-- Getting Started -->

# Getting Started

This Api can be used in two different ways: by cloning the project or by running in your preferred client, such as [Insomnia](https://insomnia.rest/) or [Postman](https://www.getpostman.com/).

To clone the project, run the following command:

```git
git clone https://github.com/MileneGJ/projeto18-valex.git
```

Then, navigate to the project folder and run the following command:

```git
npm install
```

Finally, start the server:

```git
npm start
```

You can now access the API's endpoints by navigating to `http://localhost:5000/`

<!-- Database -->

# Database

This project used as reference a postgres database that can be created using these <a href="https://github.com/MileneGJ/projeto18-valex/blob/main/README files/scripts"><strong>scripts</strong></a>

Since this application is not deployed, it is recommended to create a local database with the scripts above for the correct functioning of the project resources.  

<!-- API Reference -->

# API Reference

In this section, you will find the API's endpoints and their descriptions, along with the request and response examples. All data is sent and received as JSON.

<!-- Routes -->

## Routes

### [Cards](#cards) _`/card`_

- [Create a card](#---create-a-card)
- [Activate a card](#---activate-a-card)
- [See balance for a card](#---see-balance-for-a-card)
- [Block a card](#---block-a-card)
- [Unblock a card](#---unblock-a-card)

### [Payments](#payments) _`/purchase`_

- [POS payment](#---POS-payment)
- [Online payment](#---online-payment)

### [Recharges](#recharges) _`/recharge`_

- [New recharge](#---new-recharge)

## Cards

### Create a card

###### POST _`/new-card`_

### Request

###### Body

```json
{
  "employeeId": "1",
  "cardType": "health"
}
```

###### Headers

```json
{
  "Content-Type": "application/json",
  "x-api-key": "placeholder-api-key"
}
```

### Responses

| Status Code |      Description      |      Properties      |
| :---------: | :-------------------: | :------------------: |
|   **201**   |        Created        |      `data: {}`      |
|   **401**   |      Unauthorized     | `error: { message }` |
|   **404**   |       Not Found       | `error: { message }` |
|   **409**   |       Conflict        | `error: { message }` |
|   **422**   |     Invalid Input     | `error: { message }` |
|   **500**   | Internal Server Error | `error: { message }` |

### Activate a card

###### POST _`/card/activate/:cardId`_

### Request

###### Body

```json
{
  "securityCode": "616",
  "password": "1234"
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

###### Params

```
cardId:3
```

### Responses

| Status Code |      Description      |      Properties      |
| :---------: | :-------------------: | :------------------: |
|   **200**   |           OK          |      `data: {}`      |
|   **401**   |      Unauthorized     | `error: { message }` |
|   **404**   |       Not Found       | `error: { message }` |
|   **409**   |       Conflict        | `error: { message }` |
|   **422**   |     Invalid Input     | `error: { message }` |
|   **500**   | Internal Server Error | `error: { message }` |

### See balance for a card

###### GET _`/balance/:cardId`_

### Request

###### Params

```
cardId:3
```

### Responses

| Status Code |      Description      |      Properties      |
| :---------: | :-------------------: | :------------------: |
|   **200**   |           OK          |      `data: {}`      |
|   **404**   |       Not Found       | `error: { message }` |
|   **409**   |       Conflict        | `error: { message }` |
|   **422**   |     Invalid Input     | `error: { message }` |
|   **500**   | Internal Server Error | `error: { message }` |

### Block a card

###### POST _`/card/block/:cardId`_

### Request

###### Body

```json
{
  "password": "1234"
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

###### Params

```
cardId:3
```


### Responses

| Status Code |      Description      |      Properties      |
| :---------: | :-------------------: | :------------------: |
|   **200**   |           OK          |      `data: {}`      |
|   **401**   |      Unauthorized     | `error: { message }` |
|   **404**   |       Not Found       | `error: { message }` |
|   **409**   |       Conflict        | `error: { message }` |
|   **422**   |     Invalid Input     | `error: { message }` |
|   **500**   | Internal Server Error | `error: { message }` |

### Unblock a card

###### POST _`/card/unblock/:cardId`_

### Request

###### Body

```json
{
  "password": "1234"
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

###### Params

```
cardId:3
```


### Responses

| Status Code |      Description      |      Properties      |
| :---------: | :-------------------: | :------------------: |
|   **200**   |           OK          |      `data: {}`      |
|   **401**   |      Unauthorized     | `error: { message }` |
|   **404**   |       Not Found       | `error: { message }` |
|   **409**   |       Conflict        | `error: { message }` |
|   **422**   |     Invalid Input     | `error: { message }` |
|   **500**   | Internal Server Error | `error: { message }` |

## Payments

### POS payment

###### POST _`/pos-purchase/:businessId`_

### Request

###### Body

```json
{
  
  "password": "1234"
  "cardId": 3,
  "amount": 1000
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

###### Params

```
businessId:5
```

### Responses

| Status Code |      Description      |      Properties      |
| :---------: | :-------------------: | :------------------: |
|   **201**   |        Created        |      `data: {}`      |
|   **401**   |      Unauthorized     | `error: { message }` |
|   **404**   |       Not Found       | `error: { message }` |
|   **409**   |       Conflict        | `error: { message }` |
|   **422**   |     Invalid Input     | `error: { message }` |
|   **500**   | Internal Server Error | `error: { message }` |


### Online payment

###### POST _`/online-purchase/:businessId`_

### Request

###### Body

```json
{
  
  "cardNumber": "1234-1234-1234-1234"
  "cardholderName": "JOHN S SMITH",
  "expirationDate": "09/27",
  "securityCode": "277",
  "amount": 1000
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

###### Params

```
businessId:5
```

### Responses

| Status Code |      Description      |      Properties      |
| :---------: | :-------------------: | :------------------: |
|   **201**   |        Created        |      `data: {}`      |
|   **401**   |      Unauthorized     | `error: { message }` |
|   **404**   |       Not Found       | `error: { message }` |
|   **409**   |       Conflict        | `error: { message }` |
|   **422**   |     Invalid Input     | `error: { message }` |
|   **500**   | Internal Server Error | `error: { message }` |


## Recharges

### New recharge

###### POST _`/recharge/:cardId`_

### Request

###### Body

```json
{
  "amount": 1000
}
```

###### Headers

```json
{
  "Content-Type": "application/json",
  "x-api-key": "placeholder-api-key"
}
```

###### Params

```
businessId:5
```


### Responses

| Status Code |      Description      |      Properties      |
| :---------: | :-------------------: | :------------------: |
|   **201**   |        Created        |      `data: {}`      |
|   **401**   |      Unauthorized     | `error: { message }` |
|   **404**   |       Not Found       | `error: { message }` |
|   **409**   |       Conflict        | `error: { message }` |
|   **422**   |     Invalid Input     | `error: { message }` |
|   **500**   | Internal Server Error | `error: { message }` |


