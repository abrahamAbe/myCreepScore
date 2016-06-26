import React from 'react';
import ChampionStore from '../stores/ChampionStore';
import ChampionActions from '../actions/ChampionActions';
import HomeStore from '../stores/HomeStore'

class Champion extends React.Component {
  constructor(props) {
    super(props);
    this.state = ChampionStore.getState();
    this.onChange = this.onChange.bind(this);
    this.homeStore = HomeStore.getState();

    console.log('HODOR HOME STORE');
    console.log(this.homeStore);
    this.currentChampion = this.homeStore.currentChampion;
    this.champion = this.homeStore.champion;

    console.log('CURRENT CHAMPION ON CHAMPION PAGE');
    console.log(this.currentChampion);

    this.championName = this.currentChampion.championName;
    this.championApiName = this.champion.championName;

    //Normal games scores
    this.topNormalGames = this.currentChampion.topNormalGames;
    this.topNormalCreepScore = (this.currentChampion.topNormalMinionsKilled + this.currentChampion.topNormalNeutralMinionsKilled) / this.currentChampion.topNormalGames;
    if(!this.topNormalCreepScore){
      this.topNormalCreepScore = 0;
    }

    this.midNormalGames = this.currentChampion.midNormalGames;
    this.midNormalCreepScore = (this.currentChampion.midNormalMinionsKilled + this.currentChampion.midNormalNeutralMinionsKilled) / this.currentChampion.midNormalGames;

    this.jungleNormalGames = this.currentChampion.jungleNormalGames;
    this.jungleNormalCreepScore = (this.currentChampion.jungleNormalMinionsKilled + this.currentChampion.jungleNormalNeutralMinionsKilled) / this.currentChampion.jungleNormalGames;

    this.marksmanNormalGames = this.currentChampion.marksmanNormalGames;
    this.marksmanNormalCreepScore = (this.currentChampion.marksmanNormalMinionsKilled + this.currentChampion.marksmanNormalNeutralMinionsKilled) / this.currentChampion.marksmanNormalGames;

    this.supportNormalGames = this.currentChampion.supportNormalGames;
    this.supportNormalCreepScore = (this.currentChampion.supportNormalMinionsKilled + this.currentChampion.supportNormalNeutralMinionsKilled) / this.currentChampion.supportNormalGames;

    //Ranked games scores
    this.topRankedGames = this.currentChampion.topRankedGames;
    this.topRankedCreepScore = (this.currentChampion.topRankedMinionsKilled + this.currentChampion.topRankedNeutralMinionsKilled) / this.currentChampion.topRankedGames;

    this.midRankedGames = this.currentChampion.midRankedGames;
    this.midRankedCreepScore = (this.currentChampion.midRankedMinionsKilled + this.currentChampion.midRankedNeutralMinionsKilled) / this.currentChampion.midRankedGames;

    this.jungleRankedGames = this.currentChampion.jungleRankedGames;
    this.jungleRankedCreepScore = (this.currentChampion.jungleRankedMinionsKilled + this.currentChampion.jungleRankedNeutralMinionsKilled) / this.currentChampion.jungleRankedGames;

    this.marksmanRankedGames = this.currentChampion.marksmanRankedGames;
    this.marksmanRankedCreepScore = (this.currentChampion.marksmanRankedMinionsKilled + this.currentChampion.marksmanRankedNeutralMinionsKilled) / this.currentChampion.marksmanRankedGames;

    this.supportRankedGames = this.currentChampion.supportRankedGames;
    this.supportRankedCreepScore = (this.currentChampion.supportRankedMinionsKilled + this.currentChampion.supportRankedNeutralMinionsKilled) / this.currentChampion.supportRankedGames;

    //console.log('CHAMPION PAGE');
    //console.log(this.state);
  }

  componentDidMount() {
    ChampionStore.listen(this.onChange);
    /*CharacterActions.getCharacter(this.props.params.id);

    $('.magnific-popup').magnificPopup({
      type: 'image',
      mainClass: 'mfp-zoom-in',
      closeOnContentClick: true,
      midClick: true,
      zoom: {
        enabled: true,
        duration: 300
      }
    });*/
  }

  componentWillUnmount() {
    ChampionStore.unlisten(this.onChange);
    //$(document.body).removeClass();
  }

  componentDidUpdate() {
    // Fetch new charachter data when URL path changes
    /*if (prevProps.params.id !== this.props.params.id) {
      CharacterActions.getCharacter(this.props.params.id);
    }*/
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var divStyle = {
      color: 'white',
      backgroundImage: 'url(' + 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/' + this.championApiName + '_0.jpg' + ')',
      WebkitTransition: 'all', // note the capital 'W' here
      msTransition: 'all' // 'ms' is the only lowercase vendor prefix
    };
    return (
      <div className='championMainContainer container'>
        {this.championName}
        <div style={divStyle} className="championImageContainer"></div>
        <div className="championStatsContainer">
          <div className="normalChampionStats statsContent">
            <div className="statsContentTitle">Normal (Summoner's Rift)</div>
            <div className="topSectionScores">
              <div className="statsContentScores">
                <div>Top lane</div>
                <div>Games: {this.topNormalGames}</div>
                <div>Creep score: {this.topNormalCreepScore}</div>
              </div>
              <div className="statsContentScores">
                <div>Mid lane</div>
                <div>Games: {this.midNormalGames}</div>
                <div>Creep score: {this.midNormalCreepScore}</div>
              </div>
              <div className="statsContentScores">
                <div>Jungle</div>
                <div>Games: {this.jungleNormalGames}</div>
                <div>Creep score: {this.jungleNormalCreepScore}</div>
              </div>
            </div>
            <div className="bottomSectionScores">
              <div className="statsContentScores">
                <div>Marksman</div>
                <div>Games: {this.marksmanNormalGames}</div>
                <div>Creep score: {this.marksmanNormalCreepScore}</div>
              </div>
              <div className="statsContentScores">
                <div>Support</div>
                <div>Games: {this.supportNormalGames}</div>
                <div>Creep score: {this.supportNormalCreepScore}</div>
              </div>
            </div>
          </div>
          <div className="rankedChampionStats statsContent">
            <div className="statsContentTitle">Ranked (Summoner's Rift)</div>
            <div className="topSectionScores">
              <div className="statsContentScores">
                <div>Top lane</div>
                <div>Games: {this.topRankedGames}</div>
                <div>Creep score: {this.topRankedCreepScore}</div>
              </div>
              <div className="statsContentScores">
                <div>Mid lane</div>
                <div>Games: {this.midRankedGames}</div>
                <div>Creep score: {this.midRankedCreepScore}</div>
              </div>
              <div className="statsContentScores">
                <div>Jungle</div>
                <div>Games: {this.jungleRankedGames}</div>
                <div>Creep score: {this.jungleRankedCreepScore}</div>
              </div>
            </div>
            <div className="bottomSectionScores">
              <div className="statsContentScores">
                <div>Marksman</div>
                <div>Games: {this.marksmanRankedGames}</div>
                <div>Creep score: {this.marksmanRankedCreepScore.toFixed(1)}</div>
              </div>
              <div className="statsContentScores">
                <div>Support</div>
                <div>Games: {this.supportRankedGames}</div>
                <div>Creep score: {this.supportRankedCreepScore}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Champion;