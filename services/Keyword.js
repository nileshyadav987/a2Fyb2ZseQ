import { main_api } from "../constant";
import axios from "axios";

module.exports.search = function (data = {}, headers = {}) {
    return axios
        .post(main_api + `/keyword/search`, data, { headers: headers })
        .then(res => {
            return res.data;
        })
        .catch(error => {
            if (error.response.data && error.response.data.message) {
                throw error.response.data.message;
            } else {
                throw "Something went wrong...";
            }
        });
};
