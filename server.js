// Babel ES6/JSX Compiler
require('babel-register');

var _ = require('underscore');
var async = require('async');
var request = require('request');

var config = require('./config');
var mongoose = require('mongoose');
var Summoner = require('./models/summoners');
var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var championsData = {
    "266" :  { championId: 266, championName: 'Aatrox', title: 'The Darkin Blade'},
    "103" :  { championId: 103, championName: 'Ahri', title: 'The Nine-Tailed Fox'},
    "84" :  { championId: 84, championName: 'Akali', title: 'The Fist of Shadow'},
    "12" :  { championId: 12, championName: 'Alistar', title: 'The Minotaur'},
    "32" :  { championId: 32, championName: 'Amumu', title: 'The Sad Mummy'},
    "34" :  { championId: 34, championName: 'Anivia', title: 'The Cryophoenix'},
    "1" :  { championId: 1, championName: 'Annie', title: 'The Dark Child'},
    "22" :  { championId: 22, championName: 'Ashe', title: 'The Frost Archer'},
    "136" :  { championId: 136, championName: 'Aurelion Sol', title: 'The Star Forger'},
    "268" :  { championId: 268, championName: 'Azir', title: 'The Emperor of the Sands'},
    "432" :  { championId: 432, championName: 'Bard', title: 'The Wandering Caretaker'},
    "53" :  { championId: 53, championName: 'Blitzcrank', title: 'The Great Steam Golem'},
    "63" :  { championId: 63, championName: 'Brand', title: 'The Burning Vengeance'},
    "201" :  { championId: 201, championName: 'Braum', title: 'The Heart of the Freljord'},
    "51" :  { championId: 51, championName: 'Caitlyn', title: 'The Sheriff of Piltover'},
    "69" :  { championId: 69, championName: 'Cassiopeia', title: 'The Serpent\'s Embrace'},
    "31" :  { championId: 31, championName: 'Cho\'Gath', title: 'The Terror of the Void'},
    "42" :  { championId: 42, championName: 'Corki', title: 'The Daring Bombardier'},
    "122" :  { championId: 122, championName: 'Darius', title: 'The Hand of Noxus'},
    "131" :  { championId: 131, championName: 'Diana', title: 'Scorn of the Moon'},
    "36" :  { championId: 36, championName: 'Dr. Mundo', title: 'The Madman of Zaun'},
    "119" :  { championId: 119, championName: 'Draven', title: 'The Glorious Executioner'},
    "245" :  { championId: 245, championName: 'Ekko', title: 'The Boy Who Shattered Time'},
    "60" :  { championId: 60, championName: 'Elise', title: 'The Spider Queen'},
    "28" :  { championId: 28, championName: 'Evelynn', title: 'The Widowmaker'},
    "81" :  { championId: 81, championName: 'Ezreal', title: 'The Prodigal Explorer'},
    "9" :  { championId: 9, championName: 'Fiddlesticks', title: 'The Harbinger of Doom'},
    "114" :  { championId: 114, championName: 'Fiora', title: 'The Grand Duelist'},
    "105" :  { championId: 105, championName: 'Fizz', title: 'The Tidal Trickster'},
    "3" :  { championId: 3, championName: 'Galio', title: 'The Sentinel\'s Sorrow'},
    "41" :  { championId: 41, championName: 'Gangplank', title: 'The Saltwater Scourge'},
    "86" :  { championId: 86, championName: 'Garen', title: 'The Might of Demacia'},
    "150" :  { championId: 150, championName: 'Gnar', title: 'The Missing Link'},
    "79" :  { championId: 79, championName: 'Gragas', title: 'The Rabble Rouser'},
    "104" :  { championId: 104, championName: 'Graves', title: 'The Outlaw'},
    "120" :  { championId: 120, championName: 'Hecarim', title: 'The Shadow of War'},
    "74" :  { championId: 74, championName: 'Heimerdinger', title: 'The Revered Inventor'},
    "420" :  { championId: 420, championName: 'Illaoi', title: 'The Kraken Priestess'},
    "39" :  { championId: 39, championName: 'Irelia', title: 'The Will of the Blades'},
    "40" :  { championId: 40, championName: 'Janna', title: 'the Storm\'s Fury'},
    "59" :  { championId: 59, championName: 'Jarvan IV', title: 'The Exemplar of Demacia'},
    "24" :  { championId: 24, championName: 'Jax', title: 'Grandmaster at Arms'},
    "126" :  { championId: 126, championName: 'Jayce', title: 'The Defender of Tomorrow'},
    "202" :  { championId: 202, championName: 'Jhin', title: 'The Virtuoso'},
    "222" :  { championId: 222, championName: 'Jinx', title: 'The Loose Cannon'},
    "429" :  { championId: 429, championName: 'Kalista', title: 'The Spear of Vengeance'},
    "43" :  { championId: 43, championName: 'Karma', title: 'The Enlightened One'},
    "30" :  { championId: 30, championName: 'Karthus', title: 'The Deathsinger'},
    "38" :  { championId: 38, championName: 'Kassadin', title: 'The Void Walker'},
    "55" :  { championId: 55, championName: 'Katarina', title: 'The Sinister Blade'},
    "10" :  { championId: 10, championName: 'Kayle', title: 'The Judicator'},
    "85" :  { championId: 85, championName: 'Kennen', title: 'The Heart of the Tempest'},
    "121" :  { championId: 121, championName: 'Kha\'Zix', title: 'The Voidreaver'},
    "203" :  { championId: 203, championName: 'Kindred', title: 'The Eternal Hunters'},
    "96" :  { championId: 96, championName: 'Kog\'Maw', title: 'The Mouth of the Abyss'},
    "7" :  { championId: 7, championName: 'LeBlanc', title: 'The Deceiver'},
    "64" :  { championId: 64, championName: 'Lee Sin', title: 'The Blind Monk'},
    "89" :  { championId: 89, championName: 'Leona', title: 'The Radiant Dawn'},
    "127" :  { championId: 127, championName: 'Lissandra', title: 'The Ice Witch'},
    "236" :  { championId: 236, championName: 'Lucian', title: 'The Purifier'},
    "117" :  { championId: 117, championName: 'Lulu', title: 'the Fae Sorceress'},
    "99" :  { championId: 99, championName: 'Lux', title: 'The Lady of Luminosity'},
    "54" :  { championId: 54, championName: 'Malphite', title: 'Shard of the Monolith'},
    "90" :  { championId: 90, championName: 'Malzahar', title: 'The Prophet of the Void'},
    "57" :  { championId: 57, championName: 'Maokai', title: 'The Twisted Treant'},
    "11" :  { championId: 11, championName: 'Master Yi', title: 'The Wuju Bladesman'},
    "21" :  { championId: 21, championName: 'Miss Fortune', title: 'The Bounty Hunter'},
    "82" :  { championId: 82, championName: 'Mordekaiser', title: 'the Iron Revenant'},
    "25" :  { championId: 25, championName: 'Morgana', title: 'Fallen Angel'},
    "267" :  { championId: 267, championName: 'Nami', title: 'The Tidecaller'},
    "75" :  { championId: 75, championName: 'Nasus', title: 'The Curator of the Sands'},
    "111" :  { championId: 111, championName: 'Nautilus', title: 'The Titan of the Depths'},
    "76" :  { championId: 76, championName: 'Nidalee', title: 'The Bestial Huntress'},
    "56" :  { championId: 56, championName: 'Nocturne', title: 'The Eternal Nightmare'},
    "20" :  { championId: 20, championName: 'Nunu', title: 'The Yeti Rider'},
    "2" :  { championId: 2, championName: 'Olaf', title: 'The Berserker'},
    "61" :  { championId: 61, championName: 'Orianna', title: 'The Lady of Clockwork'},
    "80" :  { championId: 80, championName: 'Pantheon', title: 'The Artisan of War'},
    "78" :  { championId: 78, championName: 'Poppy', title: 'Keeper of the Hammer'},
    "133" :  { championId: 133, championName: 'Quinn', title: 'Demacia\'s Wings'},
    "33" :  { championId: 33, championName: 'Rammus', title: 'the Armordillo'},
    "421" :  { championId: 421, championName: 'Rek\'Sai', title: 'The Void Burrower'},
    "58" :  { championId: 58, championName: 'Renekton', title: 'The Butcher of the Sands'},
    "107" :  { championId: 107, championName: 'Rengar', title: 'The Pridestalker'},
    "92" :  { championId: 92, championName: 'Riven', title: 'The Exile'},
    "68" :  { championId: 68, championName: 'Rumble', title: 'The Mechanized Menace'},
    "13" :  { championId: 13, championName: 'Ryze', title: 'The Rogue Mage'},
    "113" :  { championId: 113, championName: 'Sejuani', title: 'The Winter\'s Wrath'},
    "35" :  { championId: 35, championName: 'Shaco', title: 'the Demon Jester'},
    "98" :  { championId: 98, championName: 'Shen', title: 'The Eye of Twilight'},
    "102" :  { championId: 102, championName: 'Shyvana', title: 'The Half-Dragon'},
    "27" :  { championId: 27, championName: 'Singed', title: 'The Mad Chemist'},
    "14" :  { championId: 14, championName: 'Sion', title: 'The Undead Juggernaut'},
    "15" :  { championId: 15, championName: 'Sivir', title: 'The Battle Mistress'},
    "72" :  { championId: 72, championName: 'Skarner', title: 'The Crystal Vanguard'},
    "37" :  { championId: 37, championName: 'Sona', title: 'Maven of the Strings'},
    "16" :  { championId: 16, championName: 'Soraka', title: 'The Starchild'},
    "50" :  { championId: 50, championName: 'Swain', title: 'The Master Tactician'},
    "134" :  { championId: 134, championName: 'Syndra', title: 'The Dark Sovereign'},
    "223" :  { championId: 223, championName: 'Tahm Kench', title: 'The River King'},
    "163" :  { championId: 163, championName: 'Taliyah', title: 'The Stoneweaver'},
    "91" :  { championId: 91, championName: 'Talon', title: 'The Blade\'s Shadow'},
    "44" :  { championId: 44, championName: 'Taric', title: 'The Shield of Valoran'},
    "17" :  { championId: 17, championName: 'Teemo', title: 'The Swift Scout'},
    "412" :  { championId: 412, championName: 'Thresh', title: 'The Chain Warden'},
    "18" :  { championId: 18, championName: 'Tristana', title: 'The Yordle Gunner'},
    "48" :  { championId: 48, championName: 'Trundle', title: 'The Troll King'},
    "23" :  { championId: 23, championName: 'Tryndamere', title: 'The Barbarian King'},
    "4" :  { championId: 4, championName: 'Twisted Fate', title: 'The Card Master'},
    "29" :  { championId: 29, championName: 'Twitch', title: 'the Plague Rat'},
    "77" :  { championId: 77, championName: 'Udyr', title: 'The Spirit Walker'},
    "6" :  { championId: 6, championName: 'Urgot', title: 'The Headsman\'s Pride'},
    "110" :  { championId: 110, championName: 'Varus', title: 'The Arrow of Retribution'},
    "67" :  { championId: 67, championName: 'Vayne', title: 'The Night Hunter'},
    "45" :  { championId: 45, championName: 'Veigar', title: 'The Tiny Master of Evil'},
    "161" :  { championId: 161, championName: 'Vel\'Koz', title: 'The Eye of the Void'},
    "254" :  { championId: 254, championName: 'Vi', title: 'The Piltover Enforcer'},
    "112" :  { championId: 112, championName: 'Viktor', title: 'The Machine Herald'},
    "8" :  { championId: 8, championName: 'Vladimir', title: 'The Crimson Reaper'},
    "106" :  { championId: 106, championName: 'Volibear', title: 'the Thunder\'s Roar'},
    "19" :  { championId: 19, championName: 'Warwick', title: 'The Blood Hunter'},
    "62" :  { championId: 62, championName: 'Wukong', title: 'The Monkey King'},
    "101" :  { championId: 101, championName: 'Xerath', title: 'The Magus Ascendant'},
    "5" :  { championId: 5, championName: 'Xin Zhao', title: 'The Seneschal of Demacia'},
    "157" :  { championId: 157, championName: 'Yasuo', title: 'The Unforgiven'},
    "83" :  { championId: 83, championName: 'Yorick', title: 'The Gravedigger'},
    "154" :  { championId: 154, championName: 'Zac', title: 'The Secret Weapon'},
    "238" :  { championId: 238, championName: 'Zed', title: 'the Master of Shadows'},
    "115" :  { championId: 115, championName: 'Ziggs', title: 'The Hexplosives Expert'},
    "26" :  { championId: 26, championName: 'Zilean', title: 'The Chronokeeper'},
    "143" :  { championId: 143, championName: 'Zyra', title: 'Rise of the Thorns'},
    };

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// DB connection
mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

