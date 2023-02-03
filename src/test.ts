import metacriticAPI from '.';
const mapi = metacriticAPI('playstation-4');
mapi.loadMetacriticPage('The Last Of Us Part I').then(() => {
  let response = mapi.getMetacriticScores();
  console.log(response);
});

mapi.setSystem('playtation-5');
mapi.loadMetacriticPage('God of War: Ragnarok').then(() => {
  let response = mapi.getMetacriticScores();
  console.log(response);
});

mapi.setSystem('3ds');
mapi.loadMetacriticPage('Pokemon X').then(() => {
  let response = mapi.getMetacriticScores();
  console.log(response);
});
