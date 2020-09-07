<template>
    <div class="hero">
        <b-row>
            <!-- Main search column -->
            <b-col id="search-content" :class="sidebarStatus">
                <hero-search @sidebarToggle="onSidebarToggle" />
            </b-col>
            <!-- Detailed section -->
            <b-col class="sidebar">
                <div>
                    <button type="button" @click="showSearchDrawer" v-show="!showSearch">
                        Show Search
                    </button>
                    <button type="button" @click="hideSearchDrawer" v-show="showSearch">
                        Hide Search
                    </button>
                </div>
                <hero-profile :hero-id="$route.params.id"></hero-profile>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import HeroSearch from '@/components/search/hero/hero-search'
import HeroProfile from '@/components/search/hero/hero-profile'

export default {
    name: 'hero',
    components: {
        HeroSearch,
        HeroProfile
    },
    data() {
        return {
            showSearch: false
        }
    },
    methods: {
        ...mapActions('hero', ['loadAllHeroData']),
        showSearchDrawer() {
            this.showSearch = true
        },
        hideSearchDrawer() {
            this.showSearch = false
        },
        onSidebarToggle(id) {
            // TODO Probably not the best way to do this, but it works "for now".
            // Ideally we would share more code but the drawer being on both pages make this abnormally complex
            window.location = `/hero/${id}`
        }
    },
    computed: {
        sidebarStatus() {
            return {
                'search-open': this.showSearch === true,
                'search-closed': this.showSearch === false
            }
        }
    },
    created() {
        this.loadAllHeroData()
    }
}
</script>
<style scoped lang="less">
.search-open {
    display: block;
}
.search-closed {
    display: none;
}
</style>
