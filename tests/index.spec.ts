import 'mocha';
import chai from 'chai';
import metacriticAPI from '../src';

const expect = chai.expect;

describe('MetacriticAPI', function () {
  it('1. Should be a function', function () {
    expect(metacriticAPI).to.be.a('function');
  });
  it('2. Should return all the API methods', function () {
    const api = metacriticAPI('pc');

    expect(api).to.have.property('loadMetacriticPage');
    expect(api).to.have.property('getMetacriticScores');
    expect(api).to.have.property('searchMetacritic');
    expect(api).to.have.property('getSystem');
    expect(api).to.have.property('setSystem');
  });
  it('3. Should throw an error on invalid system', function () {
    expect(metacriticAPI.bind(null, 'invalid')).to.throw('System invalid');
  });
  describe('# loadMetacriticPage()', function () {
    it('1. Should load the page on valid input', async function () {
      const api = metacriticAPI('pc');
      const page = await api.loadMetacriticPage('The Witcher 3: Wild Hunt');
      expect(page).to.be.a('string');
    });
  });
  describe('# getMetacriticScores()', function () {
    it('1. Should return an object with the game information', async function () {
      const api = metacriticAPI('playstation-5');
      await api.loadMetacriticPage('The Last of Us Part I');
      const scores = api.getMetacriticScores();

      expect(scores).to.be.an('object');
      expect(scores).to.have.property('name');
      expect(scores).to.have.property('metacritic_score');
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
  describe('# searchMetacritic()', function () {
    it('1. Should return an array with the search results', async function () {
      const api = metacriticAPI('pc');
      const searchResult = await api.searchMetacritic('dishon');
      expect(searchResult).to.be.an('array');
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
