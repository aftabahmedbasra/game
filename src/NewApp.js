import React from 'react';
// import { Container, Row, Col, Button } from 'reactstrap';
import './App.css';

class App extends React.Component {

  constructor(){
    super();
    console.log('cons');

    this.state = {
      names: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
      suits: ['hearts','diamonds','spades','clubs'],
      players: [1, 2, 3, 4],
      playerNames: ['Ahmed', 'Moazzam', 'Abrar', 'Aftab'],
      cards: [],
      playerCards: []
    }

    this.names= ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.suits= ['hearts','diamonds','spades','clubs'];
    this.players= [1, 2, 3, 4];
    this.playerNames= ['Ahmed', 'Moazzam', 'Abrar', 'Aftab'];
    this.cards= [];
    this.playerCards= [];
    this.getCards();
    this.cardsDistribution();
  }

  componentDidMount() {
    console.log('mount');
    // this.getCards();
    // this.cardsDistribution();
    // this.startGaming();
  }

  componentDidUpdate(){
    // this.getCards();
    // this.cardsDistribution();
    // this.startGaming();
  }

  getCards = () => {
    let names = this.state.names;
    let suits = this.state.suits;
    var newCard = [];
      for( var s = 0; s < suits.length; s++ ) {
          for( var n = 0; n < names.length; n++ ) {
            newCard.push( {
                number: n+1,
                name : names[n],
                suite : suits[s],
                id: n
              });
          }
      }
      this.setState({
        cards: newCard
      });
      this.cards = newCard;
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
    },() => {
      // console.log(this.state);
    });
    this.playerCards = playerCards;
    
  }  

  getPlayerCards = () => {
    return this.state.playerCards;
  }

  shuffle() {
    let array = this.state.cards;
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  onePlayerCards = (i) => {
    console.log(this.playerCards);
    return this.playerCards[i].map((v) => {
      return <div>{v.number} {v.suite}</div>
    })
  }

  startGaming = () => {
    
      let players = this.players.map((v) => {
        return <li key={v}>
          <h3>{this.playerNames[v-1]}</h3>
          {this.onePlayerCards(v-1)}
        </li>
      });
    
    
    return <div>

      <h2>Total Players : </h2>
      <ul className="players">{players}</ul>

      
      <button> Start Game</button>
      <button> Shuffle Again</button>
    </div>
  }

  render(){
    
    let game = this.startGaming();
    return <div>{game}</div>
  }
}

export default App;
