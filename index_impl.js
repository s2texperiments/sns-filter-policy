const snsApi = require('./snsApi.js');
const response = require("cf-fetch-response");

exports.handler = async (event, context) => {

    let {
        RequestType,
        ResourceProperties: {
            FilterPolicy,
            SubscriptionArn,
        }
    } = event;

    switch (RequestType.toLowerCase()) {
        case 'create': {
            console.log(`Create sns filter policy`);
            return create({FilterPolicy, SubscriptionArn})
                .then(() => response.sendSuccess(event, context));
        }
        case 'update': {
            console.log(`Update sns filter policy`);
            if (!FilterPolicy || !SubscriptionArn) {
                throw `missing mandatory argument: FilterPolicy=${FilterPolicy} SubscriptionArn=${SubscriptionArn}`
            }
            return;
            //todo:          return update(event, context);
        }
        case 'delete': {
            console.log(`Delete sns filter policy`);
            return deleteFn({SubscriptionArn})
                .then(() => response.sendSuccess(event, context));
        }
    }
};


let create = async ({FilterPolicy, SubscriptionArn} = {}) => {
    if (!FilterPolicy || !SubscriptionArn || !Array.isArray(FilterPolicy)) {
        throw `missing mandatory argument: FilterPolicy=${FilterPolicy} SubscriptionArn=${SubscriptionArn}`
    }

    let value = FilterPolicy.reduce((acc, cur) => {
        if (acc[cur.Attribute]) {
            throw `Duplicate entry: ${cur.Attribute}`;
        }
        acc[cur.Attribute] = JSON.parse(cur.Policy);
        return acc;
    }, {});

    return snsApi.setSubscriptionAttributes({
        AttributeName: 'FilterPolicy',
        SubscriptionArn: SubscriptionArn,
        AttributeValue: JSON.stringify(value)
    });
};

let deleteFn = async ({SubscriptionArn} = {}) => {
    if (!SubscriptionArn) {
        return;
    }

    return snsApi.setSubscriptionAttributes({
        AttributeName: 'FilterPolicy',
        SubscriptionArn: SubscriptionArn,
        AttributeValue: '{}'
    });
};