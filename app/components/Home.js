import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore';
import HomeActions from '../actions/HomeActions';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  searchSummoner(event) {
    event.preventDefault();

    if(this.state.summonerName){
      var summonerName = this.state.summonerName.trim(),
        region = this.state.region;

      if (!summonerName) {
        HomeActions.invalidSummonerName();
      }

      if (summonerName && region) {
        HomeActions.searchSummoner(summonerName, region);
      }
    }
    else{
      toastr.error('Please enter a summoner name.');
    }
  }

  setSelectedChampionData(champion) {
    var championData ={};
    championData.champion = champion;

    for(var i = 0; i < this.state.championsArray.length; i ++){
      if(this.state.championsArray[i].championId == champion.championId){
        championData.currentChampion = this.state.championsArray[i];
        break;
      }
    }

    HomeActions.setSelectedChampionData(championData);
  }

  changeSeason(season){
    HomeActions.changeSeason(season);
    //rerendering component when changing season
    this.forceUpdate();
  }

  switchMainScreen(){
    HomeActions.switchMainScreen();
  }

  render() {
    let championGrid = this.state.champions.map((champion) => {
      if(!this.state.showChampions && this.state.championsArray){
        var championsArray = this.state.championsArray;
        for(var i = 0; i < championsArray.length; i ++){
          //if champion is in DB
          if(championsArray[i].championId == champion.championId){
            champion.activeChampion = true;
          }
        }
        return (
          <div className="championPortraitContainer" key={champion.championId}>
            <div className={champion.activeChampion ? '' : 'championContentDisabled'}>
              <Link to={'/champion/' + champion.championId}>
                <img onClick={this.setSelectedChampionData.bind(this, champion)} className='thumb-md championImage' src={'http://ddragon.leagueoflegends.com/cdn/6.12.1/img/champion/' + champion.championName + '.png'} />
              </Link>
            </div>
          </div>
        )
      }
    });

    return (
      <div className='homeMainContainer container'>
        <div className='searchBarContainer'>
          <form onSubmit={this.searchSummoner.bind(this)}>
            <div className={'form-group' + this.state.summonerNameValidationState, 'searchBar'}>
              <input type='text' placeholder='Summoner name...' className='form-control' value={this.state.summonerName}
                     onChange={HomeActions.updateSummonerName} autoFocus/>
            </div>
            <select value={this.state.region}
                    onChange={HomeActions.updateRegion}
                    className='regionSelect'>
                    <option value="na">NA</option>
                    <option value="br">BR</option>
                    <option value="eune">EUNE</option>
                    <option value="euw">EUW</option>
                    <option value="jp">JP</option>
                    <option value="kr">KR</option>
                    <option value="lan">LAN</option>
                    <option value="las">LAS</option>
                    <option value="oce">OCE</option>
                    <option value="ru">RU</option>
                    <option value="tr">TR</option>
            </select>
            <button type='submit' className='btn summonerSearchBtn'>Go</button>
          </form>
        </div>
        <div className={this.state.showChampions ? 'instructionsContainer' : 'hidden'}>
          <div className="mainPageImgContainer">
            <img src={'http://abrahampreciadomo.com/assets/myCreepScore.png'} alt="myCreepScore" className="mainPageImg"/>
          </div>
          <div className="instructionsTitle">Find out how good you are at CSing!</div>
          <div className="instructionsContent">
            <div className="instructionsContentTitle">What does the info mean</div>
            <div>Each champion displays it's number of recorded games per lane (top, mid, jungle, marksman and support), followed by the average creep score for said lane, also, 
            scores are divided by normal and ranked games.</div>
            <div className="instructionsContentTitle">How are the averages created</div>
            <div>The app will pull a summoner's most recent 10 matches and CS averages will be created based on those games. If more games are played and a new search is executed, 
            those new games will be added to the current scores and new scores will be generated.

            Only normal and ranked games on Summoner's rift are taken into account.</div>
          </div>
        </div>
        <div className={this.state.showChampions ? 'hidden' : 'summonerInfoContainer'}>
          <img className="summonerInfoIcon" src={'http://ddragon.leagueoflegends.com/cdn/6.13.1/img/profileicon/' + this.state.profileIconId + '.png'} />
          <div className="summonerInfoName">{this.state.apiSummonerName}</div>
        </div>
        <div className={this.state.showSeasonButton ? 'seasonButtonContainer' : 'hidden'}>
          <button className='btn summonerSearchBtn' onClick={this.changeSeason.bind(this, '6')}>Season 6</button>
          <button className='btn summonerSearchBtn' onClick={this.changeSeason.bind(this, '7')}>Season 7</button>
        </div>
        <div className='gridContainer'>
          <div>{championGrid}</div>
        </div>
        <div className={this.state.showMainPageNavigation ? 'navigationLink' : 'hidden'} onClick={this.switchMainScreen.bind()}>
          <Link to={'/'} className={this.state.showChampions ? 'hidden' : ''}>Go To Home Page</Link>
          <Link to={'/'} className={this.state.showChampions ? '' : 'hidden'}>Go To Champions Page</Link>
        </div>
      </div>
    );
  }
}

export default Home;