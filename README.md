# metacritic-api

metacritic-api provides a simple api that scrappes Metacritic's website and returns the Metascore and various data about a game.

Please be aware that this works by scrapping the game's page, so any changes made to it's desing might break it.

# Installation

Use your preffered package manager:

```console
npm install @alepertu/metacritic-api
# or #
yarn add @alepertu/metacritic-api
```

# Usage

```javascript
import metacriticAPI from 'metacritic-api';

// initalizes the API for the specified platform
const api = metacriticAPI('playstation-5');

// loads the page for the game
await api.loadMetacriticPage('The Last Of Us Part I');

// returns the game's Metascore
const score = api.getMetacriticScores().metacritic_score;
```

# API

## metacriticAPI(string: system)

Creates a new API object
  
|  @parameter  |     @type     |  @values                                                               |
|--------------|:-------------:|------------------------------------------------------------------------|
|  system      |  string       |  playstation-4<br>playstation-5<br>switch<br>pc<br>xbox-one<br>wii-u<br>3ds<br>playstation-vita<br>ios<br>xbox-series-x|

### Usage

```ts
const api = metacriticAPI('playstation-5');
```

### Returns

```ts
{
  getMetacriticScores,
  loadMetacriticPage,
  searchMetacritic,
  getSystem,
  setSystem
}
```

## [async] loadMetacriticPage(string: game_name)

Searches for the Metacritic page of the game on the specified system and saves its HTML content
  
|  @parameter  |     @type     |  @values                       |
|--------------|:-------------:|--------------------------------|
|  game_name   |  string       |  the name of the desired game  |

### Usage

```ts
const page = await api.loadMetacriticPage('The Last of Us Part I');
```

### Returns
```ts
/* Game´s page HTML content */
```

## getMetacriticScores()

Processes the loaded page to obtain the game's data. You must load the page first by calling and awaiting loadMetacriticPage.

### Usage

```typescript
const game_data = api.getMetacriticScores();
```

### Returns
```js
{
  name: 'The Last of Us Part I',
  metacritic_score: 88,
  user_score: 6.56,
  rating: 'M',
  genres: [ 'Action Adventure', 'General' ],
  developers: [ 'Naughty Dog' ],
  publisher: [ 'Sony Interactive Entertainment' ],
  release_date: 'Sep  2, 2022',
  also_on: [ 'PC' ],
  also_on_url: [ 'http://www.metacritic.com/game/pc/the-last-of-us-part-i' ],
  image_url: 'https://static.metacritic.com/images/products/games/0/e482c292d76eb52e010b35979f1366d2-98.jpg',
  cheat_url: 'https://www.gamefaqs.com/console/ps5/code/370167.html'
}
```

## [async] searchMetacritic(string: query)

Uses Metacritic search function to search for a game. Returns an array with the results.
  
|  @parameter  |     @type     |  @values                       |
|--------------|:-------------:|--------------------------------|
|  query       |  string       |  the search term               |

### Usage

```ts
const result = await api.searchMetacritic('dishon');
```

### Returns
```ts
[
  {
    url: 'https://www.metacritic.com/game/playstation-4/dishonored-2',
    name: 'Dishonored 2',
    itemDate: '2016',
    imagePath: 'https://static.metacritic.com/images/products/games/4/642adcf09369ac4cf0f7b33f2845e851-98.jpg',
    metaScore: 88,
    scoreWord: 'favorable',
    refType: 'PS4 Game',
    refTypeId: 30
  },
  {
    url: 'https://www.metacritic.com/game/pc/dishonored',
    name: 'Dishonored',
    itemDate: '2012',
    imagePath: 'https://static.metacritic.com/images/products/games/2/5579c6cdb4efaaab0dc07abaa4bf6644-98.jpg',
    metaScore: 91,
    scoreWord: 'outstanding',
    refType: 'PC Game',
    refTypeId: 30
  },
  ...
]
```

## getSystem()

Shows the current destination system/platform

### Usage

```ts
const currentSystem = api.getSystem();
```

### Returns
```ts
'playstation-5'
```

## setSystem(string: new_system)

Switches the API destination system/platform
  
|  @parameter  |     @type     |  @values                       |
|--------------|:-------------:|--------------------------------|
|  new_system  |  string       |  playstation-4<br>playstation-5<br>switch<br>pc<br>xbox-one<br>wii-u<br>3ds<br>playstation-vita<br>ios<br>xbox-series-x|

### Usage

```ts
api.setSystem('playstation-5');
```

### Returns
```ts
'playstation-5'
```

# License

[MIT](https://choosealicense.com/licenses/mit/)