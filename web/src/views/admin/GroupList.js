import React from 'react';
import Select from 'react-select';
import axios from "axios";
import {inject, observer} from "mobx-react";


@inject('adminAuthorityStore')
@observer
export default class GroupList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : '',
            text: 'text',
            userGroupAuthorityList: [],
            selectedOption:null,
        }
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/userGroupAuthority/userGroupAuthorityList')
            .then(response => {
                const userGroupAuthorityList = response.data.userGroupAuthorityList;
                this.setState({
                    userGroupAuthorityList: userGroupAuthorityList.map(userGroupList => {
                        userGroupList.value = userGroupList.groupNo;
                        userGroupList.label = userGroupList.groupName;
                        return userGroupList
                    })
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleChange = (selectedOption) => {
        const id =this.props.rowDataId;
        this.setState(
            { selectedOption : selectedOption}
        );
        this.props.adminAuthorityStore.changeNewAdminGroupNo(selectedOption.groupNo);
        this.props.adminAuthorityStore.changeNewAdminId(id);
    };

    render() {
        const { selectedOption } = this.state;
        const userGroupAuthorityList = this.state.userGroupAuthorityList;
        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={userGroupAuthorityList}
                placeholder={'그룹 선택'}
            />
        );
    }
}