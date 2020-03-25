//DEPENDENCIES
import React, {useState} from 'react';

//REDUX DEPENDENCIES
import { connect } from 'react-redux';
import { setGrid } from '../redux/actions/action';
const mapDispatchToProps = {
    setGrid
};

const mapStateToProps = (state) => {
    return({
        gridNum: state.gridNum
    })
}

const Form = (props) => {
    const [gridNum, setGridNum] = useState(0);
    return(
        <div id="grid-input">
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
                    props.setGrid(e.target.value);
                }}
            />
        </div>
    )
};


export default connect(mapStateToProps, mapDispatchToProps)(Form);