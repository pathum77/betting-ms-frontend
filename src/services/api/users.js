import axios from "axios";
import { CONSTANTS } from '@/utils/constants';
import store from '@/store/index';

// user login
export const loginUser = async (data) => {
    const response = await axios.post(`${CONSTANTS.BASE_URL}/users/login`, data, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};

// get user role 
export const fetchUserRole = async () => {
    const response = await axios.get(`${CONSTANTS.BASE_URL}/users/get-user-role`, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};

// get user data 
export const fetchUserData = async () => {
    const response = await axios.get(`${CONSTANTS.BASE_URL}/users/get-user-data`, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};

//add a manager
export const addManager = async (data) => {
    const response = await axios.post(`${CONSTANTS.BASE_URL}/users/add-manager`, data, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};

//add a agent
export const addAgent = async (data) => {
    const response = await axios.post(`${CONSTANTS.BASE_URL}/users/add-agent`, data, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};

// get users 
export const fetchUsersData = async () => {
    const response = await axios.get(`${CONSTANTS.BASE_URL}/users/get-users`, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};