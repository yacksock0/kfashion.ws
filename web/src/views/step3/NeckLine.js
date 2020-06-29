import React from 'react';
import Select from 'react-select';
import axios from "axios";

export default class NeckLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            textureList: [],
            selectedOption:null,
        }
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/neckLine')
            .then(response => {
                const neckLineList = response.data.neckLineList;
                this.setState({ neckLineList : neckLineList.map(neckLine => {
                        neckLine.value = neckLine.no;
                        neckLine.label = neckLine.categoryItemName;
                        return neckLine
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
        const neckLineList= this.state.neckLineList;
        console.log(neckLineList);
        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={neckLineList}
                placeholder={'넥라인을 선택 하세요'}
            />
        );
    }
}