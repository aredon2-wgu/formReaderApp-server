import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import DocumentTable from "./documentTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { deleteDoc, getDocs } from "../services/documentService";
import _ from "lodash";

class Documents extends Component {
  state = {
    documents: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "firstName", order: "asc" },
  };

  async componentDidMount() {
    const docs = await getDocs();
    this.setState({ documents: docs });
  }

  handleDelete = async (document) => {
    //update client side objects
    const previousState = { ...this.state.documents };
    const documents = this.state.documents.filter(
      (d) => d._id !== document._id
    );
    this.setState({ documents });

    //send delete request to server
    const result = await deleteDoc(document._id);
    if (!result) {
      this.setState({ previousState });
    }
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      documents: allDocuments,
    } = this.state;

    const sorted = _.orderBy(
      allDocuments,
      [sortColumn.path],
      [sortColumn.order]
    );

    const pagedDocs = paginate(sorted, currentPage, pageSize);

    return { data: pagedDocs };
  };

  render() {
    const { length: totalCount } = this.state.documents;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (totalCount === 0) return <p>There are no documents in the database.</p>;

    const { data: documents } = this.getPagedData();
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="col">
          <p>Showing {totalCount} documents in the database.</p>
          <DocumentTable
            documents={documents}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Documents;