/**
 * Socket.io stuff.
 */
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

app.post('/searchForChampion', function(req, res, next) {
  var championId = req.body.championId;

  console.log('CONSOLE ID ' + championId);
  console.log('Summoner? ' + Summoner.championsS6);

  /*Summoner.findOne({ championId: championId }, function(err, champion) {
    if (err) return next(err);

    if (!champion) {
      return res.status(404).send({ message: 'Character not found.' });
    }
    else{
      res.status(200).send({ message: 'Character found!' });
    }

    //res.send(character);
  });*/
});

/**
 * POST /searchSummoner
 * Searches for summoner in the Riot API
 * and stores creep score averages in mongoDB
 */
app.post('/searchSummoner', function(req, res, next) {

  //HTML encoding summoner name
  var summonerName = encodeURIComponent(req.body.summonerName),
      region = req.body.region,
      summonerRequest;

  //Riot API Request
  //TODO move API key and urls to global variables and replace hardcoded region with dinamic region
  summonerRequest = 'https://na.api.pvp.net/api/lol/' + region + '/v1.4/summoner/by-name/' + summonerName + '?api_key=159a2c64-74bc-4421-bc98-3278e73922de';
  async.waterfall([
    function(callback) {
      request.get(summonerRequest, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          
          summonerId = body.split('"id":');
          summonerId = summonerId[1].split(',')[0];

          ApiSummonerName = body.split('"name":"');
          ApiSummonerName = ApiSummonerName[1].split('",')[0];

          //looking for summoner in DB
          Summoner.findOne({ summonerId: summonerId }, function(err, summoner) {
            if(summoner){
              var summonerData = {
                summoner: summoner,
                summonerId: summonerId
              }
              callback(error, summonerData);
            }
            else{
              var summonerData = summonerId;
              callback(error, summonerId);
            }
          })
        }

        else{
          //if summoner request fails
          return res.status(400).send({ message: 'Whoa, there was an error. Pleas try again.' });
        }

      });
    },
    function(summonerData){
      var gamesRequest,
          summonerId,
          summonerExists = false;

      if(summonerData.summonerId){
        summonerId = summonerData.summonerId;
        summonerExists = true;
      }

      else{
        summonerId = summonerData;
      }

      //TODO move API key and urls to global variables and replace hardcoded region with dinamic region
      gamesRequest = 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/' + summonerId + '/recent?api_key=159a2c64-74bc-4421-bc98-3278e73922de';

      request.get(gamesRequest, function (error, response, body) {
        if (!error && response.statusCode == 200) {

          var gamesData = JSON.parse(body),
              gamesResponseArray = gamesData.games,
              gamesArray = [],
              newSummonerGamesArray = [],
              currentLastGameId,
              summoner;

              //filtering games
              gamesArray = filterGames(gamesArray, gamesResponseArray);

              console.log(gamesArray);
          
          //if summoner exists in DB
          if(summonerExists && gamesArray.length){

            console.log('updating existing summoner:');
            summoner = summonerData.summoner;
            currentLastGameId = gamesArray[0].gameId;

            newSummonerGamesArray = getNewGames(gamesArray, summoner, newSummonerGamesArray);

            //Do magic with filtered new games
            if(newSummonerGamesArray.length){
              console.log('FILTERED NEW GAMES');
              console.log(newSummonerGamesArray);
              console.log('currentLastGameId: ' + currentLastGameId);
              
              summoner = createCsAverages(summoner, summonerExists, newSummonerGamesArray);

              //updating last game ID
              summoner.summonerLastGameId = currentLastGameId;

              summoner.save(function(err) {
                if (err) return next(err);
                res.send({ message: ApiSummonerName + ' has been updated successfully!' });
              });
            }

            else{
              return res.status(200).send({ message: 'No new games', summoner: summoner });
            }

          }
          //if summoner doesn't exist in DB
          else if(!summonerExists && gamesArray.length){
            console.log('creating new summoner');
            console.log(gamesArray[0].gameId);

              summoner = new Summoner({
              summonerId: summonerId,
              summonerName: ApiSummonerName,
              summonerRegion: region,
              summonerLastGameId: gamesArray[0].gameId
            });

            summoner = createCsAverages(summoner, summonerExists, gamesArray);

            summoner.save(function(err) {
              if (err) return next(err);
              res.send({ message: ApiSummonerName + ' has been added successfully!', summoner: summoner });
            });
          }
        }

        else{
          return res.status(400).send({ message: 'No Data Was Found' });
        }

      });
    }
  ]);
});

