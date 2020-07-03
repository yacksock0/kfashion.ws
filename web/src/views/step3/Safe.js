import React from 'react';
import Select from 'react-select';
import axios from "axios";
import {inject, observer} from "mobx-react";


@inject('professionalLabelStore','authStore')
@observer
export default class Safe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            safeList: [],
            selectedOption:null,
        }
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/safe')
            .then(response => {
                const safeList = response.data.safeList;
                this.setState({ safeList : safeList.map(safe => {
                        safe.value = safe.no;
                        safe.label = safe.categoryItemName;
                        return safe
                    })
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleChange = (selectedOption) => {
        this.props.professionalLabelStore.changeNewProfessionalLabelSafe(selectedOption);
        this.setState(
            { selectedOption }
        );
    };

    render() {
        const { selectedOption } = this.state;
        const safeList= this.state.safeList;
        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={safeList}
                placeholder={'세이프를 선택 하세요'}
            />
        );
    }
}