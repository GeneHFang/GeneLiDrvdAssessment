//REACT DEPENDENCIES
import React from 'react';

//LOCAL DEPENDENCIES
import Piece from './Piece';


const Cell = (props) => {
    return(
        <div className="cell" style={{backgroundColor:`${props.color}`}}>
            {props.piece
             ? <Piece color={props.piece}/>
             : null}
        </div>
    )
}

export default Cell;