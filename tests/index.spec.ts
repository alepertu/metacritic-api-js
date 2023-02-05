import 'mocha';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import metacriticAPI from '../src';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('MetacriticAPI', function () {
  describe('# loadMetacriticPage()', function () {
    it('1. Should load the page on valid input', function (done) {
      const api = metacriticAPI('pc');
      api.loadMetacriticPage('The Witcher 3: Wild Hunt').then(() => {
        if (!api.checkValidResponse()) {
          done(api.checkValidResponse());
        }
        done();
      });
    });
    it('2. Should throw an error on invalid system', async function () {
      const api = metacriticAPI('invalid');
      expect(api.loadMetacriticPage('The Witcher 3: Wild Hunt')).to.eventually
        .be.rejected;
    });
  });
  describe('# getMetacriticScores()', function () {
    it('1. Should return an object with the game information', async function () {
      const api = metacriticAPI('pc');
      await api.loadMetacriticPage('The Witcher 3: Wild Hunt');
      const scores = api.getMetacriticScores();

      expect(scores).to.be.an('object');
      expect(scores).to.have.property('name');
      expect(scores).to.have.property('metascritic_score');
      expect(scores).to.have.property('user_score');
      expect(scores).to.have.property('rating');
      expect(scores).to.have.property('genres');
      expect(scores).to.have.property('developers');
      expect(scores).to.have.property('publisher');
      expect(scores).to.have.property('release_date');
      expect(scores).to.have.property('also_on');
      expect(scores).to.have.property('also_on_url');
      expect(scores).to.have.property('image_url');
      expect(scores).to.have.property('cheat_url');
    });
    it('2. Should throw an error if no page is loaded', function () {
      const api = metacriticAPI('pc');
      expect(api.getMetacriticScores).to.throw(
        'There is no page loaded. Use loadMetacriticPage first.'
      );
    });
  });

  describe('# getSystem()', function () {
    it('1. Should return the initial system', function () {
      const api = metacriticAPI('pc');
      expect(api.getSystem()).to.equal('pc');
    });
  });
  describe('# setSystem()', function () {
    it('1. Should set the new system correctly', function () {
      const api = metacriticAPI('pc');
      api.setSystem('playstation-5');
      expect(api.getSystem()).to.equal('playstation-5');
    });
    it('2. Should throw an error on invalid system', function () {
      const api = metacriticAPI('pc');
      expect(api.setSystem.bind(null, 'invalid')).to.throw('System invalid');
    });
  });
});