function createCsAverages(summoner, summonerExists, gamesArray){

  var championsArray = [],
      remainingGamesArray = [],
      currentChampion = createChampionModel(),
      currentId,
      championExists = false,
      dbChampion;

  do {
    for(var i = 0; i < gamesArray.length; i ++){

      if(i == 0){

        if(championsData[gamesArray[i].championId]){

          currentChampion.championName = championsData[gamesArray[i].championId].championName;
        }

        //TODO add an else if champ doesn't exist---------------------------------------

        currentChampion.championId = gamesArray[i].championId;

        //create new champion and add stats
        if(gamesArray[i].subType == 'NORMAL'){
          //TODO call getPlayerPosition() and pass in champId + teamId
          currentChampion = calculateNormalCsAverages(currentChampion, gamesArray[i]);
        }
        else if(gamesArray[i].subType == 'RANKED_SOLO_5x5' || gamesArray[i].subType == 'RANKED_TEAM_5x5' || gamesArray[i].subType == 'RANKED_PREMADE_5x5'){
          currentChampion = calculateRankedCsAverages(currentChampion, gamesArray[i]);
        }
        
        championsArray.push(currentChampion);

      }
      else{
        for(var x = 0; x < championsArray.length; x ++){
          currentId = gamesArray[i].championId;

          //add remaining games to previously created champion
          if(currentId == championsArray[x].championId){
            //call averageCreatorFunction
            if(gamesArray[i].subType == 'NORMAL'){
              currentChampion = calculateNormalCsAverages(currentChampion, gamesArray[i]);
            }
            else if(gamesArray[i].subType == 'RANKED_SOLO_5x5' || gamesArray[i].subType == 'RANKED_TEAM_5x5' || gamesArray[i].subType == 'RANKED_PREMADE_5x5'){
              currentChampion = calculateRankedCsAverages(currentChampion, gamesArray[i]);
            }
          }
        }
      }
    }

    //deleting games already added to cs averages
    remainingGamesArray = addRemainingGames(championsArray, gamesArray, remainingGamesArray);

    gamesArray = remainingGamesArray;
    remainingGamesArray = [];

    //check if champion exists (passing in summoner exists flag), if it exists pull it out and add averages, if not just add him
    if(summonerExists){
      console.log('UPDATING');
      //console.log(championsArray[0]);
      console.log(summoner);
      //summoner.summonerName = 'Hodor';
      console.log('RECORD: ' );
      console.log(summoner.championsS6[0]);
      //summoner.championsS6[0].championName = 'Ive been updated!';

      for(var i = 0; i < summoner.championsS6.length; i ++){
        //if champion alredy in db, pull it out and add new averages
        if(summoner.championsS6[i].championId == championsArray[0].championId){

          championExists = true;
          dbChampion = summoner.championsS6[i];

          updateChampion(dbChampion, championsArray);

        }
      }

      //if champion doesn't exist in db, create new champion record and store it
      if(!championExists){
        summoner.championsS6.push(championsArray[0]);
      }
      
    }
    else{
      console.log('CREATING');
      summoner.championsS6.push(championsArray[0]);
    }

    //TODO mov into it's own function
    championsArray = [];
    
    currentChampion = resetCurrentChampion(currentChampion);

    championExists = false;

  } while(gamesArray.length);

  return summoner;
}

