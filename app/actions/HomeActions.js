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
        this.actions.searchSummonerSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.searchSummonerFail(jqXhr.responseJSON.message);
      });
  }

  searchForChampion(championId){
    console.log('SEARCHING ' + championId);
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