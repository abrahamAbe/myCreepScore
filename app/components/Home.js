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

    var summonerName = this.state.summonerName.trim(),
        region = this.state.region;

    if (!summonerName) {
      HomeActions.invalidSummonerName();
    }

    if (summonerName && region) {
      HomeActions.searchSummoner(summonerName, region);
    }
  }

  render() {
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
            <span className='help-block searchBarHelperText'>{this.state.helpBlock}</span>
          </form>
        </div>
        <div className={this.state.showChampions ? 'hidden' : ''}>Hodor</div>
      </div>
    );
  }
}

export default Home;