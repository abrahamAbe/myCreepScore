import React from 'react';
import ChampionStore from '../stores/ChampionStore';
import ChampionActions from '../actions/ChampionActions';
import HomeStore from '../stores/HomeStore';
import {Link} from 'react-router';

class Champion extends React.Component {
  constructor(props) {
    super(props);
    this.state = ChampionStore.getState();
    this.onChange = this.onChange.bind(this);
    this.homeStore = HomeStore.getState();

    this.championName = '';
    this.championApiName = '';

    this.topNormalGames = 0;
    this.topNormalCreepScore = 0;
    this.midNormalGames = 0;
    this.midNormalCreepScore = 0;
    this.jungleNormalGames  = 0;
    this.jungleNormalCreepScore  = 0;
    this.marksmanNormalGames = 0;
    this.marksmanNormalCreepScore = 0;
    this.supportNormalGames = 0;
    this.supportNormalCreepScore = 0;

    this.topRankedGames = 0;
    this.topRankedCreepScore = 0;
    this.midRankedGames = 0;
    this.midRankedCreepScore = 0;
    this.jungleRankedGames = 0;
    this.jungleRankedCreepScore = 0;
    this.marksmanRankedGames = 0;
    this.marksmanRankedCreepScore = 0;
    this.supportRankedGames = 0;
    this.supportRankedCreepScore = 0;

    if(this.homeStore.apiSummonerName != 'noName'){
      this.currentChampion = this.homeStore.currentChampion;
      this.champion = this.homeStore.champion;

      //Retrieving champion data for display on champion page
      this.championName = this.currentChampion.championName;
      this.championTitle = this.champion.title;
      this.championApiName = this.champion.championName;

      //Normal games scores
      if(this.currentChampion.topNormalGames){
        this.topNormalGames = this.currentChampion.topNormalGames;
      }
      this.topNormalCreepScore = (this.currentChampion.topNormalMinionsKilled + this.currentChampion.topNormalNeutralMinionsKilled) / this.currentChampion.topNormalGames;

      if(!this.topNormalCreepScore){
        this.topNormalCreepScore = 0;
      }

      if(this.currentChampion.midNormalGames){
        this.midNormalGames = this.currentChampion.midNormalGames;
      }
      this.midNormalCreepScore = (this.currentChampion.midNormalMinionsKilled + this.currentChampion.midNormalNeutralMinionsKilled) / this.currentChampion.midNormalGames;

      if(!this.midNormalCreepScore){
        this.midNormalCreepScore = 0;
      }

      if(this.currentChampion.jungleNormalGames){
        this.jungleNormalGames = this.currentChampion.jungleNormalGames;
      }
      this.jungleNormalCreepScore = (this.currentChampion.jungleNormalMinionsKilled + this.currentChampion.jungleNormalNeutralMinionsKilled) / this.currentChampion.jungleNormalGames;

      if(!this.jungleNormalCreepScore){
        this.jungleNormalCreepScore = 0;
      }

      if(this.currentChampion.marksmanNormalGames){
        this.marksmanNormalGames = this.currentChampion.marksmanNormalGames;
      }
      this.marksmanNormalCreepScore = (this.currentChampion.marksmanNormalMinionsKilled + this.currentChampion.marksmanNormalNeutralMinionsKilled) / this.currentChampion.marksmanNormalGames;

      if(!this.marksmanNormalCreepScore){
        this.marksmanNormalCreepScore = 0;
      }

      if(this.currentChampion.supportNormalGames){
        this.supportNormalGames = this.currentChampion.supportNormalGames;
      }
      this.supportNormalCreepScore = (this.currentChampion.supportNormalMinionsKilled + this.currentChampion.supportNormalNeutralMinionsKilled) / this.currentChampion.supportNormalGames;

      if(!this.supportNormalCreepScore){
        this.supportNormalCreepScore = 0;
      }

      //Ranked games scores
      if(this.currentChampion.topRankedGames){
        this.topRankedGames = this.currentChampion.topRankedGames;
      }
      this.topRankedCreepScore = (this.currentChampion.topRankedMinionsKilled + this.currentChampion.topRankedNeutralMinionsKilled) / this.currentChampion.topRankedGames;

      if(!this.topRankedCreepScore){
        this.topRankedCreepScore = 0;
      }

      if(this.currentChampion.midRankedGames){
        this.midRankedGames = this.currentChampion.midRankedGames;
      }
      this.midRankedCreepScore = (this.currentChampion.midRankedMinionsKilled + this.currentChampion.midRankedNeutralMinionsKilled) / this.currentChampion.midRankedGames;

      if(!this.midRankedCreepScore){
        this.midRankedCreepScore = 0;
      }

      if(this.currentChampion.jungleRankedGames){
        this.jungleRankedGames = this.currentChampion.jungleRankedGames;
      }
      this.jungleRankedCreepScore = (this.currentChampion.jungleRankedMinionsKilled + this.currentChampion.jungleRankedNeutralMinionsKilled) / this.currentChampion.jungleRankedGames;

      if(!this.jungleRankedCreepScore){
        this.jungleRankedCreepScore = 0;
      }

      if(this.currentChampion.marksmanRankedGames){
        this.marksmanRankedGames = this.currentChampion.marksmanRankedGames;
      }
      this.marksmanRankedCreepScore = (this.currentChampion.marksmanRankedMinionsKilled + this.currentChampion.marksmanRankedNeutralMinionsKilled) / this.currentChampion.marksmanRankedGames;

      if(!this.marksmanRankedCreepScore){
        this.marksmanRankedCreepScore = 0;
      }

      if(this.currentChampion.supportRankedGames){
        this.supportRankedGames = this.currentChampion.supportRankedGames;
      }
      this.supportRankedCreepScore = (this.currentChampion.supportRankedMinionsKilled + this.currentChampion.supportRankedNeutralMinionsKilled) / this.currentChampion.supportRankedGames;

      if(!this.supportRankedCreepScore){
        this.supportRankedCreepScore = 0;
      }
    }
  }

