import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {Button, Container, Grid, Typography} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormGroup from '@material-ui/core/FormGroup';

const styles = theme => ({
    mainContainer: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolbar: {
        width: '100%',
    },
    content:{
        marginTop: 15,
        display: 'flex',
        flexDirection: 'column',
    },
    buttonType1:{
        width: 100,
        marginRight: theme.spacing(2),
    },
    buttonType2:{
        width: 150,
        float:'right',

    },
});
function createData(label, main) {
    return { label, main};
}
function createStyleData(label, main, sub) {
    return { label, main, sub};
}

const ItemRows = [
    createData('Frozen yoghurt', <FormControlLabel value="male" control={<Radio />}  />),
    createData('Ice cream sandwich', <FormControlLabel value="male" control={<Radio />} />),
];

const styleRows = [
    createStyleData('Frozen yoghurt', <FormControlLabel control={<Radio />} />, <FormControlLabel control={<Radio />} />),
    createStyleData('Ice cream sandwich', <FormControlLabel control={<Radio />} />, <FormControlLabel control={<Radio />} />),
];

class Step2 extends React.Component {
    componentDidMount() {
        this.props.enqueueSnackbar("Step2", {
            variant: 'info'
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                        <Typography variant="h4" component="h2">
                            기본정보 입력
                        </Typography>
                 <Grid container spacing={3}>
                     <Grid item xs={6}>
                         <img src="https://placeimg.com/500/800/any"></img>
                     </Grid>
                     <Grid item xs={6}>
                         <div className={classes.content} >
                         <Typography variant="h4" component="h2">
                             Gender
                         </Typography>
                             <div>
                                 <hr></hr>
                             </div>
                         <FormControl component="fieldset">
                             <RadioGroup row aria-label="gender" name="gender" >
                                 <FormControlLabel value="male" control={<Radio />} label="Male" />
                                 <FormControlLabel value="female" control={<Radio />} label="Female" />
                                 <FormControlLabel value="unisex" control={<Radio />} label="Unisex" />
                             </RadioGroup>
                         </FormControl>
                         </div>
                         <div className={classes.content}>
                         <Typography variant="h4" component="h2">
                             Item
                         </Typography>
                             <div>
                         <hr></hr>
                             </div>
                             <Table className={classes.table} size="small" aria-label="a dense table">
                                 <TableHead>
                                     <TableRow>
                                         <TableCell>Label</TableCell>
                                         <TableCell>Main</TableCell>
                                     </TableRow>
                                 </TableHead>
                                 {ItemRows.map((row) => (
                                     <TableRow key={row.label}>
                                         <TableCell>{row.label}</TableCell>
                                         <TableCell>{row.main}</TableCell>
                                     </TableRow>
                                 ))}
                             </Table>
                         </div>
                         <div className={classes.content}>
                             <Typography variant="h4" component="h2">
                                 Style
                             </Typography>
                             <div>
                                 <hr></hr>
                             </div>
                             <Table className={classes.table} size="small" aria-label="a dense table">
                                 <TableHead>
                                     <TableRow>
                                         <TableCell>Label</TableCell>
                                         <TableCell>Main</TableCell>
                                         <TableCell>Sub</TableCell>
                                     </TableRow>
                                 </TableHead>
                                 {styleRows.map((row) => (
                                     <TableRow key={row.label}>
                                         <TableCell>{row.label}</TableCell>
                                         <TableCell>{row.main}</TableCell>
                                         <TableCell>{row.sub}</TableCell>
                                     </TableRow>
                                 ))}
                             </Table>
                         </div>
                         <Grid container spacing={3} row>
                         <Grid item xs={6}>
                             <div className={classes.content}>
                                 <Typography variant="h4" component="h2">
                                     Color
                                 </Typography>
                                 <div>
                                     <hr></hr>
                                 </div>
                                 <Table className={classes.table} size="small" aria-label="a dense table">
                                     <TableHead>
                                         <TableRow>
                                             <TableCell>Label</TableCell>
                                             <TableCell>Main</TableCell>
                                         </TableRow>
                                     </TableHead>
                                     {ItemRows.map((row) => (
                                         <TableRow key={row.label}>
                                             <TableCell>{row.label}</TableCell>
                                             <TableCell>{row.main}</TableCell>
                                         </TableRow>
                                     ))}
                                 </Table>
                             </div>
                        </Grid>
                         <Grid item xs={6}>
                             <div className={classes.content}>
                                 <Typography variant="h4" component="h2">
                                     Pattern
                                 </Typography>
                                 <div>
                                     <hr></hr>
                                 </div>
                                 <Table className={classes.table} size="small" aria-label="a dense table">
                                     <TableHead>
                                         <TableRow>
                                             <TableCell>Label</TableCell>
                                             <TableCell>Main</TableCell>
                                         </TableRow>
                                     </TableHead>
                                     {ItemRows.map((row) => (
                                         <TableRow key={row.label}>
                                             <TableCell>{row.label}</TableCell>
                                             <TableCell>{row.main}</TableCell>
                                         </TableRow>
                                     ))}
                                 </Table>
                             </div>
                         </Grid>
                         </Grid>
                         <div className={classes.content}>
                         <FormGroup row >
                             <FormControlLabel
                                 control={<Checkbox name="checkedA" />}
                                 label="Not fashion Image"/>
                         </FormGroup>
                         </div>
                     </Grid>
                 </Grid>
                </div>
                <hr></hr>
                <Button
                    type="submit"
                    className={classes.buttonType1}
                    variant="outlined"
                    onClick={this.handleSubmitForm} >
                    Previous
                </Button>
                <Button
                    type="submit"
                    className={classes.buttonType1}
                    variant="outlined"
                    onClick={this.handleSubmitForm} >
                    Next
                </Button>
                <Button
                    type="submit"
                    className={classes.buttonType2}
                    color="primary"
                    variant="outlined"
                    onClick={this.handleSubmitForm} >
                    Save and Next
                </Button>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (Step2)));