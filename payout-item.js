// get info about a specific payout batch

require('dotenv').config(); // Load environment variables from .env file
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const axios = require('axios');

// see output from payout-batch.js and change the following variable accordingly
const itemId = "R43WLRAVYZSZG";
const apiUrl = `https://api.sandbox.paypal.com/v1/payments/payouts-item/${itemId}`;

(async () => {
  try {
    // trying to authenticate and retrieve JWT token 
    const { data: { access_token } } = await axios({
      url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en_US',
        'content-type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: clientId,
        password: clientSecret,
      },
      params: {
        grant_type: 'client_credentials',
      },
    });
    console.log('access_token: ', access_token);
    // trying to retrieve information for a specific payout item
    axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      // payouts error
      console.error(error);
    });

  } catch (e) {
    console.error(e);
  }
})();