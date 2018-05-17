'use strict';

const co       = require('co');
const Promise  = require('bluebird');
const awscred  = Promise.promisifyAll(require('awscred'));

let initialized = false;

let init = co.wrap(function* () {
  if (initialized) {
    return;
  }

  process.env.restaurants_api = "https://r9x026kgnf.execute-api.us-east-1.amazonaws.com/dev/restaurants";
  process.env.restaurants_table        = "restaurants";
  process.env.AWS_REGION               = "us-east-1";
  process.env.cognito_user_pool_id     = "us-east-1_PnQ0rTJ5e";
  process.env.cognito_client_id        = "test_cognito_client_id";
  process.env.cognito_server_client_id = "4honiq90bhj7ft4vf7ejopsgih";
  
  let cred = yield awscred.loadAsync();
  
  process.env.AWS_ACCESS_KEY_ID     = cred.credentials.accessKeyId;
  process.env.AWS_SECRET_ACCESS_KEY = cred.credentials.secretAccessKey;

  console.log('AWS credential loaded');

  initialized = true;
});

module.exports.init = init;