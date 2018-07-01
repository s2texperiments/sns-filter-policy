const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;

const sinon = require('sinon');
const fake = require('sinon').fake;

const proxyquire = require('proxyquire').noCallThru();

const fs = require('fs');

describe('sns-filter-policy', () => {

    let successFake;
    let failFake;
    let snsSetSubscriptionAttributesFake;

    let underTest;

    let expectedValidSNSSetSubscriptionAttributes;

    let cfCreateEvent;
    let cfUpdateEvent;
    let cfDeleteEvent;

    beforeEach(() => {
        successFake = fake.resolves("send suc");
        failFake = fake.resolves("send fail");

        snsSetSubscriptionAttributesFake =  fake.resolves({status: 'successful'});

        underTest = proxyquire('../index_impl.js', {
            'cf-fetch-response': {
                sendSuccess: successFake,
                sendFail: failFake
            },
            '.snsApi/':{
                setSubscriptionAttributes:snsSetSubscriptionAttributesFake
            }
        });

        expectedValidSNSSetSubscriptionAttributes = JSON.parse(fs.readFileSync('test/expectedValidSNSSetSubscriptionAttributes.json'))

        cfCreateEvent = JSON.parse(fs.readFileSync('test/cfCreateEventData.json', 'utf8'));
        cfUpdateEvent = JSON.parse(fs.readFileSync('test/cfUpdateEventData.json', 'utf8'));
        cfDeleteEvent = JSON.parse(fs.readFileSync('test/cfDeleteEventData.json', 'utf8'));

    });

    afterEach(() => {
        sinon.restore();
    });

    describe('Missing mandatory arguments should result into rejection', () => {

    });

    describe('Failed service calls should result into rejection', () => {

    })


});