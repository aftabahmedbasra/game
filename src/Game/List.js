import React from 'react';

class List extends React.Component{

    getCardContent = (card, isShowable) => {
            let imageId =  isShowable ? `${card.number}${card.suite}` : `green_back`;

            return <img src={`cards/${imageId}.png`} /> 
    }

    printPlayerCards = () => {
        return this.props.players.map((card, index) => {
            let top = index*40;
            let showable = () => <div style={{top: top}} className="card" key={card.id}>{ this.getCardContent(card, 1) }</div>
            let clickableHidden = () => <div style={{top: top}} onClick={() => this.props.nextPlayer(card)} className="card" key={card.id}>{this.getCardContent(card, 0)}</div>
            let clickableShowable = () => <div style={{top: top}} onClick={() => this.props.nextPlayer(card)} className="card" key={card.id}>{ this.getCardContent(card, 1)}</div>
            let simpleHidden = ()=> <div style={{top: top}} className="card" key={card.id}>{this.getCardContent(card, 0)}</div>

            if(this.props.isClickable && this.props.isShowable){
                return clickableShowable();
            }else if (this.props.isClickable){
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
