import { apiURL, httpConfig } from "../config.json";
import { toast } from "react-toastify";
import http from "../services/httpService";

const apiEndpoint = `${apiURL}/documents`;

export async function getDocs() {
  try {
    const { data } = await http.get(apiEndpoint, httpConfig);
    return data;
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      toast.error("404: Unable to retrieve all documents.");
    }
  }
}

export async function getDoc(id) {
  try {
    const { data: document } = await http.get(
      `${apiEndpoint}/${id}`,
      httpConfig
    );
    return document;
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      toast("404: Unable to retrieve document.");
    }
  }
}

export async function deleteDoc(id) {
  try {
    const result = await http.delete(`${apiEndpoint}/${id}`, httpConfig);
    return result;
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      toast("404: This Post has already been deleted.");
    }
  }
}

export async function createDoc(doc) {
  //POST to database
  try {
    const { data: post } = await http.post(apiEndpoint, doc, httpConfig);
    return post;
  } catch (ex) {
    toast("An unexpected error has occurred.");
  }
}

export async function updateDoc(doc) {
  try {
    const { _id: docID } = doc;
    let docInDb = getDoc(docID) || {};

    docInDb.title = doc.title;
    docInDb.firstName = doc.firstName;
    docInDb.lastName = doc.lastName;
    docInDb.sex = doc.sex;
    docInDb.address = doc.address;
    docInDb.city = doc.city;
    docInDb.state = doc.state;
    docInDb.zipCode = doc.zipCode;
    docInDb.memberGroupNumber = doc.memberGroupNumber;
    docInDb.phoneNumber = doc.phoneNumber;
    docInDb.memberId = doc.memberId;
    docInDb.insuranceProvider = doc.insuranceProvider;
    docInDb.policyNumber = doc.policyNumber;

    //Push to database
    const result = await http.put(
      `${apiEndpoint}/${docID}`,
      docInDb,
      httpConfig
    );
    return result;
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      toast("404: Unable to find document.");
    }
  }
}

// export default documents;
