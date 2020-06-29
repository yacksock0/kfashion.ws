import React from 'react';
import Select from 'react-select';
import axios from "axios";

export default class ColorKara extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            fitList: [],
            selectedOption:null,
        }
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/fit')
            .then(response => {
                const fitList = response.data.fitList;
                this.setState({ fitList : fitList.map(fit => {
                        fit.value = fit.no;
                        fit.label = fit.categoryItemName;
                        return fit
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
        const fitList= this.state.fitList;
        console.log(fitList);
        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={fitList}
            />
        );
    }
}