import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.summonerName = '';
    this.region = 'na';
    this.helpBlock = '';
    this.summonerNameValidationState = '';
    this.showChampions = true;
    this.champions = [
      { championId: 266, championName: 'Aatrox', title: 'The Darkin Blade'},
      { championId: 103, championName: 'Ahri', title: 'The Nine-Tailed Fox'},
      { championId: 84, championName: 'Akali', title: 'The Fist of Shadow'},
      { championId: 12, championName: 'Alistar', title: 'The Minotaur'},
      { championId: 32, championName: 'Amumu', title: 'The Sad Mummy'}
    ];
  }

  onSearchSummonerSuccess(successMessage) {
    this.summonerNameValidationState = 'has-success';
    this.helpBlock = successMessage;
    this.showChampions = false;
  }

  onSearchSummonerFail(errorMessage) {
    this.summonerNameValidationState = 'has-error';
    this.helpBlock = errorMessage;
    this.showChampions = true;
  }

  onUpdateSummonerName(event) {
    this.summonerName = event.target.value;
    this.summonerNameValidationState = '';
    this.helpBlock = '';
  }

  onUpdateRegion(event){
    this.region = event.target.value;
  }

  onInvalidSummonerName() {
    this.summonerNameValidationState = 'has-error';
    this.helpBlock = 'Please enter a character name.';
    toastr.error('please enter a summoner name');
  }
}

export default alt.createStore(HomeStore);