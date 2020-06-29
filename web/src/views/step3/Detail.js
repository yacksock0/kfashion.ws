import React from 'react';
import Select from 'react-select';
import axios from "axios";

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            categoryList: [],
            selectedOption:null,
        }
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/detail')
            .then(response => {
                const categoryList = response.data.detailList;
                this.setState({ detailList : categoryList.map(detail => {
                        detail.value = detail.no;
                        detail.label = detail.categoryItemName;
                        return detail
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
        const detailList= this.state.detailList;
        console.log(detailList);
        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={detailList}
            />
        );
    }
}