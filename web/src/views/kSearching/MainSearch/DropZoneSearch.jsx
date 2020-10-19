import React, { Component } from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import { withStyles  } from '@material-ui/core/styles';
import {inject, observer} from "mobx-react";
import {STATE} from "../../../common/state";

const style = theme => ({   
    root: {
    width: '100%',
    marginBottom:40,
    "& .MuiDropzoneArea-root": {
        borderColor:'rgba(94,191,155,1)',
        minHeight:'450px',
        outline:'none',
    },
    "& .MuiTypography-h5" : {
        position :  "absolute",
        width : "100%",
        textAlign :"center",
        top : "48%",
        fontFamily: "NotoSansCJKkr",
        fontSize: "14px",
        fontWeight: "bold",
    },
    "& .MuiDropzoneArea-icon": {
        position :  "absolute",
        top: "40%",
        marginLeft:-20,
       color:'#5ebf9b',
    },
  },

});

@inject('sImageStore')
@observer
class DropFile extends Component {
  constructor(props){
    super(props);
    this.state = {
        files: [],
        fileTotal: 0,
    };
  }
  handleChange(files){
    this.setState({
      files: files
    });
      this.props.sImageStore.fileupload(files);
  }

  render() {
    const { classes } = this.props;
      const { State } = this.props.sImageStore;

    return (
      <div className={classes.root}>
        <DropzoneArea
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp','image/gif','image/vnd.microsoft.icon','image/tiff','image/webp']}
            maxFileSize={50000000000}
            showPreviewsInDropzone={false}
            onDrop={this.handleChange.bind(this)}
            showAlerts={false}
            showPreviewsInDropzone={false}
            // showPreviews={true}

            // 드롭존 최대 이미지수
            filesLimit={1}
            dropzoneText="업로드할 이미지(1ea)를 드래그해주세요!"
            dropzoneProps={{
                disabled: State === STATE.PENDING,
            }}
        />
      </div>
    )
  }
}

export default withStyles(style)(DropFile);
