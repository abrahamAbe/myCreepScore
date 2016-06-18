var mongoose = require('mongoose');

var summonerSchema = new mongoose.Schema({
  summonerId: String,
  summonerName: String,
  summonerRegion: String,
  summonerLastGameId: String,
  
  championsS6: [
    {
      championName: String,
      championId: String,
      
      topNormalGames: Number,
      topNormalMinionsKilled: Number,
      topNormalNeutralMinionsKilled: Number,
      topNormalNeutralMinionsKilledYourJungle: Number,
      topNormalNeutralMinionsKilledEnemyJungle: Number,
      topNormalTimePlayed: Number,

      midNormalGames: Number,
      midNormalMinionsKilled: Number,
      midNormalNeutralMinionsKilled: Number,
      midNormalNeutralMinionsKilledYourJungle: Number,
      midNormalNeutralMinionsKilledEnemyJungle: Number,
      midNormalTimePlayed: Number,

      jungleNormalGames: Number,
      jungleNormalMinionsKilled: Number,
      jungleNormalNeutralMinionsKilled: Number,
      jungleNormalNeutralMinionsKilledYourJungle: Number,
      jungleNormalNeutralMinionsKilledEnemyJungle: Number,
      jungleNormalTimePlayed: Number,

      marksmanNormalGames: Number,
      marksmanNormalMinionsKilled: Number,
      marksmanNormalNeutralMinionsKilled: Number,
      marksmanNormalNeutralMinionsKilledYourJungle: Number,
      marksmanNormalNeutralMinionsKilledEnemyJungle: Number,
      marksmanNormalTimePlayed: Number,

      supportNormalGames: Number,
      supportNormalMinionsKilled: Number,
      supportNormalNeutralMinionsKilled: Number,
      supportNormalNeutralMinionsKilledYourJungle: Number,
      supportNormalNeutralMinionsKilledEnemyJungle: Number,
      supportNormalTimePlayed: Number,

      topRankedGames: Number,
      topRankedMinionsKilled: Number,
      topRankedNeutralMinionsKilled: Number,
      topRankedNeutralMinionsKilledYourJungle: Number,
      topRankedNeutralMinionsKilledEnemyJungle: Number,
      topRankedTimePlayed: Number,

      midRankedGames: Number,
      midRankedMinionsKilled: Number,
      midRankedNeutralMinionsKilled: Number,
      midRankedNeutralMinionsKilledYourJungle: Number,
      midRankedNeutralMinionsKilledEnemyJungle: Number,
      midRankedTimePlayed: Number,

      jungleRankedGames: Number,
      jungleRankedMinionsKilled: Number,
      jungleRankedNeutralMinionsKilled: Number,
      jungleRankedNeutralMinionsKilledYourJungle: Number,
      jungleRankedNeutralMinionsKilledEnemyJungle: Number,
      jungleRankedTimePlayed: Number,

      marksmanRankedGames: Number,
      marksmanRankedMinionsKilled: Number,
      marksmanRankedNeutralMinionsKilled: Number,
      marksmanRankedNeutralMinionsKilledYourJungle: Number,
      marksmanRankedNeutralMinionsKilledEnemyJungle: Number,
      marksmanRankedTimePlayed: Number,
      
      supportRankedGames: Number,
      supportRankedMinionsKilled: Number,
      supportRankedNeutralMinionsKilled: Number,
      supportRankedNeutralMinionsKilledYourJungle: Number,
      supportRankedNeutralMinionsKilledEnemyJungle: Number,
      supportRankedTimePlayed: Number
    }
  ]
});

module.exports = mongoose.model('Summoner', summonerSchema);