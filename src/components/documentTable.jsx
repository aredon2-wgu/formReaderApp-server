import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import auth from "../services/authService";

class DocumentTable extends Component {
  columns = [
    { path: "firstName", label: "First Name" },
    { path: "lastName", label: "Last Name" },
    { path: "sex", label: "Sex" },
    { path: "city", label: "City" },
    { path: "state", label: "State" },
    { path: "phoneNumber", label: "Phone" },
    { path: "insuranceProvider", label: "Insurance Provider" },
    { path: "policyNumber", label: "Policy Number" },
    {
      key: "edit",
      content: (doc) => (
        <Link to={`/documents/${doc._id}`}>
          <button className="btn btn-light btn-sm">Edit</button>
        </Link>
      ),
    },
  ];

  setDeleteColumn(user) {
    return {
      key: "delete",
      content: (doc) => (
        <button
          onClick={() => this.props.onDelete(doc)}
          className={
            user && user.isAdmin
              ? "btn btn-danger btn-sm"
              : "btn btn-danger btn-sm disabled"
          }
        >
          Delete
        </button>
      ),
    };
  }

  constructor() {
    super();
    const user = auth.getCurrentUser();
    this.columns.push(this.setDeleteColumn(user));
  }

  render() {
    const { documents, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={documents}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default DocumentTable;
