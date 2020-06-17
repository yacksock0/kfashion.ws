import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {Button, Container, Grid, TextField, Typography} from "@material-ui/core";
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
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolbar: {
        width: '100%',
    },
    content:{
        marginTop: 20,
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
function createStyleData(label, main, cm) {
    return { label, main, cm};
}

const ItemRows = [
    createData('소매길이', <FormControlLabel value="male" control={<Radio />}  />),
    createData('의상길이', <FormControlLabel value="male" control={<Radio />} />),
];

const styleRows = [
    createStyleData('sleeve(소매길이)', ),
    createStyleData('chest(가슴둘레)',),
    createStyleData('Length(총 기장)',),
    createStyleData('shoulder(어깨너비)'),

];

class Step3 extends React.Component {
    componentDidMount() {
        this.props.enqueueSnackbar("Step3", {
            variant: 'info'
        });
    }


    render() {
        const {classes} = this.props;

            return (
                <Container component="main" className={classes.mainContainer}>
                    <div className={classes.appBarSpacer}/>
                    <div className={classes.mainContent}>
                        <Typography variant="h2" component="h2">
                            전문정보 입력
                        </Typography>


                        <Grid container spacing={2} >
                            <Grid item xs={7} align-items-xs-center>
                                <img src="https://placeimg.com/500/800/any"></img>
                            </Grid>
                            <Grid item xs={5}>
                                <div className={classes.content}>
                                    <Typography variant="h5" component="h5">
                                        카테고리
                                    </Typography>
                                    <div>
                                        <hr></hr>
                                    </div>
                                    <FormControl component="fieldset">
                                        <RadioGroup row aria-label="gender" name="gender">
                                            <FormControlLabel value="male" control={<Radio/>} label="Male" checked={true}/>

                                            <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                                            <FormControlLabel value="unisex" control={<Radio/>} label="Unisex"/>
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div className={classes.content}>
                                    <Typography variant="h5" component="h5">
                                        색상
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
                                    <Typography variant="h5" component="h5">
                                        clothes standard
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
                                                <TableCell> <TextField id="length"
                                                                       name="length"
                                                                       label={row.label}
                                                                       variant="outlined"
                                                                       margin="normal"
                                                                       // value={}
                                                                       onChange={this.handleChangeId}
                                                                       required fullWidth /></TableCell>
                                                <TableCell>{row.sub}</TableCell>
                                            </TableRow>
                                        ))}
                                    </Table>
                                </div>
                                <Grid container spacing={3} row>
                                    <Grid item xs={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                의상길이
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
                                            <Typography variant="h5" component="h5">
                                              프린트
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
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={<Checkbox name="checkedA"/>}
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
                        onClick={this.handleSubmitForm}>
                        Previous
                    </Button>
                    <Button
                        type="submit"
                        className={classes.buttonType1}
                        variant="outlined"
                        onClick={this.handleSubmitForm}>
                        Next
                    </Button>
                    <Button
                        type="submit"
                        className={classes.buttonType2}
                        color="primary"
                        variant="outlined"
                        onClick="/home">
                        Save and Next
                    </Button>
                </Container>
            );
        }

    };

export default withSnackbar(withRouter(withStyles(styles) (Step3)));