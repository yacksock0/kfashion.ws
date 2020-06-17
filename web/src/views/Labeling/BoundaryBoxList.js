import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {Button, Container, Grid, Typography} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import FormGroup from '@material-ui/core/FormGroup';
import Customer from './ListTable'
import Paper from '@material-ui/core/Paper';

const customers = [
    {
        'id': 1,
        'image': 'https://placeimg.com/48/48/1',
        'name': '홍길동',
        'date': '200428',
        'step': 'step1'
    },
    {
        'id': 2,
        'image': 'https://placeimg.com/48/48/2',
        'name': '나동빈',
        'date': '200516',
        'step': 'step2'
    },
    {
        'id': 3,
        'image': 'https://placeimg.com/48/48/3',
        'name': '이순신',
        'date': '200614',
        'step': 'step3'
    }
]


const styles = theme => ({

    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
    },
    table: {
        minWidth: 1080
    },
    mainContainer: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolbar: {
        width: '100%',
    },
    content:{
        margin: 15,
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

class Step1 extends React.Component {
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
                <hr></hr>
                <div className={classes.mainContent}>
                    <Typography variant="h4" component="h2">
                        BoundaryBoxList
                    </Typography>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>번호</TableCell>
                                    <TableCell>이미지</TableCell>
                                    <TableCell>작성자</TableCell>
                                    <TableCell>업로드 날짜</TableCell>
                                    <TableCell>진행 상황</TableCell>
                                    <TableCell>작업하기</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {customers.map(c => {
                                    return <Customer key={c.id} id={c.id} image={c.image} name={c.name} date={c.date} step={c.step} action={c.action} />
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
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

export default withSnackbar(withRouter(withStyles(styles) (Step1)));