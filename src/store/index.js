import { createStore } from 'vuex';
import { fetchUserRole } from '@/services/api/users';

const store = createStore({
  state: {
    token: localStorage.getItem('token') || null,
    role: null,
  },

  mutations: {
    setToken(state, { token, role }) {
      state.token = token;
      state.role = role;
    },

    removeToken(state) {
      state.token = null;
      state.role = null;
    },

    setRole(state, role) {
      state.role = role;
    }
  },

  actions: {
    async fetchRole({ commit, getters }) {
      try {
        if (!getters.role) {
          const response = await fetchUserRole();
          commit('setRole', response.data.role);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    },
    login({ commit }, { token, role }) {
      localStorage.setItem('token', token)
      commit('setToken', { token, role });
    },

    logout({ commit }) {
      localStorage.removeItem('token')
      commit('removeToken');
    }
  },

  getters: {
    isLoggedIn: state => state.token !== null,
    token: state => state.token,
    role: state => state.role,
  }
});

export default store
