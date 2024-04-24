import axios from "axios";
import { CONSTANTS } from '@/utils/constants';
import store from '@/store/index';

// get draws history
export const fetchBetsHistory = async (byDate) => {
    const response = await axios.get(`${CONSTANTS.BASE_URL}/bets/get-bets/${byDate}`, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};

//add a draw
export const addBet = async (data) => {
    const response = await axios.post(`${CONSTANTS.BASE_URL}/bets/add-bet`, data, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};