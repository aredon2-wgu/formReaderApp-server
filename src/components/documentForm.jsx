import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getDoc, updateDoc, createDoc } from "../services/documentService";

class DocumentForm extends Form {
  state = {
    data: {
      title: "",
      firstName: "",
      lastName: "",
      sex: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      memberGroupNumber: "",
      phoneNumber: "",
      memberId: "",
      insuranceProvider: "",
      policyNumber: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    sex: Joi.string().required().min(4).max(6),
    address: Joi.string().required().max(50),
    city: Joi.string().required().max(50),
    state: Joi.string().required().min(2).max(40),
    zipCode: Joi.string().required().min(5).max(5),
    memberGroupNumber: Joi.string().max(10).label("Member Group Number"),
    phoneNumber: Joi.string().min(10).max(12).label("Phone"),
    memberId: Joi.string().max(15).label("Member ID"),
    insuranceProvider: Joi.string().label("Insurance Provider"),
    policyNumber: Joi.string().max(15).label("Policy Number"),
  };

  async componentDidMount() {
    if (!this.props.new) {
      if (this.props.match === undefined) return;
      const { id: documentId } = this.props.match.params;

      const document = await getDoc(documentId);
      if (!document) return this.props.history.replace("/not-found");
      this.setState({ data: this.mapToViewModel(document) });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const resData = { ...this.props.data };
      console.log(resData);
      const data = {
        title: "",
        firstName: resData["firstName"],
        lastName: resData["lastName"],
        sex: resData["sex"],
        address: resData["address"],
        city: resData["city"],
        state: resData["state"],
        zipCode: resData["zipCode"],
        memberGroupNumber: resData["groupNumber"],
        phoneNumber: resData["phone"],
        memberId: resData["memberID"],
        insuranceProvider: resData["insuranceProvider"],
        policyNumber: resData["policyNumber"],
      };
      console.log(data);
      this.setState({ data });
    }
  }

  mapToViewModel(document) {
    return {
      _id: document._id,
      title: document.title,
      firstName: document.firstName,
      lastName: document.lastName,
      sex: document.sex,
      address: document.address,
      city: document.city,
      state: document.state,
      zipCode: document.zipCode,
      memberGroupNumber: document.memberGroupNumber,
      phoneNumber: document.phoneNumber,
      memberId: document.memberId,
      insuranceProvider: document.insuranceProvider,
      policyNumber: document.policyNumber,
    };
  }

  doSubmit = async () => {
    const { data: document } = this.state;
    if (this.props.new) {
      //Create new document instead
      await createDoc(document);
    } else {
      await updateDoc(document);
    }
    this.props.history.push("/documents");
  };

  render() {
    // const { match } = this.props;
    return (
      <div>
        {/* <h1>Edit Document: {match.params.id} </h1> */}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Document Title")}
          {this.renderInput("firstName", "First Name")}
          {this.renderInput("lastName", "Last Name")}
          {this.renderSelect("sex", "Sex", [
            { label: "male", value: "male" },
            { label: "female", value: "female" },
          ])}
          {this.renderInput("address", "Address")}
          {this.renderInput("city", "City")}
          {this.renderInput("state", "State")}
          {this.renderInput("zipCode", "Zipcode")}
          {this.renderInput("memberGroupNumber", "Member Group Number")}
          {this.renderInput("phoneNumber", "Phone")}
          {this.renderInput("memberId", "Member ID")}
          {this.renderInput("insuranceProvider", "Insurance Provider")}
          {this.renderInput("policyNumber", "Policy Number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default DocumentForm;
