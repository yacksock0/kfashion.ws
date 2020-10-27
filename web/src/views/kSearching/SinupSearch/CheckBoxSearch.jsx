import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    checkedstyle:{
        fontFamily:'NotoSansCJKkr',
        marginBottom:20,
        cursor: 'pointer',
    },
    txtstyle: {
        fontSize:'15px',
    }
}));

export default function CheckBox({name, value, tick, onCheck}) {

    const classes = useStyles();
      return (
        <div className="checkbox2">
            <label>
                <br />
                <input
                    name={name}
                    type="checkbox"
                    value={value}
                    checked={tick || false}
                    onChange={onCheck} 
                    className={classes.checkedstyle}
                    id="checkicon"
                />
                <em></em><span className={classes.checkedstyle}>{value}</span> 
            </label> 
        </div>     
      );
  }