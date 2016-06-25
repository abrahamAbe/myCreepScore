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
    this.displayData = this.homeStore.championsArray[1].championName;
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
    return (
      <div className='container'>
        Hodor
        {this.displayData}
      </div>
    );
  }
}

export default Champion;