//TODO call match api and pull accurate player position and add player roles for adc position
function calculateNormalCsAverages(currentChampion, currentGame){
  console.log('calculating AVERAGE');

  if(currentGame.stats.playerPosition == '1'){
    console.log('TOP LANE');
    currentChampion.topNormalGames += 1;

    if(currentGame.stats.minionsKilled){
      currentChampion.topNormalMinionsKilled += currentGame.stats.minionsKilled;
    }
    if(currentGame.stats.neutralMinionsKilled){
      currentChampion.topNormalNeutralMinionsKilled += currentGame.stats.neutralMinionsKilled;
    }
    if(currentGame.stats.neutralMinionsKilledYourJungle){
      currentChampion.topNormalNeutralMinionsKilledYourJungle += currentGame.stats.neutralMinionsKilledYourJungle;
    }
    if(currentGame.stats.neutralMinionsKilledEnemyJungle){
      currentChampion.topNormalNeutralMinionsKilledEnemyJungle += currentGame.stats.neutralMinionsKilledEnemyJungle;
    }
    if(currentGame.stats.timePlayed){
      currentChampion.topNormalTimePlayed += currentGame.stats.timePlayed;
    }
  }
  else if(currentGame.stats.playerPosition == '2'){
    console.log('MID LANE');
    currentChampion.midNormalGames += 1;
    if(currentGame.stats.minionsKilled){
      currentChampion.midNormalMinionsKilled += currentGame.stats.minionsKilled;
    }
    if(currentGame.stats.neutralMinionsKilled){
      currentChampion.midNormalNeutralMinionsKilled += currentGame.stats.neutralMinionsKilled;
    }
    if(currentGame.stats.neutralMinionsKilledYourJungle){
      currentChampion.midNormalNeutralMinionsKilledYourJungle += currentGame.stats.neutralMinionsKilledYourJungle; 
    }
    if(currentGame.stats.neutralMinionsKilledEnemyJungle){
      currentChampion.midNormalNeutralMinionsKilledEnemyJungle += currentGame.stats.neutralMinionsKilledEnemyJungle;
    }
    if(currentGame.stats.timePlayed){
      currentChampion.midNormalTimePlayed += currentGame.stats.timePlayed;
    }
  }
  else if(currentGame.stats.playerPosition == '3'){
    console.log('JUNGLE');
    currentChampion.jungleNormalGames += 1;
    if(currentGame.stats.minionsKilled){
      currentChampion.jungleNormalMinionsKilled += currentGame.stats.minionsKilled;
    }
    if(currentGame.stats.neutralMinionsKilled){
      currentChampion.jungleNormalNeutralMinionsKilled += currentGame.stats.neutralMinionsKilled;
    }
    if(currentGame.stats.neutralMinionsKilledYourJungle){
      currentChampion.jungleNormalNeutralMinionsKilledYourJungle += currentGame.stats.neutralMinionsKilledYourJungle;
    }
    if(currentGame.stats.neutralMinionsKilledEnemyJungle){
      currentChampion.jungleNormalNeutralMinionsKilledEnemyJungle += currentGame.stats.neutralMinionsKilledEnemyJungle;
    }
    if(currentGame.stats.timePlayed){
      currentChampion.jungleNormalTimePlayed += currentGame.stats.timePlayed;
    }
  }
  else if(currentGame.stats.playerRole == '2' && currentGame.stats.playerPosition == '4'){
    console.log('SUPPORT');
    currentChampion.supportNormalGames += 1;
    if(currentGame.stats.minionsKilled){
      currentChampion.supportNormalMinionsKilled += currentGame.stats.minionsKilled;
    }
    if(currentGame.stats.neutralMinionsKilled){
      currentChampion.supportNormalNeutralMinionsKilled += currentGame.stats.neutralMinionsKilled;
    }
    if(currentGame.stats.neutralMinionsKilledYourJungle){
      currentChampion.supportNormalNeutralMinionsKilledYourJungle += currentGame.stats.neutralMinionsKilledYourJungle;
    }
    if(currentGame.stats.neutralMinionsKilledEnemyJungle){
      currentChampion.supportNormalNeutralMinionsKilledEnemyJungle += currentGame.stats.neutralMinionsKilledEnemyJungle;
    }
    if(currentGame.stats.timePlayed){
      currentChampion.supportNormalTimePlayed += currentGame.stats.timePlayed;
    }
  }
  else if((currentGame.stats.playerRole == '1' || currentGame.stats.playerRole == '3' || currentGame.stats.playerRole == '4') && currentGame.stats.playerPosition == '4'){
    console.log('MARKSMAN');
    currentChampion.marksmanNormalGames += 1;
    if(currentGame.stats.minionsKilled){
      currentChampion.marksmanNormalMinionsKilled += currentGame.stats.minionsKilled;
    }
    if(currentGame.stats.neutralMinionsKilled){
      currentChampion.marksmanNormalNeutralMinionsKilled += currentGame.stats.neutralMinionsKilled;
    }
    if(currentGame.stats.neutralMinionsKilledYourJungle){
      currentChampion.marksmanNormalNeutralMinionsKilledYourJungle += currentGame.stats.neutralMinionsKilledYourJungle;
    }
    if(currentGame.stats.neutralMinionsKilledEnemyJungle){
      currentChampion.marksmanNormalNeutralMinionsKilledEnemyJungle += currentGame.stats.neutralMinionsKilledEnemyJungle;
    }
    if(currentGame.stats.timePlayed){
      currentChampion.marksmanNormalTimePlayed += currentGame.stats.timePlayed;
    }
  }
  
  return currentChampion;
}
//TODO call match api and pull accurate player position and add player roles for adc position
function calculateRankedCsAverages(currentChampion, currentGame){
  console.log('calculating AVERAGE');
  console.log(currentGame.gameId);

  if(currentGame.stats.playerPosition == '1'){
    console.log('TOP LANE');
    currentChampion.topRankedGames += 1;
    if(currentGame.stats.minionsKilled){
      currentChampion.topRankedMinionsKilled += currentGame.stats.minionsKilled;
    }
    if(currentGame.stats.neutralMinionsKilled){
      currentChampion.topRankedNeutralMinionsKilled += currentGame.stats.neutralMinionsKilled;
    }
    if(currentGame.stats.neutralMinionsKilledYourJungle){
      currentChampion.topRankedNeutralMinionsKilledYourJungle += currentGame.stats.neutralMinionsKilledYourJungle;
    }
    if(currentGame.stats.neutralMinionsKilledEnemyJungle){
      currentChampion.topRankedNeutralMinionsKilledEnemyJungle += currentGame.stats.neutralMinionsKilledEnemyJungle;
    }
    if(currentGame.stats.timePlayed){
      currentChampion.topRankedTimePlayed += currentGame.stats.timePlayed;
    }
  }
  else if(currentGame.stats.playerPosition == '2'){
    console.log('MID LANE');
    currentChampion.midRankedGames += 1;
    if(currentGame.stats.minionsKilled){
      currentChampion.midRankedMinionsKilled += currentGame.stats.minionsKilled;
    }
    if(currentGame.stats.neutralMinionsKilled){
      currentChampion.midRankedNeutralMinionsKilled += currentGame.stats.neutralMinionsKilled;
    }
    if(currentGame.stats.neutralMinionsKilledYourJungle){
      currentChampion.midRankedNeutralMinionsKilledYourJungle += currentGame.stats.neutralMinionsKilledYourJungle;
    }
    if(currentGame.stats.neutralMinionsKilledEnemyJungle){
      currentChampion.midRankedNeutralMinionsKilledEnemyJungle += currentGame.stats.neutralMinionsKilledEnemyJungle;
    }
    if(currentGame.stats.timePlayed){
      currentChampion.midRankedTimePlayed += currentGame.stats.timePlayed;
    }
  }
  else if(currentGame.stats.playerPosition == '3'){
    console.log('JUNGLE');
    currentChampion.jungleRankedGames += 1;
    if(currentGame.stats.minionsKilled){
      currentChampion.jungleRankedMinionsKilled += currentGame.stats.minionsKilled;
    }
    if(currentGame.stats.neutralMinionsKilled){
      currentChampion.jungleRankedNeutralMinionsKilled += currentGame.stats.neutralMinionsKilled;
    }
    if(currentGame.stats.neutralMinionsKilledYourJungle){
      currentChampion.jungleRankedNeutralMinionsKilledYourJungle += currentGame.stats.neutralMinionsKilledYourJungle;
    }
    if(currentGame.stats.neutralMinionsKilledEnemyJungle){
      currentChampion.jungleRankedNeutralMinionsKilledEnemyJungle += currentGame.stats.neutralMinionsKilledEnemyJungle;
    }
    if(currentGame.stats.timePlayed){
      currentChampion.jungleRankedTimePlayed += currentGame.stats.timePlayed;
    }
  }
  else if(currentGame.stats.playerRole == '2' && currentGame.stats.playerPosition == '4'){
    console.log('SUPPORT');
    currentChampion.supportRankedGames += 1;
    if(currentGame.stats.minionsKilled){
      currentChampion.supportRankedMinionsKilled += currentGame.stats.minionsKilled;
    }
    if(currentGame.stats.neutralMinionsKilled){
      currentChampion.supportRankedNeutralMinionsKilled += currentGame.stats.neutralMinionsKilled;
    }
    if(currentGame.stats.neutralMinionsKilledYourJungle){
      currentChampion.supportRankedNeutralMinionsKilledYourJungle += currentGame.stats.neutralMinionsKilledYourJungle;
    }
    if(currentGame.stats.neutralMinionsKilledEnemyJungle){
      currentChampion.supportRankedNeutralMinionsKilledEnemyJungle += currentGame.stats.neutralMinionsKilledEnemyJungle;
    }
    if(currentGame.stats.timePlayed){
      currentChampion.supportRankedTimePlayed += currentGame.stats.timePlayed;
    }
  }
  else if((currentGame.stats.playerRole == '1' || currentGame.stats.playerRole == '3' || currentGame.stats.playerRole == '4') && currentGame.stats.playerPosition == '4'){
    console.log('MARKSMAN');
    currentChampion.marksmanRankedGames += 1;
    if(currentGame.stats.minionsKilled){
      currentChampion.marksmanRankedMinionsKilled += currentGame.stats.minionsKilled;
    }
    if(currentGame.stats.neutralMinionsKilled){
      currentChampion.marksmanRankedNeutralMinionsKilled += currentGame.stats.neutralMinionsKilled;
    }
    if(currentGame.stats.neutralMinionsKilledYourJungle){
      currentChampion.marksmanRankedNeutralMinionsKilledYourJungle += currentGame.stats.neutralMinionsKilledYourJungle;
    }
    if(currentGame.stats.neutralMinionsKilledEnemyJungle){
      currentChampion.marksmanRankedNeutralMinionsKilledEnemyJungle += currentGame.stats.neutralMinionsKilledEnemyJungle;
    }
    if(currentGame.stats.timePlayed){
      currentChampion.marksmanRankedTimePlayed += currentGame.stats.timePlayed;
    }
  }
  
  return currentChampion;
}

