import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'searchSummonerSuccess',
      'searchSummonerFail',
      'searchForChampionSuccess',
      'searchForChampionFail',
      'updateSummonerName',
      'invalidSummonerName',
      'updateRegion'
    );
  }

  searchSummoner(summonerName, region) {
    $.ajax({
      type: 'POST',
      url: '/searchSummoner',
      data: { summonerName: summonerName, region: region }
    })
      .done((data) => {
        this.actions.searchSummonerSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.searchSummonerFail(jqXhr.responseJSON.message);
      });
  }

  searchForChampion(championId, championsArray){
    console.log('SEARCHING: ' + championId.hodor);
    console.log('SEARCHING: ' + championId.championId);
    console.log('CHAMPIONS: ' + championsArray);
    $.ajax({ 
        type: 'POST',
        url: '/searchForChampion',
        data: { championId: championId } 
      })
      .done((data) => {
        this.actions.searchForChampionSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.searchForChampionFail(jqXhr);
      });
  }

}

export default alt.createActions(HomeActions);