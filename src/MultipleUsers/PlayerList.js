import React from 'react';
import List from './List';

class PlayerList extends React.Component{
    render(){
        let parentState = this.props.List;
        let players = parentState.players.map((v) => {
            let isCurrentPlayer = parentState.currentPlayer === v-1 ? true: false;
            let isNextPlayer = parentState.nextPlayer === v-1 ? true: false;

            let playerClass = 'simple';
            if(isCurrentPlayer){
                playerClass = "active";
            }else if(isNextPlayer){
                playerClass = "next";
            }
            return <li className={ playerClass} key={v}>
                <h3>{parentState.playerNames[v-1]}</h3>
                <List players={parentState.playerCards[v-1]} isShowable={isNextPlayer} isClickable={isCurrentPlayer} parentState={parentState} nextPlayer={this.props.nextPlayer}/>
            </li>

        });


        return (
            <div className="players-list" >
                <h2>Players</h2>
                <ul className="players">
                    {players}
                </ul>
            
                
            </div>
        ); 
    }
}
export default PlayerList;