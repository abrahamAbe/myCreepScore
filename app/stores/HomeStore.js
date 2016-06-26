import alt from '../alt';
import HomeActions from '../actions/HomeActions';
import ChampionStore from '../stores/ChampionStore';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.ChampionStore = ChampionStore.getState();
    this.summonerName = '';
    this.apiSummonerName = '';
    this.region = 'na';
    this.helpBlock = '';
    this.summonerNameValidationState = '';
    this.showChampions = true;
    this.championsArray;
    this.profileIconId = '666';
    this.currentChampion;
    this.champion;
    this.champions = [
      { championId: 266, championName: 'Aatrox', title: 'The Darkin Bladee'},
      { championId: 103, championName: 'Ahri', title: 'The Nine-Tailed Fox'},
      { championId: 84, championName: 'Akali', title: 'The Fist of Shadow'},
      { championId: 12, championName: 'Alistar', title: 'The Minotaur'},
      { championId: 32, championName: 'Amumu', title: 'The Sad Mummy'},
      { championId: 34, championName: 'Anivia', title: 'The Cryophoenix'},
      { championId: 1, championName: 'Annie', title: 'The Dark Child'},
      { championId: 22, championName: 'Ashe', title: 'The Frost Archer'},
      { championId: 136, championName: 'AurelionSol', title: 'The Star Forger'},
      { championId: 268, championName: 'Azir', title: 'The Emperor of the Sands'},
      { championId: 432, championName: 'Bard', title: 'The Wandering Caretaker'},
      { championId: 53, championName: 'Blitzcrank', title: 'The Great Steam Golem'},
      { championId: 63, championName: 'Brand', title: 'The Burning Vengeance'},
      { championId: 201, championName: 'Braum', title: 'The Heart of the Freljord'},
      { championId: 51, championName: 'Caitlyn', title: 'The Sheriff of Piltover'},
      { championId: 69, championName: 'Cassiopeia', title: 'The Serpent\'s Embrace'},
      { championId: 31, championName: 'Chogath', title: 'The Terror of the Void'},
      { championId: 42, championName: 'Corki', title: 'The Daring Bombardier'},
      { championId: 122, championName: 'Darius', title: 'The Hand of Noxus'},
      { championId: 131, championName: 'Diana', title: 'Scorn of the Moon'},
      { championId: 36, championName: 'DrMundo', title: 'The Madman of Zaun'},
      { championId: 119, championName: 'Draven', title: 'The Glorious Executioner'},
      { championId: 245, championName: 'Ekko', title: 'The Boy Who Shattered Time'},
      { championId: 60, championName: 'Elise', title: 'The Spider Queen'},
      { championId: 28, championName: 'Evelynn', title: 'The Widowmaker'},
      { championId: 81, championName: 'Ezreal', title: 'The Prodigal Explorer'},
      { championId: 9, championName: 'FiddleSticks', title: 'The Harbinger of Doom'},
      { championId: 114, championName: 'Fiora', title: 'The Grand Duelist'},
      { championId: 105, championName: 'Fizz', title: 'The Tidal Trickster'},
      { championId: 3, championName: 'Galio', title: 'The Sentinel\'s Sorrow'},
      { championId: 41, championName: 'Gangplank', title: 'The Saltwater Scourge'},
      { championId: 86, championName: 'Garen', title: 'The Might of Demacia'},
      { championId: 150, championName: 'Gnar', title: 'The Missing Link'},
      { championId: 79, championName: 'Gragas', title: 'The Rabble Rouser'},
      { championId: 104, championName: 'Graves', title: 'The Outlaw'},
      { championId: 120, championName: 'Hecarim', title: 'The Shadow of War'},
      { championId: 74, championName: 'Heimerdinger', title: 'The Revered Inventor'},
      { championId: 420, championName: 'Illaoi', title: 'The Kraken Priestess'},
      { championId: 39, championName: 'Irelia', title: 'The Will of the Blades'},
      { championId: 40, championName: 'Janna', title: 'the Storm\'s Fury'},
      { championId: 59, championName: 'JarvanIV', title: 'The Exemplar of Demacia'},
      { championId: 24, championName: 'Jax', title: 'Grandmaster at Arms'},
      { championId: 126, championName: 'Jayce', title: 'The Defender of Tomorrow'},
      { championId: 202, championName: 'Jhin', title: 'The Virtuoso'},
      { championId: 222, championName: 'Jinx', title: 'The Loose Cannon'},
      { championId: 429, championName: 'Kalista', title: 'The Spear of Vengeance'},
      { championId: 43, championName: 'Karma', title: 'The Enlightened One'},
      { championId: 30, championName: 'Karthus', title: 'The Deathsinger'},
      { championId: 38, championName: 'Kassadin', title: 'The Void Walker'},
      { championId: 55, championName: 'Katarina', title: 'The Sinister Blade'},
      { championId: 10, championName: 'Kayle', title: 'The Judicator'},
      { championId: 85, championName: 'Kennen', title: 'The Heart of the Tempest'},
      { championId: 121, championName: 'Khazix', title: 'The Voidreaver'},
      { championId: 203, championName: 'Kindred', title: 'The Eternal Hunters'},
      { championId: 96, championName: 'KogMaw', title: 'The Mouth of the Abyss'},
      { championId: 7, championName: 'Leblanc', title: 'The Deceiver'},
      { championId: 64, championName: 'LeeSin', title: 'The Blind Monk'},
      { championId: 89, championName: 'Leona', title: 'The Radiant Dawn'},
      { championId: 127, championName: 'Lissandra', title: 'The Ice Witch'},
      { championId: 236, championName: 'Lucian', title: 'The Purifier'},
      { championId: 117, championName: 'Lulu', title: 'the Fae Sorceress'},
      { championId: 99, championName: 'Lux', title: 'The Lady of Luminosity'},
      { championId: 54, championName: 'Malphite', title: 'Shard of the Monolith'},
      { championId: 90, championName: 'Malzahar', title: 'The Prophet of the Void'},
      { championId: 57, championName: 'Maokai', title: 'The Twisted Treant'},
      { championId: 11, championName: 'MasterYi', title: 'The Wuju Bladesman'},
      { championId: 21, championName: 'MissFortune', title: 'The Bounty Hunter'},
      { championId: 82, championName: 'Mordekaiser', title: 'the Iron Revenant'},
      { championId: 25, championName: 'Morgana', title: 'Fallen Angel'},
      { championId: 267, championName: 'Nami', title: 'The Tidecaller'},
      { championId: 75, championName: 'Nasus', title: 'The Curator of the Sands'},
      { championId: 111, championName: 'Nautilus', title: 'The Titan of the Depths'},
      { championId: 76, championName: 'Nidalee', title: 'The Bestial Huntress'},
      { championId: 56, championName: 'Nocturne', title: 'The Eternal Nightmare'},
      { championId: 20, championName: 'Nunu', title: 'The Yeti Rider'},
      { championId: 2, championName: 'Olaf', title: 'The Berserker'},
      { championId: 61, championName: 'Orianna', title: 'The Lady of Clockwork'},
      { championId: 80, championName: 'Pantheon', title: 'The Artisan of War'},
      { championId: 78, championName: 'Poppy', title: 'Keeper of the Hammer'},
      { championId: 133, championName: 'Quinn', title: 'Demacia\'s Wings'},
      { championId: 33, championName: 'Rammus', title: 'the Armordillo'},
      { championId: 421, championName: 'RekSai', title: 'The Void Burrower'},
      { championId: 58, championName: 'Renekton', title: 'The Butcher of the Sands'},
      { championId: 107, championName: 'Rengar', title: 'The Pridestalker'},
      { championId: 92, championName: 'Riven', title: 'The Exile'},
      { championId: 68, championName: 'Rumble', title: 'The Mechanized Menace'},
      { championId: 13, championName: 'Ryze', title: 'The Rogue Mage'},
      { championId: 113, championName: 'Sejuani', title: 'The Winter\'s Wrath'},
      { championId: 35, championName: 'Shaco', title: 'the Demon Jester'},
      { championId: 98, championName: 'Shen', title: 'The Eye of Twilight'},
      { championId: 102, championName: 'Shyvana', title: 'The Half-Dragon'},
      { championId: 27, championName: 'Singed', title: 'The Mad Chemist'},
      { championId: 14, championName: 'Sion', title: 'The Undead Juggernaut'},
      { championId: 15, championName: 'Sivir', title: 'The Battle Mistress'},
      { championId: 72, championName: 'Skarner', title: 'The Crystal Vanguard'},
      { championId: 37, championName: 'Sona', title: 'Maven of the Strings'},
      { championId: 16, championName: 'Soraka', title: 'The Starchild'},
      { championId: 50, championName: 'Swain', title: 'The Master Tactician'},
      { championId: 134, championName: 'Syndra', title: 'The Dark Sovereign'},
      { championId: 223, championName: 'TahmKench', title: 'The River King'},
      { championId: 163, championName: 'Taliyah', title: 'The Stoneweaver'},
      { championId: 91, championName: 'Talon', title: 'The Blade\'s Shadow'},
      { championId: 44, championName: 'Taric', title: 'The Shield of Valoran'},
      { championId: 17, championName: 'Teemo', title: 'The Swift Scout'},
      { championId: 412, championName: 'Thresh', title: 'The Chain Warden'},
      { championId: 18, championName: 'Tristana', title: 'The Yordle Gunner'},
      { championId: 48, championName: 'Trundle', title: 'The Troll King'},
      { championId: 23, championName: 'Tryndamere', title: 'The Barbarian King'},
      { championId: 4, championName: 'TwistedFate', title: 'The Card Master'},
      { championId: 29, championName: 'Twitch', title: 'the Plague Rat'},
      { championId: 77, championName: 'Udyr', title: 'The Spirit Walker'},
      { championId: 6, championName: 'Urgot', title: 'The Headsman\'s Pride'},
      { championId: 110, championName: 'Varus', title: 'The Arrow of Retribution'},
      { championId: 67, championName: 'Vayne', title: 'The Night Hunter'},
      { championId: 45, championName: 'Veigar', title: 'The Tiny Master of Evil'},
      { championId: 161, championName: 'Velkoz', title: 'The Eye of the Void'},
      { championId: 254, championName: 'Vi', title: 'The Piltover Enforcer'},
      { championId: 112, championName: 'Viktor', title: 'The Machine Herald'},
      { championId: 8, championName: 'Vladimir', title: 'The Crimson Reaper'},
      { championId: 106, championName: 'Volibear', title: 'the Thunder\'s Roar'},
      { championId: 19, championName: 'Warwick', title: 'The Blood Hunter'},
      { championId: 62, championName: 'MonkeyKing', title: 'The Monkey King'},
      { championId: 101, championName: 'Xerath', title: 'The Magus Ascendant'},
      { championId: 5, championName: 'XinZhao', title: 'The Seneschal of Demacia'},
      { championId: 157, championName: 'Yasuo', title: 'The Unforgiven'},
      { championId: 83, championName: 'Yorick', title: 'The Gravedigger'},
      { championId: 154, championName: 'Zac', title: 'The Secret Weapon'},
      { championId: 238, championName: 'Zed', title: 'the Master of Shadows'},
      { championId: 115, championName: 'Ziggs', title: 'The Hexplosives Expert'},
      { championId: 26, championName: 'Zilean', title: 'The Chronokeeper'},
      { championId: 143, championName: 'Zyra', title: 'Rise of the Thorns'}
    ];
  }

  onSearchSummonerSuccess(summonerData) {
    this.summonerNameValidationState = 'has-success';
    this.helpBlock = summonerData.message;
    this.showChampions = false;
    console.log(this.helpBlock);
    console.log('SUMMONER DATAAAAAAAAAAAAAAA');
    console.log(summonerData.summoner);
    console.log(summonerData.summoner.championsS6);
    console.log(summonerData.profileIconId);
    this.championsArray = summonerData.summoner.championsS6;
    this.profileIconId = summonerData.profileIconId;
    this.apiSummonerName = summonerData.summoner.summonerName;
    this.summonerName = '';
    toastr.info(summonerData.message);

    for(var i = 0; i < this.champions.length; i ++){
      this.champions[i].activeChampion = false;
    }
  }

  onSearchSummonerFail(errorMessage) {
    this.summonerNameValidationState = 'has-error';
    this.helpBlock = errorMessage;
    this.showChampions = true;
    toastr.error(errorMessage);
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

  onSendChampionData(championData){
    console.log('CHAMPION STORE');
    console.log(this.ChampionStore);
    console.log(championData.currentChampion);
    this.ChampionStore.currentChampion = championData.currentChampion;
    this.currentChampion = championData.currentChampion;
    this.champion = championData.champion;

    console.log('CHAMPION HODOR HODOR HODOR');
    console.log(this.champion);
  }
}

export default alt.createStore(HomeStore);