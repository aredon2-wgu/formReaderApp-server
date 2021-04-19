import React from "react";
import Form from "./common/form";
import DocumentForm from "./documentForm";
import fileService from "../services/fileService";
import "../../node_modules/jquery/dist/jquery";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import UploadButton from "./uploadButton";

class UploadForm extends Form {
  state = {
    docPreview: null,
    docData: "",
  };

  setDocPreview = (imageURL) => {
    this.setState({ docPreview: imageURL });
  };

  setDocFormData = ({ data }) => {
    this.setState({ docData: data });
  };

  handleDownload = () => {
    fileService.getEmptyMedicalFormURL();
  };

  handleDocPreview = () => {
    return this.state.docPreview
      ? this.state.docPreview
      : fileService.getEmptyFormImgURL();
    // return staticFiles.getEmptyFormImgURL();
  };

  render() {
    const { docPreview, history } = this.props;
    return (
      <div className="container">
        <h1>Upload</h1>
        <div className="row">
          <div className="col-6">
            <h2>Document Preview</h2>
            <div className="row mb-3 border border-dark">
              <img
                className="w-100 mb-3"
                // src={emptyForm.default}
                src={this.handleDocPreview()}
                alt="emptyForm"
              ></img>
            </div>
            <div className="row">
              <a
                href={fileService.getEmptyMedicalFormURL()}
                target={"_blank"}
                rel="noopener noreferrer"
                download="emptyForm.pdf"
              >
                <button type="button" className="btn btn-dark mr-2">
                  Print Form
                </button>
              </a>
              {/* <button className="btn btn-success mr-2">Analyze Form</button> */}
            </div>
            <div className="row">
              {/* <form onSubmit={this.handleFileUpload}> */}
              {/* <button
                  type="file"
                  className="form-control-file btn btn-outline-primary mt-2 mb-5"
                >
                  Upload Form
                </button> */}
              {/* </form> */}
              <UploadButton
                onChange={this.setDocPreview}
                docPreview={docPreview}
                onFormResponse={this.setDocFormData}
              />
            </div>
          </div>
          <div className="col-6">
            <h2>Input Fields</h2>
            {/* <form onSubmit={this.handleSubmit}> */}
            {/* {this.renderInput("Label", "label")} */}
            <DocumentForm
              history={history}
              new={true}
              data={this.state.docData}
            />
            {/* {this.renderButton("Submit")} */}
            {/* </form> */}
          </div>
        </div>
      </div>
    );
  }
}

export default UploadForm;
