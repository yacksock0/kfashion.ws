import React from 'react';
import Select from 'react-select';
import axios from "axios";
import {inject, observer} from "mobx-react";


@inject('professionalLabelStore','authStore')
@observer
export default class SelectTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            styleList: [],
            selectedOption:null,
        }
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/style')
            .then(response => {
                const styleList = response.data.styleList;
                this.setState({ styleList : styleList.map(style => {
                        style.value = style.no;
                        style.label = style.categoryItemName;
                        return style
                    })
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleChange = (selectedOption) => {
        if(selectedOption === null) {
            selectedOption =[];
        }
        this.props.professionalLabelStore.changeNewProfessionalLabelStyle(selectedOption);
        if (!selectedOption && this.props.isMulti ? [] : selectedOption && selectedOption.length <= 2) {
            this.setState(
                {selectedOption}
            );
        }

    };
    render() {
        const { selectedOption } = this.state;
        const styleList= this.state.styleList;
        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={styleList}
                autoFocus={true}
                placeholder={'스타일을 선택 하세요 (Main, Sub)'}
                isMulti
                isClearable
            />
        );
    }
}