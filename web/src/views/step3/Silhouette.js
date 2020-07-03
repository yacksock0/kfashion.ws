import React from 'react';
import Select from 'react-select';
import axios from "axios";
import {inject, observer} from "mobx-react";


@inject('professionalLabelStore','authStore')
@observer
export default class Silhouette extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            silhouetteList: [],
            selectedOption:null,
        }
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/silhouette')
            .then(response => {
                const silhouetteList = response.data.silhouetteList;
                this.setState({ silhouetteList : silhouetteList.map(silhouette => {
                        silhouette.value = silhouette.no;
                        silhouette.label = silhouette.categoryItemName;
                        return silhouette
                    })
                })
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleChange = (selectedOption) => {
        this.props.professionalLabelStore.changeNewProfessionalLabelSilhouette(selectedOption);
        this.setState(
            { selectedOption },
            () => console.log(`Option selected:`, this.state.selectedOption)
        );
    };

    render() {
        const { selectedOption } = this.state;
        const silhouetteList= this.state.silhouetteList;
        console.log(silhouetteList);
        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={silhouetteList}
                placeholder={'실루엣을 선택 하세요'}
            />
        );
    }
}