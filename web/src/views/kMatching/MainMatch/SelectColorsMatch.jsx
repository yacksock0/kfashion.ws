import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Paper from '@material-ui/core/Paper';
import checkBoxBlack from '../../../images/CheckBoxBlack.png';

const style = theme => ({
    paper: {
        display: 'flex',
        flexWrap: 'wrap',

        "& .MuiToggleButton-root": {
            width: '24px',
            height: '24px',
            cursor: 'pointer',
            margin:'0 4px 4px 0',
            border:'1px solid #999',
            transition:'all 0.5s ease-out',
            position:'relative',
            
            '&:not(:first-child)': {
                borderRadius: 0,
            },
            '&:first-child': {
                borderRadius: 0,
            },
        },
        // "& .Mui-selected": {
        //     transform:'scale(1.4)',
        // }
    },
    imgicon: {
        position:'absolute',
        bottom:0,
        right:0,
    },
});


class ImageUploadTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newColor : "",
        }
    }
    colors = [
        '#ffffff', '#9c9c9b', '#000000', '#9c2336', '#e80416', '#d74061', '#df1895',
        '#f7119e', '#ffa3b6', '#dca69c', '#faab8d', '#ed6859', '#fe7c00', '#e44a56',
        '#feffef', '#f9e17d', '#fbea2b', '#f0b325', '#d4ed16', '#8bc501', '#87d8ca',
        '#2aac14', '#7a863c', '#5b5a3a', '#1d4221', '#5bc1e7', '#0280ee', '#241efc',
        '#001f62', '#7d004c', '#a77bca', '#4e086c', '#b7523e', '#be4d00', '#a17400',
        '#d79a2f', '#c9b495', '#e8c381'

    ];

    handleSeasons = (event, newColor) => {
        this.setState({newColor : newColor});
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Paper elevation={0} className={classes.paper}>
                    <ToggleButtonGroup
                        value={this.state.newColor}
                        exclusive
                        onChange={this.handleSeasons}
                        aria-label="text newColor"
                        style={{ display: 'flex',  flexWrap:'wrap',}}
                    >
                        {this.colors.map(color => (
                            <ToggleButton
                                key={color}
                                style={{
                                    background: color,
                                }}
                                value={color}
                            >
                                {this.state.newColor === color &&
                                    <img src={checkBoxBlack} className={classes.imgicon} alt="색상선택"/>
                                }
                            </ToggleButton>

                        ))}
                    </ToggleButtonGroup>
                </Paper>
            </div>
        );
    }
};

export default withStyles(style)(ImageUploadTag);

