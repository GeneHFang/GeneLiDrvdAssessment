//REACT DEPENDENCIES
import React, { useEffect } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

//LOCAL DEPENDENCIES
import Cell from '../components/Cell';

//REDUX DEPENDENCIES
import { connect } from 'react-redux';
import { setGrid, setGridNum, setPieceColor, setPieceShape, toggleClick, storePieceInfo, setTurn } from '../redux/actions/action';
const mapStateToProps = (state) => {
    return({
        grid: state.grid,
        gridNum: state.gridNum,
        topColor: state.topColor,
        bottomColor: state.bottomColor,
        persistedState: state.persistedState,
        save: state.save,
        clicked: state.clicked,
        hilightedPiece: state.hilightedPiece
    })
};
const mapDispatchToProps = {
    setGrid,
    setGridNum, 
    setPieceColor, 
    setPieceShape,
    toggleClick, 
    storePieceInfo, 
    setTurn
}

const GridContainer = (props) => {
    //LOCALLY KEEP TRACK OF WHICH CELL IS WHICH COLOR
    let black = true;
    console.log(props.persistedState);
    
    // CREATE GRID MATRIX BASED ON GRIDNUM
    useEffect( () => {
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
        props.setTurn('top');    
        props.setGrid(arr);
        
    }, [props.gridNum]);

    // ON FIRST LOAD CHECK IF USER HAS SAVE PERSISTED
    useEffect( () => {
        if (props.save.grid) {
            props.setGrid(props.save.grid);
            props.setGridNum(props.save.gridNum);
            props.setPieceColor(true, props.save.topColor);
            props.setPieceShape(true, props.save.topShape);
            props.setPieceColor(false, props.save.bottomColor);
            props.setPieceShape(false, props.save.bottomShape);
            if (props.clicked !== props.save.clicked) { props.toggleClick();}
            props.setTurn(props.save.turn)
            if (props.hilightedPiece.topOrBottom) {props.storePieceInfo(props.hilightedPiece.row, props.hilightedPiece.col, props.hilightedPiece.topOrBottom );}
        }
        else{
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
        }
    }, []);


    // //DEGUGGING
    // useEffect(()=>{
    //     console.log(props.grid)
    // }, [props.grid]);


    //CREATE GAME BOARD BASED ON GRID MATRIX
    const createBoard = () => {
        return props.grid.map((row, rowInd) => { 
            if (props.gridNum % 2 === 0 ) { black=!black } //OFFSET TO ACCOUNT FOR EVEN GRID DIMENSIONS
            return (
                <Row>
                    {createCells(row, rowInd)}
                </Row>
            )
        })
    }
    const createCells = (row, rowInd) => {
        return row.map((cell,colInd) => {
            let color = (black ? 'gray' : 'white'); //CHANGED 'black' TO 'gray' TO GIVE BLACK PIECES BETTER VISIBILITY
            black = !black;
            if (cell === "X" || cell === "+") {   
                    let pieceFlag = (cell === 'X' ? 'top' : 'bottom');
                    return (<Col> <Cell piece={pieceFlag} color={color} row={rowInd} col={colInd} /> </Col>);
                }
            else  { return (<Col> <Cell color={color} hilight={(cell === '/')} row={rowInd} col={colInd} /> </Col>); }
            })
    }

    return(
        <div id="grid">
            <Grid fluid >
                {createBoard()}
            </Grid>
        </div>
    )
}


export default connect(mapStateToProps,mapDispatchToProps)(GridContainer);