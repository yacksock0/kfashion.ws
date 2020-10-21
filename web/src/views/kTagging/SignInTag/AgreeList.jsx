// import { Button } from '@material-ui/core';
// import React, { Component } from 'react';
// import CheckBoxList1 from './CheckBoxList1';
// import {inject, observer} from "mobx-react";
//
//
//
// @inject('tSignUpStore')
// @observer
// export default class AgreeList extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             isAllSelected: false,
//             checkList: [
//                 {
//                     name: "Agree",
//                     value: " 만 14세 이상(필수)",
//                     checked: false,
//                 },
//                 {
//                     name: "Agree",
//                     value: " 이용약관 동의(필수)",
//                     checked: false,
//                 },
//                 {
//                     name: "Agree",
//                     value: " 개인정보 수집 및 이용에 대한 안내(필수)",
//                     checked: false,
//                 },
//                 {
//                     name: "Agree",
//                     value: " 가입시 유의사항 동의(필수)",
//                     checked: false,
//                 }
//             ]
//         };
//     }
//
//     onCheckBoxChange(checkName, isChecked) {
//         let isAllChecked = (checkName === 'all' && isChecked);
//         let isAllUnChecked = (checkName === 'all' && !isChecked);
//         const checked = isChecked;
//
//         const checkList = this.state.checkList.map((Agree, index) => {
//             if(isAllChecked || Agree.value === checkName) {
//                 return Object.assign({}, Agree, {
//                     checked,
//
//                 });
//             } else if (isAllUnChecked) {
//                 return Object.assign({}, Agree, {
//                     checked: false,
//                 });
//             }
//             return Agree;
//         });
//
//         let isAllSelected = (checkList.findIndex((item) => item.checked === false) === -1) || isAllChecked;
//
//         this.setState({
//             checkList,
//             isAllSelected,
//         });
//
//
//         this.props.tSignUpStore.AllSelected(isAllSelected);
//     }
//
//     render() {
//         return (
//           <div className="Check-list">
//             <CheckBoxList1
//                 options={this.state.checkList}
//                 isCheckedAll={this.state.isAllSelected}
//                 onCheck={this.onCheckBoxChange.bind(this)}
//             />
//           </div>
//         );
//     }
// }

import React, { Component } from 'react';
import { withStyles  } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CheckBoxList from './CheckBoxList1';
import {inject, observer} from "mobx-react";


const style = theme => ({
    txtstyle1: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        fontWeight:'bold',
        textAlign:'left',
        paddingLeft:3,
    },
    btnjoinstyle: {
        fontFamily:'NotoSansCJKkr',
        fontWeight:'500',
        width:'390px',
        boxShadow:'none',
        marginTop:20,
        background:'#526af2',
        color:'#fff',
        borderRadius:0,
        padding:'10px 0',

        "&:hover": {
            background:'#526af2',
            color:'#fff',
            borderRadius:0, 
            boxShadow:'none',
        },
    },
});

@inject('tSignUpStore')
@observer
class AgreeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAllSelected: false,
            checkList: [
                {
                    name: "Agree",
                    value: " 만 14세 이상(필수)",
                    checked: false,
                },
                {
                    name: "Agree",
                    value: " 이용약관 동의(필수)",
                    checked: false,
                },
                // {
                //     name: "Agree",
                //     value: " 개인정보 수집 및 이용에 대한 안내(필수)",
                //     checked: false,
                // },
                // {
                //     name: "Agree",
                //     value: " 가입시 유의사항 동의(필수)",
                //     checked: false,
                // }
            ]
        };
    }

    onCheckBoxChange(checkName, isChecked) {
        let isAllChecked = (checkName === 'all' && isChecked);
        let isAllUnChecked = (checkName === 'all' && !isChecked);
        const checked = isChecked;

        const checkList = this.state.checkList.map((Agree, index) => {
            if(isAllChecked || Agree.value === checkName) {
                return Object.assign({}, Agree, {
                    checked,

                });
            } else if (isAllUnChecked) {
                return Object.assign({}, Agree, {
                    checked: false,
                });
            }
            return Agree;
        });

        let isAllSelected = (checkList.findIndex((item) => item.checked === false) === -1) || isAllChecked;

        this.setState({
            checkList,
            isAllSelected,
        });

        this.props.tSignUpStore.AllSelected(isAllSelected);
    }

    render() {
        const { classes, handleClickToSignUp } = this.props;
        const {isAllSelected} = this.props.tSignUpStore;
        return (
            <div>
                <Typography className={classes.txtstyle1}>스타일 태깅 서비스 이용약관을 동의해주세요.</Typography>

                <div className="Check-list">
                    <CheckBoxList
                        options={this.state.checkList}
                        isCheckedAll={this.state.isAllSelected}
                        onCheck={this.onCheckBoxChange.bind(this)}
                    />
                </div>
                <Paper elevation={0}>
                    <Button variant="contained"
                            className={classes.btnjoinstyle}
                            disabled={!isAllSelected}
                            onClick={handleClickToSignUp}>
                        동의하고 가입하기
                    </Button>
                </Paper>
            </div>
        );
    }
}

export default withStyles(style)(AgreeList);
