import React from 'react';

class List extends React.Component{

    printPlayerCards = () => {
        return this.props.players.map((card) => {
            let showable = () => <div className="card" id={card.id} key={card.id}>{ `${card.number} ${card.suite}`}</div>
            let clickableHidden = () => <div onClick={() => this.props.nextPlayer(card)} className="card" key={card.id}>Hidden Card</div>
            let simpleHidden = ()=> <div className="card" id={card.id} key={card.id}>Hidden Card</div>

            if(this.props.isClickable){
                return clickableHidden();
            }else if (this.props.isShowable){
                return showable();
            }else{
                return simpleHidden();
            }
                        
        });

    }
    
    render() {
        return  <div className="players-cards" >
                {this.props.players ? this.printPlayerCards() : ''}
            </div>
    }

}

export default List; 
