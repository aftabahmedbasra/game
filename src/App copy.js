import React from 'react';
import './App.css';
import PlayerList from './Game/PlayerList';
class App extends React.Component {

  state = {
    playerNames: ['Ahmed', 'Moazzam', 'Abrar', 'Aftab'],
    players: [1, 2, 3, 4],
    cards: [],
    playerCards: [],
    cardNames: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
    suites: ['hearts','diamonds','spades','clubs'],
    currentPlayer: 0,
    nextPlayer: 0,
    hiddenCard: '',
    playersStatus: [0, 0, 0, 0],
  }

  componentDidMount(){
    this.getCards();
  }

  componentDidUpdate() {
    // this.dispatchCards();
  }

  getCurrentPlayer = () => {
    return this.state.currentPlayer;
  }

  getNextPlayerId = () => {
    return this.state.nextPlayer;
  }

  getPlayerCards = (playerId) => {
    return this.state.playerCards[playerId].filter((value) => (value !== 0));
  }

  getTotalPlayers = () => {
    return this.state.players.length - 1;
  }

  getNextPlayer = (playerId) => {
    return ((playerId + 1) > this.getTotalPlayers()) ? 0 : playerId + 1;
  }

  getPreviousPlayer = (playerId) => {
    return ((playerId - 1) < 0) ? this.getTotalPlayers() : playerId - 1;
  }

  storeHidden = () => {
    let allCards = this.state.cards;
    var currentIndex = allCards.length, randomIndex;
    randomIndex = Math.floor(Math.random() * currentIndex);

    let hiddenCard = this.state.cards[randomIndex];
    this.state.cards.splice(randomIndex, 1);

    this.setState({
      hiddenCard: hiddenCard,
      cards: this.state.cards
    });

  }

  getCards = () => {
    var cards = [];
      let count=0;
      for( var n = 0; n < this.state.cardNames.length; n++ ) {
        for( var s = 0; s < this.state.suites.length; s++ ) {
              cards.push( {
                number: this.state.cardNames[n],
                suite : this.state.suites[s],
                id: count++
              });
          }
      }
      this.setState({
        cards: cards
      }, () => {
        this.storeHidden()
        this.cardsDistribution();
      });
  }

  shuffle() {
    let allCards = this.state.cards;
    var currentIndex = allCards.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = allCards[currentIndex];
      allCards[currentIndex] = allCards[randomIndex];
      allCards[randomIndex] = temporaryValue;
    }
  
    return allCards;
  }

  cardsDistribution = () => {
    let shuffledCards = this.shuffle();
    let playerCards = [],
      point = 0,
      onePlayerCards = shuffledCards.length / this.state.players.length;
    for(let i=0; i<this.state.players.length; i++){
      playerCards[i] = shuffledCards.slice(point, onePlayerCards+point);
      point += onePlayerCards;
    }

    this.setState({
      playerCards: playerCards
    });
  }  

  dispatchCards = () => {
    let memorize = [];

    for(let i=0; i<this.state.playerCards.length; i++){
      let playerCards = this.getUnique(this.getPlayerCards(i));
      memorize.push(playerCards);
    }

    this.setState({
      playerCards: memorize
    }, () => {
      this.checkResults();
      this.decideNextPlayer();
    });
  }

  getUnique = (arr) => {

    let count = 1;
    for(let i=0; i<arr.length; i++){

      count = 1;
      for(let j=i+1; j<arr.length; j++){
        if((arr[i] !== 0) && (arr[i].number === arr[j].number)){
          count++;
        }

        if(count === 2){
          arr[i] = arr[j] = count = 0;
        }
      }

    }
    
    return arr.filter((item, index) => (item !== 0))
  }

  nextPlayer = (card) => {

    let currentPlayerId = this.getNextPlayer(this.getCurrentPlayer());
    let currentPlayer = this.getPlayerCards(currentPlayerId);

    if(!currentPlayer.length){
        this.setState({
          currentPlayer: this.state.currentPlayer+1
        }, () => {
          this.nextPlayer(card);
        })
    }

    this.setState({
      currentPlayer: currentPlayerId,
      nextPlayer: this.getNextPlayer(currentPlayerId)
    }, () => {
      this.nextMove(card);
    });
  }

  nextMove = (card, npInc = 0, cpInc = 0) => {

    let currenctPlayerId = this.getPreviousPlayer(this.getCurrentPlayer());
    let nextPlayerId = this.getCurrentPlayer();
    if(npInc){
      nextPlayerId = this.getNextPlayer(this.getNextPlayerId());
      this.setState({
        nextPlayer: nextPlayerId
      });
    }

    console.log(currenctPlayerId, nextPlayerId);

    let players = this.state.playerCards;
    let currentPlayer = this.getPlayerCards(currenctPlayerId),
      nextPlayer = this.getPlayerCards(nextPlayerId);
    if(!nextPlayer.length){
      this.nextMove(card, 1);
    }
    nextPlayer.push(card);
    
    players[currenctPlayerId] = currentPlayer.filter((value) => (value.id !== card.id));
    players[nextPlayerId] = nextPlayer;
    
    this.setState({
        playerCards: players
    }, () => {
      this.dispatchCards();
      this.checkResults();
    });
  }

  checkResults = () => {
    let player = this.getPlayerCards(this.getCurrentPlayer()).filter((value) => (value !== 0));
    if(!player.length){

      let playerStatuses = this.state.playersStatus;
      playerStatuses[this.getCurrentPlayer()] = 1;

      this.setState({
        currentPlayer: this.getNextPlayer(this.getCurrentPlayer()),
        playersStatus: playerStatuses
      }, () => {
      })
    }
  }

  decideNextPlayer = () => {

    if(this.state.playersStatus[this.getCurrentPlayer()]) {
        this.setState({
          currentPlayer: this.getNextPlayer(this.getCurrentPlayer())
        }, () => {
          this.decideNextPlayer()
        })
    }
  }

  decideWinner = () => {
  }

  render(){

      return <>
        <PlayerList List={this.state} nextPlayer={this.nextPlayer} />
        <button onClick={() => this.dispatchCards()}>Start Game</button>
        <button onClick={() => this.nextPlayer()}>Next Move</button>
      </>
  }
}

export default App;

