import axios from "axios";
import { CONSTANTS } from '@/utils/constants';
import store from '@/store/index';

// get draws history
export const fetchResults = async (byDate) => {
    const response = await axios.get(`${CONSTANTS.BASE_URL}/results/get-result/${byDate}`, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};