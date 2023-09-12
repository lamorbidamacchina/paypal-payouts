# paypal-payouts
## Basic interaction with Paypal Payouts API

This prototype shows basic interactions with Paypal APIs, regarding Payouts.
* Register and login to [https://developer.paypal.com/](url)
* In your sandbox, create a new app (as a Platform, in order to be able to send payments to other users)
* Rename .env-test to .env and fill in your Paypal Client ID and Paypal Client Secret


To use the prototype, launch:

`npm install`

To send a new payout, edit payouts.js file and then launch:

`node payouts`

To check a payout batch status, edit payout-batch.js file with the proper batch ID (l.9) and then launch:

`node payout-batch.js`

To check a payout batch item status, edit payout-item.js file with the proper item ID (l.9) and then launch:

`node payout-item.js`