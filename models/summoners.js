var mongoose = require('mongoose');

var summonerSchema = new mongoose.Schema({
  summonerId: String,
  summonerName: String,
  
  championsS6: [
    {
      championName: String,
      championId: String,
      championGames: Number
    }
  ]
});

module.exports = mongoose.model('Summoner', summonerSchema);