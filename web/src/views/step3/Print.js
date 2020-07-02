import React from 'react';
import Select from 'react-select';
import axios from "axios";
import {inject, observer} from "mobx-react";


@inject('professionalLabelStore','authStore')
@observer
export default class Print extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            categoryList: [],
            selectedOption:null,
        }
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/print')
            .then(response => {
                const printList = response.data.printList;
                this.setState({ printList : printList.map(print => {
                        print.value = print.no;
                        print.label = print.categoryItemName;
                        return print
                    })
                })
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleChange = (selectedOption) => {
        this.props.professionalLabelStore.changeNewProfessionalLabelPrint(selectedOption);
        this.setState(
            { selectedOption },
            () => console.log(`Option selected:`, this.state.selectedOption)
        );
    };

    render() {
        const { selectedOption } = this.state;
        const printList= this.state.printList;
        console.log(printList);
        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={printList}
                placeholder={'프린트를 선택 하세요'}
            />
        );
    }
}