  componentDidMount() {
    ChampionStore.listen(this.onChange);
    if(!this.homeStore.champion){
      //window.location.href = 'http://mycreepscore.herokuapp.com/';
      window.location.href = 'http://localhost:3000/';
    }
  }

  componentWillUnmount() {
    ChampionStore.unlisten(this.onChange);
  }

  componentDidUpdate() {
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var championImageContainerStyle = {
      backgroundImage: 'url(' + 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' + this.championApiName + '_0.jpg' + ')',
      WebkitTransition: 'all',
      msTransition: 'all'
    };
    return (
      <div className={this.homeStore.apiSummonerName == 'noName' ? 'hidden' : 'championMainContainer container'}>
        <div className="championInfoContainer">
          <div className="championName">{this.championName}</div>
          <div className="championTitle">{this.championTitle}</div>
        </div>
        <div style={championImageContainerStyle} className="championImageContainer"></div>
        <div className="championStatsContainer">
          <div className="normalChampionStats statsContent">
            <div className="statsContentTitle">Normal</div>
            <div className="statsContentTitle">(Summoner's Rift)</div>
            <div className="topSectionScores">
              <div className="statsContentScores">
                <div className="laneTitle">Top lane</div>
                <div>Games: {this.topNormalGames}</div>
                <div>Cs/game: {this.topNormalCreepScore.toFixed(0)}</div>
              </div>
              <div className="statsContentScores">
                <div className="laneTitle">Mid lane</div>
                <div>Games: {this.midNormalGames}</div>
                <div>Cs/game: {this.midNormalCreepScore.toFixed(0)}</div>
              </div>
              <div className="statsContentScores">
                <div className="laneTitle">Jungle</div>
                <div>Games: {this.jungleNormalGames}</div>
                <div>Cs/game: {this.jungleNormalCreepScore.toFixed(0)}</div>
              </div>
            </div>
            <div className="bottomSectionScores">
              <div className="statsContentScores">
                <div className="laneTitle">Marksman</div>
                <div>Games: {this.marksmanNormalGames}</div>
                <div>Cs/game: {this.marksmanNormalCreepScore.toFixed(0)}</div>
              </div>
              <div className="statsContentScores">
                <div className="laneTitle">Support</div>
                <div>Games: {this.supportNormalGames}</div>
                <div>Cs/game: {this.supportNormalCreepScore.toFixed(0)}</div>
              </div>
            </div>
          </div>
          <div className="rankedChampionStats statsContent">
            <div className="statsContentTitle">Ranked</div>
            <div className="statsContentTitle">(Summoner's Rift)</div>
            <div className="topSectionScores">
              <div className="statsContentScores">
                <div className="laneTitle">Top lane</div>
                <div>Games: {this.topRankedGames}</div>
                <div>Cs/game: {this.topRankedCreepScore.toFixed(0)}</div>
              </div>
              <div className="statsContentScores">
                <div className="laneTitle">Mid lane</div>
                <div>Games: {this.midRankedGames}</div>
                <div>Cs/game: {this.midRankedCreepScore.toFixed(0)}</div>
              </div>
              <div className="statsContentScores">
                <div className="laneTitle">Jungle</div>
                <div>Games: {this.jungleRankedGames}</div>
                <div>Cs/game: {this.jungleRankedCreepScore.toFixed(0)}</div>
              </div>
            </div>
            <div className="bottomSectionScores">
              <div className="statsContentScores">
                <div className="laneTitle">Marksman</div>
                <div>Games: {this.marksmanRankedGames}</div>
                <div>Cs/game: {this.marksmanRankedCreepScore.toFixed(0)}</div>
              </div>
              <div className="statsContentScores">
                <div className="laneTitle">Support</div>
                <div>Games: {this.supportRankedGames}</div>
                <div>Cs/game: {this.supportRankedCreepScore.toFixed(0)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="backButton">
          <Link to={'/'}>Back To Home Page</Link>
        </div>
      </div>
    );
  }
}

export default Champion;