import { createStore } from 'vuex';

const store = createStore({
  state: {
    isScrollLocked: false, // Trạng thái cuộn trang (mặc định là không khóa)
    isSidebarOpen: window.innerWidth > 991,
  },
  mutations: {
    lockScroll(state) {
      state.isScrollLocked = true;
    },
    unlockScroll(state) {
      state.isScrollLocked = false;
    },
    openSidebar(state) {
      state.isSidebarOpen = true;
    },
    closeSidebar(state) {
      state.isSidebarOpen = false;
    },
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  actions: {
    lockScroll({ commit }) {
      commit('lockScroll');
    },
    unlockScroll({ commit }) {
      commit('unlockScroll');
    },
    openSidebar({ commit }) {
      commit('openSidebar');
    },
    closeSidebar({ commit }) {
      commit('closeSidebar');
    },
    toggleSidebar({ commit }) {
      commit('toggleSidebar');
    },
  },
  getters: {
    isScrollLocked: (state) => state.isScrollLocked,
    isSidebarOpen: (state) => state.isSidebarOpen,
  },
});

export default store;
