import React from 'react';

const Cell = (props) => {
    //BLANK DIV ACTS AS CELL
    return(
        <div className="cell" style={{backgroundColor:`${props.color}`}}>
        </div>
    )
}

export default Cell;