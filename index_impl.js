const snsApi = require('./snsApi.js');
const response = require("cf-fetch-response");

exports.handler = async (event, context) => {
    switch (event.RequestType.toLowerCase()) {
        case 'create': {
      //todo      return create(event, context);
        }
        case 'update': {
            //todo:          return update(event, context);
        }
        case 'delete': {
            //todo          return deleteFn(event, context);
        }
    }
};