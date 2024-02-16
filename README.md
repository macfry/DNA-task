# How should I start
1. Clone the repository
1. `npm install`
1. Run `json-server` to have mocked api (`npm run api`)
1. Check if application is starting (`npm run dev`).
    1. Make sure you use Node 18

## Scenario

Let's imagine that you are working on the frontend for the festival system discussed during teamtask part of the interview.
You have a mock api that has the following endpoints:
- `/merchants` returning all merchants
- `/transactions` returning all transactions

Currently implemented is a really simple dashboard that shows statistics for transactions and registered merchants.

## Task 1
Please make a code review of the currently implemented solution.

## Task 2
Add new page that allows filtering by period and merchant to show:
- amount of transactions in selected period
- amount of revenue in selected period
- list of transactions for a selected merchant

On the list there could be an option to click on the transaction to display transaction details.
Going back to merchant view all preselected options should be preserved.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
Open [http://localhost:3000](http://localhost:8000) to view available api endpoints.

### `npm run test:unit`

Run the test cases.