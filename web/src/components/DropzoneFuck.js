// import axios from 'axios';
// import Button from '@material-ui/core/Button';
// import React,{Component} from 'react';
// import DropzoneDialog from "./DropzoneDialog";
//
//
// class DropzoneFuck extends Component {
//
//     state = {
//         // Initially, no file is selected
//         files: [],
//         open: false,
//     };
//
//     // On file select (from the pop up)
//     onFileChange = event => {
//
//         // Update the state
//         this.setState({ files:[...this.state.files, ...event.target.files]});
//
//     };
//
//     // On file upload (click the upload button)
//     onFileUpload = () => {
//
//         // Create an object of formData
//         const formData = new FormData();
//
//         for(let i=0; i < this.state.files.length; i++) {
//             formData.append("files",this.state.files[i]);
//             console.log(this.state.files[i]);
//
//         }
//         axios.post("/api/v1/kfashion/img/uploadMultipleFiles", formData);
//         // Details of the uploaded file
//
//         // Request made to the backend api
//         // Send formData object
//
//     };
//
//     handleClose() {
//         this.setState({
//             open: false
//         });
//     }
//
//     handleSave(files) {
//         //Saving files to state for further use and closing Modal.
//         this.setState({
//             open: false
//         });
//         const formData = new FormData();
//
//         for(let i=0; i < files.length; i++) {
//             formData.append("files",files[i]);
//             console.log(files[i]);
//
//         }
//         axios.post("/api/v1/kfashion/img/uploadMultipleFiles", formData);
//     }
//
//     handleOpen() {
//         this.setState({
//             open: true,
//         });
//     }
//
//     // File content to be displayed after
//     // file upload is complete
//     render() {
//
//         return (
//             <div>
//                 <Button onClick={this.handleOpen.bind(this)}>
//                     Add Image
//                 </Button>
//                 <DropzoneDialog
//                     open={this.state.open}
//                     onSave={this.handleSave.bind(this)}
//                     acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
//                     showPreviews={true}
//                     maxFileSize={5000000}
//                     onClose={this.handleClose.bind(this)}
//                 />
//             </div>
//         );
//     }
// }
//
// export default DropzoneFuck;