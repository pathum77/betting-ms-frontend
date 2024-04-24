import axios from "axios";
import { CONSTANTS } from '@/utils/constants';
import store from '@/store/index';

///////user///////
//admin login
export const adminLogin = async (data) => {
    const response = await axios.post(`${CONSTANTS.BASE_URL}/admin/login`, data);
    return response;
};

//change admin password
export const changeAdminPassword = async (data) => {
    const response = await axios.post(`${CONSTANTS.BASE_URL}/admin/password-change`, data, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};

///////categories///////
//get categories
export const fetchCategories = async () => {
    const response = await axios.get(`${CONSTANTS.BASE_URL}/items/get-categories`);
    return response;
};

//add a category
export const addCategory = async (data) => {
    const response = await axios.post(`${CONSTANTS.BASE_URL}/items/add-category`, data, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};

//get sub categories
export const fetchSubCategories = async (categoryId) => {
    const response = await axios.get(`${CONSTANTS.BASE_URL}/items/get-sub-categories/${categoryId}`);
    return response;
};

//add a sub category
export const addSubCategory = async (data) => {
    const response = await axios.post(`${CONSTANTS.BASE_URL}/items/add-sub-category/`, data, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};
///////////////

//////items//////
//add a new item
export const addItem = async (data) => {
    console.log(store.getters.token);
    const response = await axios.post(`${CONSTANTS.BASE_URL}/items/add-item`, data, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};

//get items
export const fetchItems = async (page, type, category, subCategory, searckKey) => {
    const response = await axios.get(`${CONSTANTS.BASE_URL}/items/get-all-items/${page}/${type}/${category}/${subCategory}/?searchKey=${searckKey}`, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};

//edit item
export const editItem = async (data) => {
    const response = await axios.post(`${CONSTANTS.BASE_URL}/items/edit-item`, data, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};

//update item's visibility
export const changeItemVisibility = async (itemId) => {
    const response = await axios.get(`${CONSTANTS.BASE_URL}/items/activate-diactivate-item/${itemId}`, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};
////////////

///////reviews///////
//get all reviews
export const fetchAllUserReviews = async (type) => {
    const response = await axios.get(`${CONSTANTS.BASE_URL}/reviews/get-all-reviews/${type}`, {
        headers: {
            Authorization: `Bearer ${await store.getters.token}`
        }
    });
    return response;
};

//get all reviews
export const changeReviewVisibility = async (id) => {
    const response = await axios.get(`${CONSTANTS.BASE_URL}/reviews/ac-dec-review/${id}`, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
    return response;
};