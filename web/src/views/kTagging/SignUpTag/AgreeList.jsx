import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import CheckBoxList1 from './CheckBoxList1';
import {inject, observer} from "mobx-react";



@inject('tSignUpStore')
@observer
export default class AgreeList extends Component {
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
                {
                    name: "Agree",
                    value: " 개인정보 수집 및 이용에 대한 안내(필수)",
                    checked: false,
                },
                {
                    name: "Agree",
                    value: " 가입시 유의사항 동의(필수)",
                    checked: false,
                }
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
        return (
          <div className="Check-list">
            <CheckBoxList1
                options={this.state.checkList}
                isCheckedAll={this.state.isAllSelected}
                onCheck={this.onCheckBoxChange.bind(this)}
            />
          </div>
        );
    }
}
