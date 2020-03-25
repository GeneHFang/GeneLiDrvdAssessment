import React from 'react';
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
    return(
        <div id="grid-input">
            <p>Input Cell Number</p>
            <input 
                id="grid-num"
                type="text" 
                value={props.gridNum} 
                onChange={e=>{
                    props.setGrid(e.target.value)
                }}
            />
        </div>
    )
};


export default connect(mapStateToProps, mapDispatchToProps)(Form);