//REACT DEPENDENCIES
import React, {useState} from 'react';

//REDUX DEPENDENCIES
import { connect } from 'react-redux';
import { setGridNum, setPieceColor, setPieceShape, setGrid, setTurn } from '../redux/actions/action';
const mapDispatchToProps = {
    setGridNum,
    setPieceColor,
    setPieceShape,
    setGrid,
    setTurn

};
const mapStateToProps = (state) => {
    return({
        gridNum: state.gridNum,
        topColor: state.topColor,
        bottomColor: state.bottomColor,
        topShape: state.topShape,
        bottomShape: state.bottomShape,
        turn: state.turn
    });
};

const Form = (props) => {
    //LOCAL STATE
    const [gridNum, setGridNum] = useState(0);
    const [topOrBottom, setTopOrBottom] = useState("top");

    //DETERMINES WHETHER RADIO SHOULD BE SELECTED BASED ON STATE
    const determineChecked = (colorOrShape, type) => {
        if (topOrBottom === "top") {
            return (type === "color" 
                    ? colorOrShape === props.topColor
                    : colorOrShape === props.topShape
                );
        }
        else {
            return (type === "color" 
                    ? colorOrShape === props.bottomColor
                    : colorOrShape === props.bottomShape
                );
        }
    }

    //EVENT HANDLERS FOR RADIO BUTTONS
    const handleRadioColor = (e) => {
        props.setPieceColor(topOrBottom==="top", e.target.value)
    }
    const handleRadioShape = (e) => {
        props.setPieceShape(topOrBottom==="top", e.target.value)
    }

    //RESETS BOARD
    const boardReset = () => {
        let arr = [];
        for (var i = 0 ; i < props.gridNum ; i++)
        {
            let row = [];
            for (var j = 0; j < props.gridNum ; j++)
            {
                if (i<2) { row.push("X"); }
                else if (i > props.gridNum-3 ) { row.push("+"); }
                else { row.push("O"); }
            }
            arr.push(row);
        }    
        props.setGrid(arr);
        props.setTurn('top');
    }

    return(
        <div id="grid-input">
            <p>Current Turn : {props.turn}</p>
            <p>Input Cell Number</p>
            {(gridNum < 5 || gridNum > 20)
                ? <p style={{color:'red', fontSize:'12px'}}>Please enter a valid number (5-20)</p>
                : null}
            <input 
                id="grid-num"
                type="text"
                style={(gridNum >= 5 && gridNum <= 20 
                            ? {borderColor: 'green'}
                            : {borderColor: 'red'}) }  
                onChange={e=>{
                    setGridNum(e.target.value);
                    props.setGridNum(e.target.value);
                }}
            />
            <p>Select player</p>
            <select id="select-player" onChange={e=>setTopOrBottom(e.target.value)}>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
            </select>

            <p>Set color for {topOrBottom} player</p>
                <input
                    type="radio"
                    value="red"
                    name="color"
                    onChange={handleRadioColor}
                    checked={determineChecked('red','color')}
                    /> Red
                <input
                    type="radio"
                    value="blue"
                    name="color"
                    onChange={handleRadioColor}
                    checked={determineChecked('blue','color')}
                    /> Blue
                <input
                    type="radio"
                    value="black"
                    name="color"
                    onChange={handleRadioColor}
                    checked={determineChecked('black','color')}
                    /> Black

            <p>Set shape for {topOrBottom} player</p>
                <input
                    type="radio"
                    value="circle"
                    name="shape"
                    onChange={handleRadioShape}
                    checked={determineChecked('circle','shape')}
                    /> Circle
                <input
                    type="radio"
                    value="triangle"
                    name="shape"
                    onChange={handleRadioShape}
                    checked={determineChecked('triangle','shape')}
                    /> Triangle
                <input
                    type="radio"
                    value="square"
                    name="shape"
                    onChange={handleRadioShape}
                    checked={determineChecked('square','shape')}
                    /> Square

                <div className="button"><button onClick={boardReset}>Reset Board</button></div>
        </div>
    )
};


export default connect(mapStateToProps, mapDispatchToProps)(Form);