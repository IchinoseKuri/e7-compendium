<template>
    <div class="search">
        <b-row>
            <!-- Main search column -->
            <b-col id="search-content">
                <hero-search @sidebarToggle="onSidebarToggle" />
            </b-col>
            <!-- Detailed section -->
            <b-col class="sidebar" :class="sidebarStatus">
                <hero-profile :hero-id="selectedHeroId"></hero-profile>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import HeroSearch from '@/components/search/hero/hero-search'
import HeroProfile from '@/components/search/hero/hero-profile'
import { mapActions } from 'vuex'

export default {
    name: 'search',
    components: {
        HeroSearch,
        HeroProfile
    },
    data() {
        return {
            selectedHeroId: null
        }
    },
    created() {
        this.loadAllHeroData()
    },
    methods: {
        ...mapActions('hero', ['loadAllHeroData']),
        /**
         * Expected to be triggered by event emissions of children components.
         * Changes the margin of the main content to make room for the side drawer content.
         * @param id - id of selected hero
         */
        onSidebarToggle(id) {
            console.log('sidebar toggle', id)
            if (this.selectedHeroId === id) {
                // Deselecting the hero will close the drawer.
                this.selectedHeroId = null
            } else {
                // Selecting the hero will open the drawer.
                this.selectedHeroId = id
            }
        }
    },
    computed: {
        sidebarStatus() {
            return {
                'sidebar-open': this.selectedHeroId !== null,
                'sidebar-closed': this.selectedHeroId === null
            }
        }
    }
}
</script>

<style lang="less">
@import '~../less/variables.less';
.search {
    font-family: Verdana, Helvetica, Arial, sans-serif;
    background: #252b35;
}

.sidebar {
    width: 0%;
}
.detailed-content {
    overflow-y: scroll;
    height: 93vh;
}
.sidebar-open {
    transition-duration: 0.35s;
    margin-right: 0vw;
}
.sidebar-closed {
    transition-duration: 0.35s;
    margin-right: -102vw;
}

/* Tag searching form input */
.input-form {
    width: 30vw;
    background-color: #252b35;
    color: #f1f1f1;
    box-shadow: none !important;
    border: 0;
}

.search-form :focus {
    background-color: #222731;
    color: #f1f1f1;
    box-shadow: none !important;
    border: 0;
}
/* Nav Bar */
/* b-table */
.d-inline-block :focus {
    box-shadow: none !important;
    outline: 0;
}

.thead-class-hidden {
    display: none;
}
.tbody-class-hidden {
    display: none;
}
.IDColumn {
    min-width: 30px !important;
    font-size: 9px;
    line-height: 2.5;
    width: 3vw;
}
.faceColumn {
    min-width: 30px !important;
    width: 3vh;
    height: 3vh;
}
.NameColumn {
    line-height: 2.5;
    text-align: left;
    font-size: 11px;
    width: 12vw;
}
.gradeColumn {
    text-align: left;
    width: 5vw;
    line-height: 2.5;
    font-size: 10px;
}
.symbolColumn {
    width: 3vw;
}
.statColumn {
    width: 2.5vw;
    line-height: 2.5;
    font-size: 10px;
}
.navDrawer {
    width: 50vw;
}

/* Mobile only specifications */
@media only screen and (max-width: 970px) {
    .search {
        width: 100vw;
    }
    .navDrawer {
        width: 100vw;
    }
    .input-form {
        width: 70vw;
    }
}
/* Reserved for side drawer content */
.search-tags-container img {
    vertical-align: middle;
    width: 20px;
    height: 20px;
}
</style>
