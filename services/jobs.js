import { main_api } from "../constant";
import axios from "axios";

module.exports.homeJobs = function (data = {}, headers = {}) {
    return axios
        .post(main_api + `/job/homelist`, data, { headers: headers })
        .then(res => {
            return res.data;
        })
        .catch(error => {
            throw error;
        });;
};
module.exports.search = function (data = {}, headers = {}) {
    return axios
        .post(main_api + `/job/search`, data, { headers: headers })
        .then(res => {
            return res.data;
        })
        .catch(error => {
            throw error;
        });;
};
module.exports.applyJob = function (data = {}, headers = {}) {
    return axios
        .post(main_api + `/job/apply`, data, { headers: headers })
        .then(res => {
            return res.data;
        })
        .catch(error => {
            throw error;
        });;
};
