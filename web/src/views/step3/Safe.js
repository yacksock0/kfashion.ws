import React from 'react';
import Select from 'react-select';
import axios from "axios";

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
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleChange = (selectedOption) => {
        this.setState(
            { selectedOption },
            () => console.log(`Option selected:`, this.state.selectedOption)
        );
    };

    render() {
        const { selectedOption } = this.state;
        const safeList= this.state.safeList;
        console.log(safeList);
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