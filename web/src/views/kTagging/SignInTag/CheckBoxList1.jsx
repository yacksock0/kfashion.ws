import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CheckBox from './CheckBox';
import Paper from '@material-ui/core/Paper';
import Modal1 from './Modal1';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign:'left',
        marginTop:5,
    },
    paperin:{
        display:'flex',
        justifyContent:'space-between',
    },
    modalstyle:{
        display:'flex',
        flexDirection:'column',
        marginTop:60,
    },
}));


export default function CheckBoxList1 ({options, isCheckedAll, onCheck}) {
    const classes = useStyles();

    const checkBoxOptions = (
        <div>
            {options.map((option, index) => {
                return (
                    <CheckBox
                      key={index}
                      name={option.name}
                      value={option.value}
                      tick={option.checked}
                      onCheck={(e) => onCheck(option.value, e.target.checked)}                    
                    />
                );
            })}
        </div>
    );

    return (
        <div className={classes.root}>
            
            <CheckBox
            name="select-all"
            value=" 모두 동의합니다"
            tick={isCheckedAll}
            onCheck={(e) => onCheck('all', e.target.checked)}
            />
            <Paper elevation={0} className={classes.paperin}>
                <Paper elevation={0}>
                {checkBoxOptions}
                </Paper>
                <Paper elevation={0} className={classes.modalstyle}>
                    <Modal1 /><br/>
                    {/* <Modal1 /> */}
                </Paper>
            </Paper>
        </div>
    );
}