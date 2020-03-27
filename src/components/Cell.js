//REACT DEPENDENCIES
import React, { useEffect } from 'react';

//LOCAL DEPENDENCIES
import Piece from './Piece';

//REDUX DEPENDENCIES
import { connect } from 'react-redux';
import { movePiece, deHiLight, toggleClick, setTurn, storePieceInfo } from '../redux/actions/action';
const mapStateToProps = (state) => {
    return({
        hilightedPiece: state.hilightedPiece,
        grid: state.grid,
        turn: state.turn,
        clicked: state.clicked
    });
};
const mapDispatchToProps = {
    movePiece,
    deHiLight, 
    toggleClick, 
    setTurn,
    storePieceInfo,
}

const Cell = (props) => {

    //DEHILIGHTS PIECES WHEN TURNS CHANGE
    useEffect(()=>{
        if (props.clicked) props.toggleClick()
    },[])

    //CLICK HANDLER, ONLY FUNCTIONS IF CELL IS HILIGHTED BY SELECTING PIECE
    const  movePiece =  (e) => {
        if(props.hilight){
            props.deHiLight(props.grid);
            props.movePiece(props.row, props.col, props.hilightedPiece, props.grid);
            if (props.clicked) { props.toggleClick(); }
            props.setTurn((props.hilightedPiece.topOrBottom === 'top' ? 'bottom' : 'top'));
            props.storePieceInfo();
        }
    }

    return(
        <div dataValue={props.hilight} className="cell" style={{backgroundColor:`${props.color}`}} onClick={movePiece}>
            {props.piece
             ? <Piece cell={props.cell} color={props.piece} row={props.row} col={props.col} />
             : null}
            {props.hilight
             ?  <div className="hilight"/> 
             : null}
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Cell);