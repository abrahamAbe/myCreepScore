var mongoose = require('mongoose');

var summonerSchema = new mongoose.Schema({
  summonerId: String,
  summonerName: String,
  summonerLastGameId: String,
  
  championsS6: [
    {
      championName: String,
      championId: String,
      topNormalGames: Number,
      topNormalCs: Number,
      midNormalGames: Number,
      midNormalCs: Number,
      jungleNormalGames: Number,
      jungleNormalCs: Number,
      marksmanNormalGames: Number,
      marksmanNormalCs: Number,
      supportNormalGames: Number,
      supportNormalCs: Number,
      topRankedGames: Number,
      topRankedCs: Number,
      midRankedGames: Number,
      midRankedCs: Number,
      jungleRankedGames: Number,
      jungleRankedCs: Number,
      marksmanRankedGames: Number,
      marksmanRankedCs: Number,
      supportRankedGames: Number,
      supportRankedCs: Number
    }
  ]
});

module.exports = mongoose.model('Summoner', summonerSchema);