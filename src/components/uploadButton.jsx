import React, { Component } from "react";
import { uploadFilledForm } from "../services/fileService";

class UploadButton extends Component {
  state = { selectedFile: null, loading: false };

  componentDidUpdate(prevProps, prevState) {
    
  }

  onFileChange = (e) => {
    e.preventDefault();

    let imageFile = {
      file: e.target.files[0],
      image: URL.createObjectURL(e.target.files[0]),
    };
    this.setState({ selectedFile: imageFile });
    this.props.onChange(imageFile.image);
  };

  onFileUpload = async (e) => {
    e.preventDefault();
    // Create an object of formData
    const formData = new FormData();
    const { file } = this.state.selectedFile;

    // Update the formData object
    formData.append("filledForm", file, file.name);
    this.setState({ loading: true });
    const formResponse = await uploadFilledForm(formData);
    this.props.onFormResponse(formResponse);
  };

  renderFileData = () => {
    if (this.state.selectedFile) {
      const { file } = this.state.selectedFile;
      return (
        <div>
          <h4>File Details:</h4>
          <hr className="mt-0 mb-0" />
          <p className="mb-0">File Name: {file.name}</p>
          <p className="mb-0">File Type: {file.type}</p>
          <p className="mb-0">
            Last Modified: {file.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <h4>Choose a file before pressing the upload button.</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="custom-file mt-2 container">
        <div className="row">
          <div className="col-8">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={this.onFileChange}
            />
            <label
              className="custom-file-label"
              htmlFor="customFile"
              onClick={this.onFileChange}
            >
              Choose file
            </label>
          </div>
          <div className="col-4">
            {!this.state.loading ? (
              <button className="btn btn-success" onClick={this.onFileUpload}>
                Upload
              </button>
            ) : (
              <i class="fas fa-spinner fa-pulse"></i>
            )}
          </div>
        </div>
        <div className="row">
          <div className="mt-2">{this.renderFileData()}</div>
        </div>
      </div>
    );
  }
}

export default UploadButton;
