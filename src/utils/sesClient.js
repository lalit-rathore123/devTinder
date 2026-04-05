const { SESClient } = require("@aws-sdk/client-ses");

// Set the AWS Region.
const REGION = "eu-north-1";
const sesClient = new SESClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AMAZON_ACCESS_KEY,
    secretAccessKey: process.env.AMAZON_SECRET_KEY,
  },
});
module.exports = { sesClient };
