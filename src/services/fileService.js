/* eslint-disable import/no-anonymous-default-export */
import http from "../services/httpService";
import { apiURL, staticURL, httpConfig } from "../config.json";

const emptyMedicalForm = staticURL + "/Medical_Reimbursement_Form.pdf";
const emptyFormImg = staticURL + "/emptyForm.jpg";

const uploadEndpoint = apiURL + "/files";

export function uploadFilledForm(data) {
  return http.post(uploadEndpoint, data, httpConfig);
}

export function getEmptyMedicalFormURL() {
  return emptyMedicalForm;
}

export function getEmptyFormImgURL() {
  return emptyFormImg;
}

export default {
  uploadFilledForm,
  getEmptyMedicalFormURL,
  getEmptyFormImgURL,
};
