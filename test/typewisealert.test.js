const alerts = require('../src/typewisealert');
const { expect } = require('chai');

describe('Typewise Alert Tests', () => {
  it('infers a value lower than the minimum as TOO_LOW', () => {
    expect(alerts.inferBreach(20, 50, 100)).equals('TOO_LOW');
  });

  it('infers a value higher than the maximum as TOO_HIGH', () => {
    expect(alerts.inferBreach(110, 50, 100)).equals('TOO_HIGH');
  });

  it('infers a value within the range as NORMAL', () => {
    expect(alerts.inferBreach(60, 50, 100)).equals('NORMAL');
  });

  it('classifies temperature correctly for PASSIVE_COOLING', () => {
    expect(alerts.classifyTemperatureBreach('PASSIVE_COOLING', 20)).equals('NORMAL');
    expect(alerts.classifyTemperatureBreach('PASSIVE_COOLING', 36)).equals('TOO_HIGH');
    expect(alerts.classifyTemperatureBreach('PASSIVE_COOLING', -1)).equals('TOO_LOW');
  });

  it('classifies temperature correctly for HI_ACTIVE_COOLING', () => {
    expect(alerts.classifyTemperatureBreach('HI_ACTIVE_COOLING', 20)).equals('NORMAL');
    expect(alerts.classifyTemperatureBreach('HI_ACTIVE_COOLING', 46)).equals('TOO_HIGH');
    expect(alerts.classifyTemperatureBreach('HI_ACTIVE_COOLING', -1)).equals('TOO_LOW');
  });

  it('classifies temperature correctly for MED_ACTIVE_COOLING', () => {
    expect(alerts.classifyTemperatureBreach('MED_ACTIVE_COOLING', 20)).equals('NORMAL');
    expect(alerts.classifyTemperatureBreach('MED_ACTIVE_COOLING', 41)).equals('TOO_HIGH');
    expect(alerts.classifyTemperatureBreach('MED_ACTIVE_COOLING', -1)).equals('TOO_LOW');
  });

  it('sends to the controller correctly', () => {
    const consoleSpy = sinon.spy(console, 'log');
    alerts.sendToController('TOO_LOW');
    expect(consoleSpy.calledWith('0xfeed, TOO_LOW')).to.be.true;
    consoleSpy.restore();
  });

  it('sends email notifications correctly', () => {
    const consoleSpy = sinon.spy(console, 'log');
    alerts.sendToEmail('TOO_LOW');
    expect(consoleSpy.calledWith('To: a.b@c.com')).to.be.true;
    expect(consoleSpy.calledWith('Hi, the temperature is too low')).to.be.true;
    consoleSpy.restore();
  });
});
