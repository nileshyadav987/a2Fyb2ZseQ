import { main_api } from "../constant";
import axios from "axios";

module.exports.register = function (data = {}, headers = {}) {
    return axios
        .post(main_api + `/student/register`, data, { headers: headers })
        .then(res => {
            return res.data;
        })
        .catch(error => {
            if (error.response.data && error.response.data.message) {
                throw error.response.data.message;
            } else {
                throw "Something went wrong...";
            }
        });;
};
module.exports.login = function (data = {}, headers = {}) {
    return axios
        .post(main_api + `/student/login`, data, { headers: headers })
        .then(res => {
            return res.data;
        })
        .catch(error => {
            if (error.response.data && error.response.data.message) {
                throw error.response.data.message;
            } else {
                throw "Something went wrong...";
            }
        });;
};
module.exports.myprofile = function (data = {}, headers = {}) {
    return axios
        .post(main_api + `/student/myprofile`, data, { headers: headers })
        .then(res => {
            return res.data;
        })
        .catch(error => {
            if (error.response.data && error.response.data.message) {
                throw error.response.data.message;
            } else {
                throw "Something went wrong...";
            }
        });;
};
module.exports.publicprofile = function (data = {}, headers = {}) {
    return axios
        .post(main_api + `/student/publicprofile`, data, { headers: headers })
        .then(res => {
            return res.data;
        })
        .catch(error => {
            if (error.response.data && error.response.data.message) {
                throw error.response.data.message;
            } else {
                throw "Something went wrong...";
            }
        });;
};
module.exports.updateprofile = function (data = {}, headers = {}) {
    return axios
        .post(main_api + `/student/updateprofile`, data, { headers: headers })
        .then(res => {
            return res.data;
        })
        .catch(error => {
            if (error.response.data && error.response.data.message) {
                throw error.response.data.message;
            } else {
                throw "Something went wrong...";
            }
        });;
};