function addRemainingGames(championsArray, gamesArray, remainingGamesArray){
  //adding remaining games to array
  for(var y = 0; y < championsArray.length; y ++){
    for(var z = 0; z < gamesArray.length; z ++){
      if(championsArray[y].championId != gamesArray[z].championId){
        remainingGamesArray.push(gamesArray[z]);
      }
    }
  }

  return remainingGamesArray;
}

function createChampionModel(){
  var currentChampion = {
        championName: '',
        championId: 0,

        topNormalGames: 0,
        topNormalMinionsKilled: 0,
        topNormalNeutralMinionsKilled: 0,
        topNormalNeutralMinionsKilledYourJungle: 0,
        topNormalNeutralMinionsKilledEnemyJungle: 0,
        topNormalTimePlayed: 0,

        midNormalGames: 0,
        midNormalMinionsKilled: 0,
        midNormalNeutralMinionsKilled: 0,
        midNormalNeutralMinionsKilledYourJungle: 0,
        midNormalNeutralMinionsKilledEnemyJungle: 0,
        midNormalTimePlayed: 0,

        jungleNormalGames: 0,
        jungleNormalMinionsKilled: 0,
        jungleNormalNeutralMinionsKilled: 0,
        jungleNormalNeutralMinionsKilledYourJungle: 0,
        jungleNormalNeutralMinionsKilledEnemyJungle: 0,
        jungleNormalTimePlayed: 0,

        marksmanNormalGames: 0,
        marksmanNormalMinionsKilled: 0,
        marksmanNormalNeutralMinionsKilled: 0,
        marksmanNormalNeutralMinionsKilledYourJungle: 0,
        marksmanNormalNeutralMinionsKilledEnemyJungle: 0,
        marksmanNormalTimePlayed: 0,

        supportNormalGames: 0,
        supportNormalMinionsKilled: 0,
        supportNormalNeutralMinionsKilled: 0,
        supportNormalNeutralMinionsKilledYourJungle: 0,
        supportNormalNeutralMinionsKilledEnemyJungle: 0,
        supportNormalTimePlayed: 0,

        topRankedGames: 0,
        topRankedMinionsKilled: 0,
        topRankedNeutralMinionsKilled: 0,
        topRankedNeutralMinionsKilledYourJungle: 0,
        topRankedNeutralMinionsKilledEnemyJungle: 0,
        topRankedTimePlayed: 0,

        midRankedGames: 0,
        midRankedMinionsKilled: 0,
        midRankedNeutralMinionsKilled: 0,
        midRankedNeutralMinionsKilledYourJungle: 0,
        midRankedNeutralMinionsKilledEnemyJungle: 0,
        midRankedTimePlayed: 0,

        jungleRankedGames: 0,
        jungleRankedMinionsKilled: 0,
        jungleRankedNeutralMinionsKilled: 0,
        jungleRankedNeutralMinionsKilledYourJungle: 0,
        jungleRankedNeutralMinionsKilledEnemyJungle: 0,
        jungleRankedTimePlayed: 0,

        marksmanRankedGames: 0,
        marksmanRankedMinionsKilled: 0,
        marksmanRankedNeutralMinionsKilled: 0,
        marksmanRankedNeutralMinionsKilledYourJungle: 0,
        marksmanRankedNeutralMinionsKilledEnemyJungle: 0,
        marksmanRankedTimePlayed: 0,

        supportRankedGames: 0,
        supportRankedMinionsKilled: 0,
        supportRankedNeutralMinionsKilled: 0,
        supportRankedNeutralMinionsKilledYourJungle: 0,
        supportRankedNeutralMinionsKilledEnemyJungle: 0,
        supportRankedTimePlayed: 0
      };

  return currentChampion;
}

