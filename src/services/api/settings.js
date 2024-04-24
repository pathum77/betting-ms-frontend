import axios from "axios";
import { CONSTANTS } from '@/utils/constants';
import store from '@/store/index';

//password change
export const changePassword = async (data) => {
    const response = await axios.post(`${CONSTANTS.BASE_URL}/settings/change-password`, data, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};

// get draw types
export const fetchDrawTypes = async () => {
    const response = await axios.get(`${CONSTANTS.BASE_URL}/settings/get-draw-types`);
    return response;
};

//add a new draw
export const addDraw = async (data) => {
    const response = await axios.post(`${CONSTANTS.BASE_URL}/settings/add-draw-type`, data, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};

//get places
export const fetchPlaces = async () => {
    const response = await axios.get(`${CONSTANTS.BASE_URL}/settings/get-places`);
    return response;
};

//add a new place
export const addPlace = async (data) => {
    const response = await axios.post(`${CONSTANTS.BASE_URL}/settings/add-place`, data, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};