import React, { Component } from 'react'
import { withStyles  } from '@material-ui/core/styles';
import { ReactComponent as LogoDailyCody} from '../../images/LogoDailyCody.svg';
import Typography from '@material-ui/core/Typography';

const style = theme => ({
    root: {
        margin:'70px auto',
    },
    textstyle: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        color:'#4e4873',
        marginTop:20,
    },

});

class HeaderMatch extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <LogoDailyCody />
                <Typography className={classes.textstyle}>내 옷과 어울리는 패션아이템을 추천해드립니다.</Typography>
            </div>
        )
    }
}

export default withStyles(style)(HeaderMatch);
