const { SESClient } = require("@aws-sdk/client-ses");
require("dotenv").config();
// Set the AWS Region.
const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AMAZON_ACCESS_KEY,
    secretAccessKey: process.env.AMAZON_SECRET_KEY,
  },
});
module.exports = { sesClient };
