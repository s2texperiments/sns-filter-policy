const AWS = require('aws-sdk');
const sns = new AWS.SNS();

module.exports = {
    setSubscriptionAttributes: async (params) =>new Promise((resolve, rejected) =>
        sns.setSubscriptionAttributes(params, (err, data) =>
            err ? rejected(err) : resolve(data)))
};