import axios from "axios";
import { CONSTANTS } from '@/utils/constants';
import store from '@/store/index';

// get draws history
export const fetchDrawsHistory = async (byDate, byType) => {
    const response = await axios.get(`${CONSTANTS.BASE_URL}/draws/get-draws/${byDate}/?byType=${byType}`, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};

//add a draw
export const addDraw = async (data) => {
    const response = await axios.post(`${CONSTANTS.BASE_URL}/draws/add-draw`, data, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};