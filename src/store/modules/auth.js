import userData from '@/data/users.json'

export default {
  namespaced: true,
  
  state: {
    user: null,
    isLoggedIn: false
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.isLoggedIn = !!user
    },
    UPDATE_ABOUT_ME(state, aboutMe) {
      if (state.user) {
        state.user.aboutMe = aboutMe
      }
    }
  },

  actions: {
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
          const user = userData.users.find(u => 
            u.email === credentials.email && 
            u.password === credentials.password
          )
          
          if (user) {
            // Remove password before storing user
            const { password, ...userWithoutPassword } = user
            commit('SET_USER', userWithoutPassword)
            resolve(userWithoutPassword)
          } else {
            reject(new Error('Invalid credentials'))
          }
        }, 300) // Simulate network delay
      })
    },

    logout({ commit }) {
      commit('SET_USER', null)
    },

    updateAboutMe({ commit }, aboutMe) {
      commit('UPDATE_ABOUT_ME', aboutMe)
    }
  }
} 