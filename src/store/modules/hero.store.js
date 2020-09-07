import heroSearchService from '@/services/hero-search.service'

const state = {
    heroData: []
}

const getters = {
    search: (state) => (heroSearchForm) => {
        return heroSearchService.search(state.heroData, heroSearchForm)
    },
    getHeroProfile: (state) => (heroId) => {
        const heroProfileFilter = state.heroData.filter(({ id }) => {
            return id === heroId
        })
        return heroProfileFilter.length ? heroProfileFilter[0] : {}
    }
}

// Actions can be asynchronous
const actions = {
    /**
     * This function will need modification when a backend is implemented.
     * @returns {Promise<>}
     */
    loadAllHeroData({ commit, state }) {
        // Don't make the expensive backend call again if we already did that.
        if (state.heroData.length === 0) {
            return heroSearchService.queryAll().then((data) => {
                commit('cacheHeroData', { heroData: data })
            })
        }
        return Promise.resolve()
    }
}

// Mutations must always be synchronous
const mutations = {
    cacheHeroData(state, payload) {
        state.heroData = payload.heroData
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
