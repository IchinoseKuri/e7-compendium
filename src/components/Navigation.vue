<template>
    <b-navbar id="nav" toggleable="lg" type="dark" variant="dark" :sticky="true">
        <div class="container">
            <b-navbar-brand>
                <router-link to="/" role="link">E7 Compendium</router-link>
            </b-navbar-brand>

            <b-navbar-toggle target="nav_collapse" />

            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav class="ml-auto" role="menu">
                    <li class="nav-item" role="menuitem">
                        <router-link role="link" class="nav-link" to="/mechanics">
                            Mechanics
                        </router-link>
                    </li>
                    <li class="nav-item" role="menuitem">
                        <router-link role="link" class="nav-link" to="/search/hero">
                            Game Data
                        </router-link>
                    </li>
                    <b-nav-item-dropdown text="Resources" right>
                        <router-link to="/guides" role="link" tag="b-dropdown-item">
                            Beginner Progression
                        </router-link>
                        <router-link to="/guides" role="link" tag="b-dropdown-item">
                            Raid
                        </router-link>
                        <router-link to="/guides" role="link" tag="b-dropdown-item">
                            Hunt
                        </router-link>
                        <router-link to="/guides" role="link" tag="b-dropdown-item">
                            Expedition
                        </router-link>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown text="Tools" right>
                        <router-link to="/" role="link" tag="b-dropdown-item">
                            Calculator
                        </router-link>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </div>
    </b-navbar>
</template>

<script>
export default {
    name: 'navigation',
    props: {
        msg: String
    }
}
</script>

<style lang="less">
@import '~../less/variables.less';
// Title properties
a {
    color: #b0bbc8;
}
a:hover {
    color: #f1f1f1;
    text-decoration: none;
}
// Drop-down menu properties
.dropdown-menu {
    background-color: #343a40;
}
.dropdown-item {
    color: #b0bbc8;
    background-color: #343a40;
}
.dropdown-item:hover {
    color: #b0bbc8;
    background-color: #212529;
}
</style>