function updateChampion(dbChampion, championsArray){

  dbChampion.topNormalGames += championsArray[0].topNormalGames;
  dbChampion.topNormalMinionsKilled += championsArray[0].topNormalMinionsKilled;
  dbChampion.topNormalNeutralMinionsKilled += championsArray[0].topNormalNeutralMinionsKilled;
  dbChampion.topNormalNeutralMinionsKilledYourJungle += championsArray[0].topNormalNeutralMinionsKilledYourJungle;
  dbChampion.topNormalNeutralMinionsKilledEnemyJungle += championsArray[0].topNormalNeutralMinionsKilledEnemyJungle;
  dbChampion.topNormalTimePlayed += championsArray[0].topNormalTimePlayed;

  dbChampion.midNormalGames += championsArray[0].midNormalGames;
  dbChampion.midNormalMinionsKilled += championsArray[0].midNormalMinionsKilled;
  dbChampion.midNormalNeutralMinionsKilled += championsArray[0].midNormalNeutralMinionsKilled;
  dbChampion.midNormalNeutralMinionsKilledYourJungle += championsArray[0].midNormalNeutralMinionsKilledYourJungle;
  dbChampion.midNormalNeutralMinionsKilledEnemyJungle += championsArray[0].midNormalNeutralMinionsKilledEnemyJungle;
  dbChampion.midNormalTimePlayed += championsArray[0].midNormalTimePlayed;

  dbChampion.jungleNormalGames += championsArray[0].jungleNormalGames;
  dbChampion.jungleNormalMinionsKilled += championsArray[0].jungleNormalMinionsKilled;
  dbChampion.jungleNormalNeutralMinionsKilled += championsArray[0].jungleNormalNeutralMinionsKilled;
  dbChampion.jungleNormalNeutralMinionsKilledYourJungle += championsArray[0].jungleNormalNeutralMinionsKilledYourJungle;
  dbChampion.jungleNormalNeutralMinionsKilledEnemyJungle += championsArray[0].jungleNormalNeutralMinionsKilledEnemyJungle;
  dbChampion.jungleNormalTimePlayed += championsArray[0].jungleNormalTimePlayed;

  dbChampion.marksmanNormalGames += championsArray[0].marksmanNormalGames;
  dbChampion.marksmanNormalMinionsKilled += championsArray[0].marksmanNormalMinionsKilled;
  dbChampion.marksmanNormalNeutralMinionsKilled += championsArray[0].marksmanNormalNeutralMinionsKilled;
  dbChampion.marksmanNormalNeutralMinionsKilledYourJungle += championsArray[0].marksmanNormalNeutralMinionsKilledYourJungle;
  dbChampion.marksmanNormalNeutralMinionsKilledEnemyJungle += championsArray[0].marksmanNormalNeutralMinionsKilledEnemyJungle;
  dbChampion.marksmanNormalTimePlayed += championsArray[0].marksmanNormalTimePlayed;

  dbChampion.supportNormalGames += championsArray[0].supportNormalGames;
  dbChampion.supportNormalMinionsKilled += championsArray[0].supportNormalMinionsKilled;
  dbChampion.supportNormalNeutralMinionsKilled += championsArray[0].supportNormalNeutralMinionsKilled;
  dbChampion.supportNormalNeutralMinionsKilledYourJungle += championsArray[0].supportNormalNeutralMinionsKilledYourJungle;
  dbChampion.supportNormalNeutralMinionsKilledEnemyJungle += championsArray[0].supportNormalNeutralMinionsKilledEnemyJungle;
  dbChampion.supportNormalTimePlayed += championsArray[0].supportNormalTimePlayed;

  dbChampion.topRankedGames += championsArray[0].topRankedGames;
  dbChampion.topRankedMinionsKilled += championsArray[0].topRankedMinionsKilled;
  dbChampion.topRankedNeutralMinionsKilled += championsArray[0].topRankedNeutralMinionsKilled;
  dbChampion.topRankedNeutralMinionsKilledYourJungle += championsArray[0].topRankedNeutralMinionsKilledYourJungle;
  dbChampion.topRankedNeutralMinionsKilledEnemyJungle += championsArray[0].topRankedNeutralMinionsKilledEnemyJungle;
  dbChampion.topRankedTimePlayed += championsArray[0].topRankedTimePlayed;

  dbChampion.midRankedGames += championsArray[0].midRankedGames;
  dbChampion.midRankedMinionsKilled += championsArray[0].midRankedMinionsKilled;
  dbChampion.midRankedNeutralMinionsKilled += championsArray[0].midRankedNeutralMinionsKilled;
  dbChampion.midRankedNeutralMinionsKilledYourJungle += championsArray[0].midRankedNeutralMinionsKilledYourJungle
  dbChampion.midRankedNeutralMinionsKilledEnemyJungle += championsArray[0].midRankedNeutralMinionsKilledEnemyJungle
  dbChampion.midRankedTimePlayed += championsArray[0].midRankedTimePlayed;

  dbChampion.jungleRankedGames += championsArray[0].jungleRankedGames;
  dbChampion.jungleRankedMinionsKilled += championsArray[0].jungleRankedMinionsKilled;
  dbChampion.jungleRankedNeutralMinionsKilled += championsArray[0].jungleRankedNeutralMinionsKilled;
  dbChampion.jungleRankedNeutralMinionsKilledYourJungle += championsArray[0].jungleRankedNeutralMinionsKilledYourJungle;
  dbChampion.jungleRankedNeutralMinionsKilledEnemyJungle += championsArray[0].jungleRankedNeutralMinionsKilledEnemyJungle;
  dbChampion.jungleRankedTimePlayed += championsArray[0].jungleRankedTimePlayed;

  dbChampion.marksmanRankedGames += championsArray[0].marksmanRankedGames;
  dbChampion.marksmanRankedMinionsKilled += championsArray[0].marksmanRankedMinionsKilled;
  dbChampion.marksmanRankedNeutralMinionsKilled += championsArray[0].marksmanRankedNeutralMinionsKilled;
  dbChampion.marksmanRankedNeutralMinionsKilledYourJungle += championsArray[0].marksmanRankedNeutralMinionsKilledYourJungle;
  dbChampion.marksmanRankedNeutralMinionsKilledEnemyJungle += championsArray[0].marksmanRankedNeutralMinionsKilledEnemyJungle;
  dbChampion.marksmanRankedTimePlayed += championsArray[0].marksmanRankedTimePlayed;

  dbChampion.supportRankedGames += championsArray[0].supportRankedGames;
  dbChampion.supportRankedMinionsKilled += championsArray[0].supportRankedMinionsKilled;
  dbChampion.supportRankedNeutralMinionsKilled += championsArray[0].supportRankedNeutralMinionsKilled;
  dbChampion.supportRankedNeutralMinionsKilledYourJungle += championsArray[0].supportRankedNeutralMinionsKilledYourJungle;
  dbChampion.supportRankedNeutralMinionsKilledEnemyJungle += championsArray[0].supportRankedNeutralMinionsKilledEnemyJungle;
  dbChampion.supportRankedTimePlayed += championsArray[0].supportRankedTimePlayed;
}

