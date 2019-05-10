# Quick-Credit

Quick Credit, a lending company we are dedicated to helping our customers borrow and invest funds. We offer a fully digital experience by providing credit to salary earners in Nigerian through their employer or individually.

[![Build Status](https://travis-ci.org/dgovnor/Quick-Credit.svg?branch=develop)](https://travis-ci.org/dgovnor/Quick-Credit) [![Test Coverage](https://api.codeclimate.com/v1/badges/123ae50e0da75177f055/test_coverage)](https://codeclimate.com/github/dgovnor/Quick-Credit/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/123ae50e0da75177f055/maintainability)](https://codeclimate.com/github/dgovnor/Quick-Credit/maintainability) [![Coverage Status](https://coveralls.io/repos/github/dgovnor/Quick-Credit/badge.svg)](https://coveralls.io/github/dgovnor/Quick-Credit)
 [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
# Introuction
## _Project Overview_
We are Quick Credit, a lending company with customers in 36 states in Nigeria. We don’t have branches, but we are dedicated to helping our customers borrow and invest funds. We offer a fully digital experience by providing credit to salary earners in Nigerian through their employer or individually. This means our customers can access finance anytime and anywhere. For more inqueries please fill up the contact form bellow so we can get back to you.

## Screenshot(UI template)
![quickcredit](https://github.com/dgovnor/Quick-Credit/blob/develop/Screenshot%20from%202019-05-06%2011-45-10.png)
### **Style guide**

[Airbnb ](https://github.com/airbnb/javascript)(Javascript style guide)

# UI Templates

Preview UI templates [Github Pages](https://dgovnor.github.io/Quick-Credit/UI/index.html)

# Pivotal Tracker ID
https://www.pivotaltracker.com/n/projects/2326523

# Technologies

- NodeJs
- Express
- Mocha & Chai
- ESLint
- Babel
- Travis
- Code Climate
- Coveralls

# Installing

#### _Prerequisites_

Ensure you have **NodeJS** installed by entering `node -v` on your terminal
If you don't have **NodeJS** installed, go to the [NodeJS Website](http://nodejs.org), and follow the download instructions

To install this app

`git clone https://github.com/dgovnor/Quick-Credit.git`

And install the required dependencies

`npm install`

Run server

`npm run start-dev`

Server listens on port `3002`

## Running the tests

To run test cases

`npm test`

## _API Endpoints_

| Endpoint                                     |              Functionality               | HTTP method |
| -------------------------------------------- | :--------------------------------------: | ----------: |
| /api/v1/auth/signup                          |          Create a user account           |        POST |
| /api/v1/auth/login                           |               Login a user               |        POST |
| /api/v1/user/_:id_/loans                       |        Create a loan application       |        POST |
| /api/v1/user/_:id_/_:loanid_/repayments      |     User view all loan repayment History |         GET |
| /api/v1/admin/_:id_/users/_:email_/verify    |          Mark User as Verified           |       PATCH |
| /api/v1/admin/_:id_/loans/_:loanid_/repayment|        Create a repayment record         |        POST |
| /api/v1/admin/_:id_/loans/_:loanid_          |          Reject or approve loan          |       PATCH |
| /api/v1/admin/_:id_/loans/_:loanid_          |     Get a specific loan application      |         GET |
| /api/v1/admin/_:id_/loans                    |        Get all loan applications         |         GET |
| /api/v1/admin/_:id_/loans?_status=approved&repaid=false_ | View all current loans(not fully repaid) |         GET |
| /api/v1/admin/_:id_/loans?_status=approved&repaid=true_  |      View all current repaid loans       |         GET |
| /api/v1/admin/:id/users/:email               |            Get A Single User             |         GET |


## Licensing
The code in this project is licensed under MIT license.
