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

var globalVariable = 'Hodor';
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


/**
 * POST /searchSummoner
 * Searches for summoner in the Riot API
 */
app.post('/searchSummoner', function(req, res, next) {

  //HTML encoding summoner name
  var summonerName = encodeURIComponent(req.body.summonerName),
      region = req.body.region;

  //Riot API Request
  var riotRequest = 'https://na.api.pvp.net/api/lol/' + region + '/v1.4/summoner/by-name/' + summonerName + '?api_key=159a2c64-74bc-4421-bc98-3278e73922de';
  async.waterfall([
    function(callback) {
      request.get(riotRequest, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var summonerId = '',
              summonerName = '';

          summonerId = body.split('"id":');
          summonerId = summonerId[1].split(',')[0];

          ApiSummonerName = body.split('"name":"');
          ApiSummonerName = ApiSummonerName[1].split('",')[0];

          //console.log('SUMMONERNAME: ' + summonerName);
          //console.log('Summoner Info: ' + body);

          Summoner.findOne({ summonerId: summonerId }, function(err, summoner) {
            if(summoner){
              var summonerData = {
                summoner: summoner,
                summonerId: summonerId
              }
              //console.log(summonerId + ' Already in DB');
              callback(error, summonerData);
            }
            else{
              var summonerData = summonerId;
              //console.log(summonerId + ' Not in DB');
              callback(error, summonerId);
            }
          })
        }

        else{
          //if summoner request fails
          return res.status(400).send({ message: 'Unexpected Error' });
        }

      });
    },
    function(summonerData){
      var gamesRequest = '',
          summonerId = '',
          summonerExists = false;

      //console.log(summonerData);
      //console.log(summonerExists);

      if(summonerData.summonerId){
        summonerId = summonerData.summonerId;
        summonerExists = true;
        //console.log('SUMMONER EXISTS');
        gamesRequest = 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/' + summonerId + '/recent?api_key=159a2c64-74bc-4421-bc98-3278e73922de'; // get rid of duplicate
        //console.log(gamesRequest);
      }

      else{
        summonerId = summonerData;
        gamesRequest = 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/' + summonerId + '/recent?api_key=159a2c64-74bc-4421-bc98-3278e73922de'; // get rid of duplicate
        //console.log('SUMMONER DOESNT EXIST');
        //console.log(gamesRequest);
      }

      request.get(gamesRequest, function (error, response, body) {
        if (!error && response.statusCode == 200) {

          var gamesData = JSON.parse(body),
              gamesArray = gamesData.games;
          
          if(summonerExists){
            console.log('updating existing summoner', summonerData.summoner);
            return res.status(200).send({ message: 'success' });
            /* var champion = {
                  championName: 'Zac',
                  championId: '1'
                };
                console.log('Champions: ' + champions);
                for(var i = 0; i < champions.length; i ++){
                  if(champions[i].id == 1){
                    console.log(champions[i].name);
                  }
                }
                console.log(summonerId + ' already in db');
                console.log(err);
                character.summonerName = 'Hodor';
                character.champions.push(champion);
                character.save();
                return res.status(200).send({message: 'already in DB'})
              }*/
          }
          else{
            console.log('creating new summoner');

            var summoner = new Summoner({
              summonerId: summonerId,
              summonerName: ApiSummonerName
            });

            summoner = saveSummonerGames(summoner, gamesArray);

            summoner.save(function(err) {
              if (err) return next(err);
              res.send({ message: summonerId + ' has been added successfully!' });
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

function saveSummonerGames(summoner, gamesArray){

  var championsArray = [],
      remainingGamesArray = [],
      currentChampion = {
        championId: 0,
        championGames: 0
      },
      currentId = '';

  for(var i = 0; i < gamesArray.length; i ++){
      console.log('ID LIST: ' + gamesArray[i].championId);
  }

  do {
    for(var i = 0; i < gamesArray.length; i ++){
      //console.log('ID LIST: ' + games[i].championId);
      if(i == 0){
        console.log('Saving first champ! ' + gamesArray[i].championId);
        if(championsData[gamesArray[i].championId]){
          console.log(championsData[gamesArray[i].championId].championId);
          currentChampion.championName = championsData[gamesArray[i].championId].championName;
        }
        currentChampion.championId = gamesArray[i].championId;
        currentChampion.championGames += 1;
        championsArray.push(currentChampion);

        /*for(var counter = 0; counter < champions.length; counter ++){
          console.log(champions[counter].id);
          if(champions[counter].id == games[i].championId){
            currentChampion.championName = champions[counter].name;
          }
        }*/
      }
      else{
        for(var x = 0; x < championsArray.length; x ++){
          currentId = gamesArray[i].championId;

          if(currentId == championsArray[x].championId){
            championsArray[x].championGames += 1;
          }
        }
      }
    }

    for(var y = 0; y < championsArray.length; y ++){
      for(var z = 0; z < gamesArray.length; z ++){
        if(championsArray[y].championId != gamesArray[z].championId){
          remainingGamesArray.push(gamesArray[z]);
        }
      }
    }

    gamesArray = remainingGamesArray;
    remainingGamesArray = [];

    //check if champion exists, if it exists pull it out and add averages, if not just add him
    summoner.championsS6.push(championsArray[0]);
    championsArray = [];
    currentChampion.championGames = 0;

  } while(gamesArray.length);

  return summoner;
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