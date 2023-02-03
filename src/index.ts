import axios from 'axios';
import * as cheerio from 'cheerio';

const systems = [
  'playstation-4',
  'playstation-5',
  'pc',
  'xbox-one',
  'wii-u',
  '3ds',
  'playstation-vita',
  'ios',
  'xbox-series-x',
];

type MetacriticSystem = typeof systems[number];

interface MetacriticOutput {
  name: string;
  metascritic_score: number | 'TBD';
  user_score: number | 'TBD';
  rating: string;
  genres: Array<string>;
  developers: Array<string>;
  publisher: Array<string>;
  release_date: string;
  also_on: Array<string>;
  also_on_url: Array<string | undefined>;
  image_url: string | undefined;
  cheat_url: string | undefined;
}

/**
 * Simple MetaCritic API to get multi-platform games scores
 * @author Alejandro Pertusatti <alepertu@gmail.com>
 * @param system - One of the supported systems
 * @returns The API methods
 */
function metacriticAPI(system: MetacriticSystem) {
  let response = '';
  let baseUrl = 'http://www.metacritic.com/game/';

  /**
   * Searches for the Metacritic page of the game on the specified system and saves its HTML content
   * @async
   * @param game_name - The name of the game
   * @returns A promise that resolves to the Metacritic page content for the game
   */
  async function loadMetacriticPage(game_name: string) {
    const sanitizedGameName = game_name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z\d?!-]+/g, '');
    const url = `${baseUrl}${system}/${sanitizedGameName}`;
    const get = await axios.get(url);
    response = get.data;
    return response;
  }

  /**
   * Processes the loaded page to obtain the game's data
   * @returns A JSON Object containing the game's information
   */
  function getMetacriticScores() {
    if (!response) {
      return;
    }

    const $ = cheerio.load(response);
    const jsonOutput: MetacriticOutput = {
      name: $('div.product_title h1').text().trim(),
      metascritic_score: 'TBD',
      user_score: 'TBD',
      rating: $('li.summary_detail.product_rating span.data').text().trim(),
      genres: [],
      developers: $('li.summary_detail.developer span.data')
        .text()
        .trim()
        .split(', '),
      publisher: $('li.summary_detail.publisher span.data a')
        .text()
        .split(/\n/g)
        .map((publisher) => publisher.trim())
        .filter((publisher) => !!publisher),
      release_date: $('li.summary_detail.release_data span.data').text().trim(),
      also_on: [],
      also_on_url: [],
      image_url: $('img.product_image.large_image').attr('src'),
      cheat_url: $('li.summary_detail.product_cheats span.data a').attr('href'),
    };

    $('li.summary_detail.product_genre span.data').each(function () {
      jsonOutput.genres.push($(this).text().trim());
    });
    $('li.summary_detail.product_platforms span.data a').each(function () {
      jsonOutput.also_on.push($(this).text().trim());
      jsonOutput.also_on_url.push(
        'http://www.metacritic.com' + $(this).attr('href')
      );
    });

    const releaseDate = Date.parse(jsonOutput.release_date);
    if (!(releaseDate > Date.now())) {
      jsonOutput.metascritic_score = parseInt(
        $('div.metascore_w.game span').text()
      );
      jsonOutput.user_score = parseFloat(
        $('div.metascore_w.user.game').text().trim()
      );
    }

    return jsonOutput;
  }

  /**
   * Switches the API destination system
   * @param new_system - One of the supported systems
   */
  function setSystem(new_system: MetacriticSystem) {
    if (systems.includes(new_system)) {
      system = new_system;
    } else {
      throw new Error('System invalid');
    }
  }

  return {
    loadMetacriticPage,
    getMetacriticScores,
    setSystem,
  };
}

export default metacriticAPI;
