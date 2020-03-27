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
let black = true;

class GridContainer extends React.Component {
    //LOCALLY KEEP TRACK OF WHICH CELL IS WHICH COLOR
    
    // CREATE GRID MATRIX BASED ON GRIDNUM
    componentDidUpdate =  (prevProps) => {
        if (prevProps.gridNum !== this.props.gridNum){

            let arr = [];
            for (var i = 0 ; i < this.props.gridNum ; i++)
            {
                let row = [];
                for (var j = 0; j < this.props.gridNum ; j++)
                {
                    if (i<2) { row.push("X"); }
                    else if (i > this.props.gridNum-3 ) { row.push("+"); }
                    else { row.push("O"); }
                }
                arr.push(row);
            }
            this.props.setTurn('top');    
            this.props.setGrid(arr);
        }
    };

    // ON FIRST LOAD, FETCH SAVED INFO FROM BACKEND, IF FAILED HYDRATES LOCAL REDUX SESSION IF USER HAS SAVE PERSISTED
    componentDidMount = () => {
        let uri = 'http://localhost:4000/board';
        fetch(uri)
            .then(res=>res.json())
            .then(data=> {
                if (data[0]){
                    this.props.setGrid(this.parseBoard(data[0].board, data[0].gridNum));
                    this.props.setGridNum(data[0].gridNum);
                    this.props.setPieceColor(true, data[0].topColor);
                    this.props.setPieceShape(true, data[0].topShape);
                    this.props.setPieceColor(false, data[0].bottomColor);
                    this.props.setPieceShape(false, data[0].bottomShape);
                    if (this.props.clicked !== data[0].clicked) { this.props.toggleClick();}
                    this.props.setTurn(data[0].turn)
                    if (data[0].hilightedPiece) {this.props.storePieceInfo(data[0].hilightedPiece.row, data[0].hilightedPiece.col, data[0].hilightedPiece.topOrBottom );}
                    console.log(data[0].board)
                }
                else {
                    if (this.props.save.grid) {
                    this.props.setGrid(this.props.save.grid);
                    this.props.setGridNum(this.props.save.gridNum);
                    this.props.setPieceColor(true, this.props.save.topColor);
                    this.props.setPieceShape(true, this.props.save.topShape);
                    this.props.setPieceColor(false, this.props.save.bottomColor);
                    this.props.setPieceShape(false, this.props.save.bottomShape);
                    if (this.props.clicked !== this.props.save.clicked) { this.props.toggleClick();}
                    this.props.setTurn(this.props.save.turn)
                    if (this.props.save.hilightedPiece.topOrBottom) {this.props.storePieceInfo(this.props.save.hilightedPiece.row, this.props.save.hilightedPiece.col, this.props.save.hilightedPiece.topOrBottom );}
                    }
                    else{
                    let arr = [];
                    for (var i = 0 ; i < this.props.gridNum ; i++)
                    {
                        let row = [];
                        for (var j = 0; j < this.props.gridNum ; j++)
                        {
                            if (i<2) { row.push("X"); }
                            else if (i > this.props.gridNum-3 ) { row.push("+"); }
                            else { row.push("O"); }
                        }
                        arr.push(row);
                    }    
                    this.props.setGrid(arr);
                    }
                }
            })
    };


    // //DEGUGGING
    // useEffect(()=>{
    //     console.log(this.props.grid)
    // }, [this.props.grid]);


    //PARSE BOARD STRING FROM BACKEND
    parseBoard = (boardString, gridNum) => {
        boardString = boardString.substring(1,boardString.length-1);
        
        let board = []
        let arr = boardString.split(',');
        arr.forEach((char, ind) => {
            if (char.includes('[')) { arr[ind] = char.replace('[', ''); }
            else if (char.includes(']')) { arr[ind] = char.replace(']',''); }
        });
        let i, k;
        for (i = 0, k = -1 ; i < arr.length; i++){
            if (i % gridNum === 0){
                k++;
                board[k] = [];
            }
            board[k].push(arr[i]);
        }
        console.log(board);
        return board;
    }


    //CREATE GAME BOARD BASED ON GRID MATRIX
    createBoard = () => {
        return this.props.grid.map((row, rowInd) => { 
            if (this.props.gridNum % 2 === 0 ) { black=!black } //OFFSET TO ACCOUNT FOR EVEN GRID DIMENSIONS
            return (
                <Row>
                    {this.createCells(row, rowInd)}
                </Row>
            )
        })
    }
    createCells = (row, rowInd) => {
        return row.map((cell,colInd) => {
            let color = (black ? 'gray' : 'white'); //CHANGED 'black' TO 'gray' TO GIVE BLACK PIECES BETTER VISIBILITY
            black = !black;
            if (cell === "X" || cell === "+" || cell === "Xh" || cell === "+h") {   
                    let pieceFlag = (cell === 'X' || cell === 'Xh' ? 'top' : 'bottom');
                    return (<Col> <Cell cell={cell} hilight={false} piece={pieceFlag} color={color} row={rowInd} col={colInd} /> </Col>);
                }
            else  { 
                return (<Col> <Cell color={color} hilight={(this.props.grid[rowInd][colInd]==='/')} row={rowInd} col={colInd} /> </Col>); }
            })
    }
    render = () => {

        return(
            <div id="grid">
            <Grid fluid >
                {typeof(this.props.grid) === 'object' 
                    ? this.createBoard()
                    : "Loading"}
            </Grid>
        </div>
        )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(GridContainer);