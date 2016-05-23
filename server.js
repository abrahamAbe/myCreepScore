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
var champions = {
    "1" :  { id: 1, name: 'Ahri'},
    "2" :  { id: 2, name: 'Veigar'},
    "3" :  { id: 3, name: 'Rengar'},
    "9" :  { id: 9, name: 'Fiddlesticks'}
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
          var summonerId = '';

          summonerId = body.split('"id":');
          summonerId = summonerId[1].split(',')[0];

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
              summonerName: 'Abe'
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
        if(champions[gamesArray[i].championId]){
          console.log(champions[gamesArray[i].championId].name);
          currentChampion.championName = champions[gamesArray[i].championId].name;
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