function getNewGames(gamesArray, summoner, newSummonerGamesArray){

  for(var i = 0; i < gamesArray.length; i ++){
    if(gamesArray[i].gameId != summoner.summonerLastGameId){
      newSummonerGamesArray.push(gamesArray[i]);
    }
    else{
      break;
    }
  }

  return newSummonerGamesArray;
}

function resetCurrentChampion(currentChampion){
  currentChampion.topNormalGames = 0;
  currentChampion.topNormalMinionsKilled = 0;
  currentChampion.topNormalNeutralMinionsKilled = 0;
  currentChampion.topNormalNeutralMinionsKilledYourJungle = 0;
  currentChampion.topNormalNeutralMinionsKilledEnemyJungle = 0;
  currentChampion.topNormalTimePlayed = 0;

  currentChampion.midNormalGames = 0;
  currentChampion.midNormalMinionsKilled = 0;
  currentChampion.midNormalNeutralMinionsKilled = 0;
  currentChampion.midNormalNeutralMinionsKilledYourJungle = 0;
  currentChampion.midNormalNeutralMinionsKilledEnemyJungle = 0;
  currentChampion.midNormalTimePlayed = 0;

  currentChampion.jungleNormalGames = 0;
  currentChampion.jungleNormalMinionsKilled = 0;
  currentChampion.jungleNormalNeutralMinionsKilled = 0;
  currentChampion.jungleNormalNeutralMinionsKilledYourJungle = 0;
  currentChampion.jungleNormalNeutralMinionsKilledEnemyJungle = 0;
  currentChampion.jungleNormalTimePlayed = 0;

  currentChampion.supportNormalGames = 0;
  currentChampion.supportNormalMinionsKilled = 0;
  currentChampion.supportNormalNeutralMinionsKilled = 0;
  currentChampion.supportNormalNeutralMinionsKilledYourJungle = 0;
  currentChampion.supportNormalNeutralMinionsKilledEnemyJungle = 0;
  currentChampion.supportNormalTimePlayed = 0;

  currentChampion.marksmanNormalGames = 0;
  currentChampion.marksmanNormalMinionsKilled = 0;
  currentChampion.marksmanNormalNeutralMinionsKilled = 0;
  currentChampion.marksmanNormalNeutralMinionsKilledYourJungle = 0;
  currentChampion.marksmanNormalNeutralMinionsKilledEnemyJungle = 0;
  currentChampion.marksmanNormalTimePlayed = 0;

  //RANKED GAMES
  currentChampion.topRankedGames = 0;
  currentChampion.topRankedMinionsKilled = 0;
  currentChampion.topRankedNeutralMinionsKilled = 0;
  currentChampion.topRankedNeutralMinionsKilledYourJungle = 0;
  currentChampion.topRankedNeutralMinionsKilledEnemyJungle = 0;
  currentChampion.topRankedTimePlayed = 0;

  currentChampion.midRankedGames = 0;
  currentChampion.midRankedMinionsKilled = 0;
  currentChampion.midRankedNeutralMinionsKilled = 0;
  currentChampion.midRankedNeutralMinionsKilledYourJungle = 0;
  currentChampion.midRankedNeutralMinionsKilledEnemyJungle = 0;
  currentChampion.midRankedTimePlayed = 0;

  currentChampion.jungleRankedGames = 0;
  currentChampion.jungleRankedMinionsKilled = 0;
  currentChampion.jungleRankedNeutralMinionsKilled = 0;
  currentChampion.jungleRankedNeutralMinionsKilledYourJungle = 0;
  currentChampion.jungleRankedNeutralMinionsKilledEnemyJungle = 0;
  currentChampion.jungleRankedTimePlayed = 0;

  currentChampion.supportRankedGames = 0;
  currentChampion.supportRankedMinionsKilled = 0;
  currentChampion.supportRankedNeutralMinionsKilled = 0;
  currentChampion.supportRankedNeutralMinionsKilledYourJungle = 0;
  currentChampion.supportRankedNeutralMinionsKilledEnemyJungle = 0;
  currentChampion.supportRankedTimePlayed = 0;

  currentChampion.marksmanRankedGames = 0;
  currentChampion.marksmanRankedMinionsKilled = 0;
  currentChampion.marksmanRankedNeutralMinionsKilled = 0;
  currentChampion.marksmanRankedNeutralMinionsKilledYourJungle = 0;
  currentChampion.marksmanRankedNeutralMinionsKilledEnemyJungle = 0;
  currentChampion.marksmanRankedTimePlayed = 0;

  return currentChampion;
}

function filterGames(gamesArray, gamesResponseArray){
  for(var i = 0; i < gamesResponseArray.length; i ++){
    if(gamesResponseArray[i].gameMode == 'CLASSIC' && gamesResponseArray[i].gameType == 'MATCHED_GAME'
      && (gamesResponseArray[i].subType == 'NORMAL' || gamesResponseArray[i].subType == 'RANKED_SOLO_5x5' || gamesResponseArray[i].subType == 'RANKED_TEAM_5x5'
        || gamesResponseArray[i].subType == 'RANKED_PREMADE_5x5')){
      gamesArray.push(gamesResponseArray[i]);
    }
  }

  return gamesArray;
} 

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});