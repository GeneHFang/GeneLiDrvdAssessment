import React from 'react';

//REDUX DEPENDENCIES
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
    return({
        topColor: state.topColor,
        topShape: state.topShape,
        bottomColor: state.bottomColor,
        bottomShape: state.bottomShape
    })
}

const Piece = (props) => {

    //DETERMINE SHAPE OF PIECES BASED ON USER SELECTION
    const shape = (topOrBottom) => {
        let shapeKey = topOrBottom+"Shape";
        let colorKey = topOrBottom+"Color";

        switch (props[shapeKey]){
            //TRIANGULAR SHAPE RESTS ON BOTTOM OF CELL
            case "triangle":
                return( <div className='triangle' style={{ borderBottom: `40px solid ${props[colorKey]}` }}/> );
            
            //SQUARE IS CENTERBOUND, LIKE CIRCLE
            case "square":
                return( <div className='square' style={{ background: props[colorKey] }}/> );
            
            //DEFAULT SHAPE IS CIRCLE
            default:
                return( <div className='circle' style={{ background: props[colorKey] }} /> );
        }
    }

    return(
        <div className="piece">
            {shape(props.color)}
        </div>
    );
};

export default connect(mapStateToProps)(Piece);