// this script sends out payouts to receivers

require('dotenv').config(); // Load environment variables from .env file
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const axios = require('axios');

const apiUrl = 'https://api-m.sandbox.paypal.com/v1/payments/payouts';

const requestData = {
  sender_batch_header: {
    email_subject: 'Your payout is here!',
  },
  items: [
    {
      recipient_type: 'EMAIL',
      amount: {
        value: '100.00',
        currency: 'EUR',
      },
      note: 'Thank you for your service.',
      sender_item_id: 'item_1',
      receiver: 'simogol-buyer@gmail.com', 
    },
    // Add more items for additional recipients here
  ],
};

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

    // sending payouts
    axios.post(apiUrl, requestData, {
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
    // authentication error
    console.error(e);
  }
})();

