<template>
    <b-container fluid class="search-content">
        <h1>Search</h1>
        <div class="container grid-side-500">
            <div class="d-flex justify-content-center">
                <div>
                    <b-input-group class="search-form">
                        <b-form-input
                            v-model="heroSearchForm.name"
                            @keyup.enter="enterTag"
                            @keyup.backspace="backspaceTag"
                            placeholder="Search term"
                            class="search-form"
                        ></b-form-input>
                    </b-input-group>
                </div>
            </div>
            <div role="group" class="search-tags-container" id="search-tags-container">
                <output
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    aria-relevant="additions text"
                    class="sr-only"
                >
                    {{ tagsSrOutput }}
                </output>
                <div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
                    {{ tagRemoved }}
                </div>
                <div v-for="tag in tags" :key="tag.value" class="d-inline-block">
                    <img
                        class="img-responsive"
                        v-if="tag.symbol"
                        :src="tagSymbol"
                        aria-hidden="true"
                    />
                    {{ tag.text }}
                    <button
                        aria-keyshortcuts="Delete"
                        type="button"
                        aria-label="Delete tag"
                        class="close b-form-tag-remove ml-1"
                        @click="tagDeleteButton"
                    >
                        ×
                    </button>
                </div>
            </div>
            <!-- Nav bar section -->
            <b-row class="justify-content-md-center">
                <!-- Nav bar for future table sorting and column identification -->
                <div class="searchresults">
                    <b-navbar type="dark" variant="dark" class="dropdownBar">
                        <b-navbar-nav small justify class="dropdownItems">
                            <b-nav-item class="navItemSort" @click="resetSort">
                                <b>Sort:</b>
                            </b-nav-item>
                            <b-nav-item class="navSpacer" />
                            <b-nav-item class="navItemName" @click="nameSort">
                                Name
                                <span v-if="this.sortBy === 'name' && this.isDescending === false">
                                    <b-icon-arrow-up />
                                </span>
                                <span
                                    v-else-if="this.sortBy === 'name' && this.isDescending === true"
                                >
                                    <b-icon-arrow-down />
                                </span>
                                <span v-else>
                                    <b-icon />
                                </span>
                            </b-nav-item>

                            <b-nav-item-dropdown
                                text="Element"
                                class="navItemElement"
                                @click.stop=""
                            >
                                <b-form-checkbox-group
                                    v-model="heroSearchForm.elements"
                                    :options="elementOptions"
                                    switches
                                    stacked
                                    class="switchbox"
                                    @change.native="elementDropdownChanged"
                                ></b-form-checkbox-group>
                            </b-nav-item-dropdown>

                            <b-nav-item-dropdown text="Class" class="navItemClass" @click.stop="">
                                <b-form-checkbox-group
                                    v-model="heroSearchForm.classes"
                                    :options="classOptions"
                                    switches
                                    stacked
                                    class="switchbox"
                                    @change.native="classDropdownChanged"
                                ></b-form-checkbox-group>
                            </b-nav-item-dropdown>

                            <b-nav-item-dropdown text="Grade" class="navItemGrade" @click.stop="">
                                <b-form-checkbox-group
                                    v-model="heroSearchForm.grades"
                                    :options="gradeOptions"
                                    switches
                                    stacked
                                    class="switchbox"
                                    @change.native="gradeDropdownChanged"
                                ></b-form-checkbox-group>
                            </b-nav-item-dropdown>
                            <b-nav-item class="navItemAtk" @click="attackSort">
                                Atk
                                <span v-if="this.sortBy === 'bra' && this.isDescending === false">
                                    <b-icon-arrow-up />
                                </span>
                                <span
                                    v-else-if="this.sortBy === 'bra' && this.isDescending === true"
                                >
                                    <b-icon-arrow-down />
                                </span>
                                <span v-else>
                                    <b-icon />
                                </span>
                            </b-nav-item>
                            <b-nav-item class="navItemHP" @click="healthSort">
                                HP
                                <span v-if="this.sortBy === 'int' && this.isDescending === false">
                                    <b-icon-arrow-up />
                                </span>
                                <span
                                    v-else-if="this.sortBy === 'int' && this.isDescending === true"
                                >
                                    <b-icon-arrow-down />
                                </span>
                                <span v-else>
                                    <b-icon />
                                </span>
                            </b-nav-item>
                            <b-nav-item class="navItemDef" @click="defenseSort">
                                Def
                                <span v-if="this.sortBy === 'fai' && this.isDescending === false">
                                    <b-icon-arrow-up />
                                </span>
                                <span
                                    v-else-if="this.sortBy === 'fai' && this.isDescending === true"
                                >
                                    <b-icon-arrow-down />
                                </span>
                                <span v-else>
                                    <b-icon />
                                </span>
                            </b-nav-item>
                            <b-nav-item class="navItemSpd" @click="speedSort">
                                Spd
                                <span v-if="this.sortBy === 'des' && this.isDescending === false">
                                    <b-icon-arrow-up />
                                </span>
                                <span
                                    v-else-if="this.sortBy === 'des' && this.isDescending === true"
                                >
                                    <b-icon-arrow-down />
                                </span>
                                <span v-else>
                                    <b-icon />
                                </span>
                            </b-nav-item>
                        </b-navbar-nav>
                    </b-navbar>
                </div>
                <!-- Nav bar END -->
            </b-row>
            <h1 />
            <!-- Table section -->
            <b-row class="justify-content-md-center">
                <div class="searchresults">
                    <!-- B-table allows us to actively sort items and select items in the table -->
                    <b-table
                        small
                        :items="heroSearchResults"
                        :fields="fields"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="isDescending"
                        :sort-compare="sortHeroTable"
                        responsive="sm"
                        borderless
                        selectable
                        thead-class="thead-class-hidden"
                        class="table"
                        select-mode="single"
                        @row-clicked="loadDetailed"
                    >
                        <!-- loadDetailed function call when a row is clicked -->
                        <!-- Template to reformat links for hero portraits -->
                        <template v-slot:cell(Hero_icon)="data">
                            <b-img :src="data.value" height="40px" />
                        </template>
                        <template v-slot:cell(element)="data">
                            <span v-if="data.value === 'fire'">
                                <b-img
                                    :src="require('../../../assets/symbol/icon_fire.png')"
                                    height="20px"
                                />
                            </span>
                            <span v-else-if="data.value === 'earth'">
                                <b-img
                                    :src="require('../../../assets/symbol/icon_earth.png')"
                                    height="20px"
                                />
                            </span>
                            <span v-else-if="data.value === 'ice'">
                                <b-img
                                    :src="require('../../../assets/symbol/icon_ice.png')"
                                    height="20px"
                                />
                            </span>
                            <span v-else-if="data.value === 'light'">
                                <b-img
                                    :src="require('../../../assets/symbol/icon_light.png')"
                                    height="20px"
                                />
                            </span>
                            <span v-else-if="data.value === 'dark'">
                                <b-img
                                    :src="require('../../../assets/symbol/icon_dark.png')"
                                    height="20 px"
                                />
                            </span>
                            <span v-else></span>
                        </template>
                        <template v-slot:cell(role)="data">
                            <span v-if="data.value === 'knight'">
                                <b-img
                                    :src="require('../../../assets/symbol/icon_class_knight.png')"
                                    height="20px"
                                />
                            </span>
                            <span v-else-if="data.value === 'warrior'">
                                <b-img
                                    :src="require('../../../assets/symbol/icon_class_warrior.png')"
                                    height="20px"
                                />
                            </span>
                            <span v-else-if="data.value === 'ranger'">
                                <b-img
                                    :src="require('../../../assets/symbol/icon_class_ranger.png')"
                                    height="20px"
                                />
                            </span>
                            <span v-else-if="data.value === 'thief'">
                                <b-img
                                    :src="require('../../../assets/symbol/icon_class_thief.png')"
                                    height="20px"
                                />
                            </span>
                            <span v-else-if="data.value === 'mage'">
                                <b-img
                                    :src="require('../../../assets/symbol/icon_class_mage.png')"
                                    height="20px"
                                />
                            </span>
                            <span v-else-if="data.value === 'soul weaver'">
                                <b-img
                                    :src="
                                        require('../../../assets/symbol/icon_class_soulweaver.png')
                                    "
                                    height="20px"
                                />
                            </span>
                            <span v-else></span>
                        </template>
                        <template v-slot:cell(rarity)="data">
                            <span v-if="data.value === '1'">
                                <b-icon-star-fill />
                            </span>
                            <span v-if="data.value === '2'">
                                <b-icon-star-fill />
                                <b-icon-star-fill />
                            </span>
                            <span v-if="data.value === '3'">
                                <b-icon-star-fill />
                                <b-icon-star-fill />
                                <b-icon-star-fill />
                            </span>
                            <span v-if="data.value === '4'">
                                <b-icon-star-fill />
                                <b-icon-star-fill />
                                <b-icon-star-fill />
                                <b-icon-star-fill />
                            </span>
                            <span v-if="data.value === '5'">
                                <b-icon-star-fill />
                                <b-icon-star-fill />
                                <b-icon-star-fill />
                                <b-icon-star-fill />
                                <b-icon-star-fill />
                            </span>
                        </template>
                        <template v-slot:cell(bra)="data">
                            <p>{{ getAttack(data.item, 60, 6) }}</p>
                        </template>
                        <template v-slot:cell(int)="data">
                            <p>{{ getHealth(data.item, 60, 6) }}</p>
                        </template>
                        <template v-slot:cell(fai)="data">
                            <p>{{ getDefense(data.item, 60, 6) }}</p>
                        </template>
                        <template v-slot:cell(des)="data">
                            <p>{{ getSpeed(data.item, 60, 6) }}</p>
                        </template>
                    </b-table>
                </div>
            </b-row>
        </div>
    </b-container>
</template>
<script>
import { mapGetters } from 'vuex'
import HeroStatService from '@/services/hero-stat.service'

export default {
    name: 'hero-search',
    data() {
        return {
            sortBy: '',
            isDescending: '',

            heroSearchForm: {
                name: '',
                elements: [],
                classes: [],
                grades: [],
                imprint: ''
            },
            /* Array of tags - Keeps track of active tags
               Objects added to this array will display as an active tag */
            tags: [],
            /* Table columns
               In order to add columns they must have the corresponding key stored here
               tdClass handles individual CSS formatting
               # Name column is listed separately since if all the columns are set to the same width it normalizes the table spacing again (may remove) */
            fields: [
                { key: 'id', tdClass: 'IDColumn' },
                { key: 'Hero_icon', tdClass: 'faceColumn' },
                { key: 'name', tdClass: 'NameColumn', sortable: true },
                { key: 'element', tdClass: 'symbolColumn' },
                { key: 'role', tdClass: 'symbolColumn' },
                { key: 'rarity', tdClass: 'gradeColumn' },
                { key: 'bra', tdClass: 'statColumn', sortable: true },
                { key: 'int', tdClass: 'statColumn', sortable: true },
                { key: 'fai', tdClass: 'statColumn', sortable: true },
                { key: 'des', tdClass: 'statColumn', sortable: true }
            ],
            // Allowed dictionary of tag keywords
            tagRemoved: '',
            tagMap: {},

            /* Old */
            /* Redundant START */
            imprints: [
                { text: 'Imprint', value: null },
                'Attack',
                'Defense',
                'Health',
                'Speed',
                'CritRate',
                'CritDamage',
                'Effectiveness',
                'Effect Resistance',
                'Dual Attack Chance',
                'Attack%',
                'Defense%',
                'Health%'
            ],
            /* Redundant END */
            /* Required by Element switchbox */
            elementOptions: [
                { text: 'Fire', value: 'fire', symbol: 'symbol/icon_fire.png' },
                { text: 'Earth', value: 'earth', symbol: 'symbol/icon_earth.png' },
                { text: 'Ice', value: 'ice', symbol: 'symbol/icon_ice.png' },
                { text: 'Light', value: 'light', symbol: 'symbol/icon_light.png' },
                { text: 'Dark', value: 'dark', symbol: 'symbol/icon_dark.png' }
            ],
            /* Required by Class switchbox */
            classOptions: [
                { text: 'Knight', value: 'knight', symbol: 'symbol/icon_class_knight.png' },
                { text: 'Warrior', value: 'warrior', symbol: 'symbol/icon_class_warrior.png' },
                { text: 'Ranger', value: 'ranger', symbol: 'symbol/icon_class_ranger.png' },
                { text: 'Thief', value: 'thief', symbol: 'symbol/icon_class_thief.png' },
                { text: 'Mage', value: 'mage', symbol: 'symbol/icon_class_mage.png' },
                {
                    text: 'Soul Weaver',
                    value: 'soulweaver',
                    symbol: 'symbol/icon_class_soulweaver.png'
                }
            ],
            /* Required by Grade switchbox */
            gradeOptions: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' },
                { text: '5', value: '5' }
            ]
        }
    },
    created() {
        this.loadTagMap()
    },
    methods: {
        getAttack: HeroStatService.getAttack,
        getHealth: HeroStatService.getHealth,
        getDefense: HeroStatService.getDefense,
        getSpeed: HeroStatService.getSpeed,
        sortHeroTable: HeroStatService.sortHeroTable,

        /**
         * Adds Element, Class, and Grade options to the tag list.
         */
        loadTagMap() {
            this.addListToDictionary(this.elementOptions, 'Element', this.tagMap)
            this.addListToDictionary(this.classOptions, 'Class', this.tagMap)
            this.addListToDictionary(this.gradeOptions, 'Grade', this.tagMap)
        },
        /**
         * Populates dictionary with each entity in list, adding a type field to each entity.
         * Assumes that a property list[i].value is set for all entities in list[i].
         * Uses list[i].value as the entity's dictionary key.
         * @param list
         * @param type
         * @param dictionary
         */
        addListToDictionary(list, type, dictionary) {
            for (let i = 0; i < list.length; i++) {
                const entity = list[i]
                dictionary[String(entity.value).toLowerCase()] = { ...entity, type }
            }
        },
        /* Sorting functionality  */
        changeSort(e) {
            console.log(e)
            this.sortBy = e.sortBy
            this.isDescending = e.sortDesc
        },
        resetSort() {
            this.sortBy = ''
            this.isDescending = ''
        },
        nameSort() {
            if (this.sortBy === 'name') {
                this.isDescending = !this.isDescending
            } else {
                this.sortBy = 'name'
                this.isDescending = true
            }
        },
        attackSort() {
            if (this.sortBy === 'bra') {
                this.isDescending = !this.isDescending
            } else {
                this.sortBy = 'bra'
                this.isDescending = true
            }
        },
        healthSort() {
            if (this.sortBy === 'int') {
                this.isDescending = !this.isDescending
            } else {
                this.sortBy = 'int'
                this.isDescending = true
            }
        },
        defenseSort() {
            if (this.sortBy === 'fai') {
                this.isDescending = !this.isDescending
            } else {
                this.sortBy = 'fai'
                this.isDescending = true
            }
        },
        speedSort() {
            if (this.sortBy === 'des') {
                this.isDescending = !this.isDescending
            } else {
                this.sortBy = 'des'
                this.isDescending = true
            }
        },
        classDropdownChanged(selections) {
            console.log('classDropdownChanged', selections)
        },
        elementDropdownChanged(selections) {
            console.log('elementDropdownChanged', selections)
        },
        gradeDropdownChanged(selections) {
            console.log('gradeDropdownChanged', selections)
        },
        tagsSrOutput(tags) {
            const srOutputValues = tags.map((v) => v.text)
            return `"${srOutputValues.join(',')}"`
        },
        tagSymbol(tag) {
            if (tag && tag.symbol) {
                return this.renderSymbol(tag.symbol)
            }
            return ''
        },
        renderSymbol(symbol) {
            return require(`@/assets/${symbol}`)
        },
        retrieveContextualFormList(type, form) {
            if (type && form) {
                let contextualFormList = []
                switch (type.toLowerCase()) {
                    case 'element':
                        contextualFormList = form.elements
                        break
                    case 'class':
                        contextualFormList = form.classes
                        break
                    case 'grade':
                        contextualFormList = form.grades
                        break
                }
                return contextualFormList
            }
        },
        addTagToForm(tag, form) {
            if (tag && tag.type && form) {
                const contextualFormList = this.retrieveContextualFormList(tag.type, form)
                contextualFormList.push(tag.value)
            }
        },
        removeTagFromForm(tag, form) {
            if (tag && tag.type && form) {
                const contextualFormList = this.retrieveContextualFormList(tag.type, form)
                contextualFormList.splice(contextualFormList.indexOf(tag.value), 1)
            }
        },
        enterTag() {
            // Verify if tag is allowed and if so, add it
            const tag = this.tagMap[String(this.heroSearchForm.name).toLowerCase()]
            if (tag) {
                this.addTagToForm(tag, this.heroSearchForm)
                this.tags.push(tag)
                this.heroSearchForm.name = ''
            }
        },
        backspaceTag() {
            // # ISSUE: b-form-input emits function with delay meaning the form is empty by the time this function
            //          reads the form
            if (this.heroSearchForm.name.length === 0) {
                // If the input section is empty, remove the last tag in the list
                const tagBeingRemoved = this.tags.pop()
                this.deleteTag(tagBeingRemoved)
            }
        },
        tagDeleteButton(i) {
            const tagBeingDeleted = this.tags.splice(i, 1)[0]
            this.deleteTag(tagBeingDeleted)
        },
        deleteTag(tag) {
            this.removeTagFromForm(tag, this.heroSearchForm)
            this.tagRemoved = '(Tag removed) ' + tag.text
        },
        /* Function is emitted when a table row is clicked */
        loadDetailed(e) {
            this.$emit('sidebarToggle', e.id)
        }
    },
    computed: {
        ...mapGetters('hero', ['search']),
        heroSearchResults() {
            return this.search(this.heroSearchForm)
        }
    }
}
</script>
<style lang="less">
@import '../../../less/variables.less';

.search-content {
    overflow-y: scroll;
    height: 93vh;
}

.searchresults {
    min-width: 600px;
    width: 40vw;
}

/* Tag searching form input */
.search-form {
    background-color: #222731;
    color: #f1f1f1;
    box-shadow: none !important;
    border: 0;
    width: 25vw;
}

.search-form :focus {
    background-color: #222731;
    color: #f1f1f1;
    box-shadow: none !important;
    border: 0;
}

/* Nav Bar */
.dropdownBar {
    font-size: 14px;
    border: 1px solid #222731;
    border-radius: 3px;
    box-shadow: none !important;
    outline: 0;
    height: 3.5vh;
    min-width: 600px;
    width: 40vw;
}

.dropdownItems {
    min-width: 600px;
    width: 40vw;
}

.switchbox {
    color: #f1f1f1;
    padding-left: 10px;
    font-size: 12px;
    width: 6vw;
}

.navItemSort {
    text-align: left;
    width: 3vw;
}

.navSpacer {
    width: 3vw;
}

.navItemName {
    width: 13vw;
    text-align: left;
}

.navItemElement {
    width: 5vw;
}

.navItemClass {
    width: 5vw;
}

.navItemGrade {
    width: 5vw;
}

.navItemAtk {
    width: 5vw;
}

.navItemHP {
    margin-left: -2vw;
    width: 5vw;
}

.navItemDef {
    margin-left: -2vw;
    width: 5vw;
}

.navItemSpd {
    margin-right: -1vw;
    margin-left: -2vw;
    width: 5vw;
}

/* b-table */
.d-inline-block {
    padding: 5px;
    vertical-align: middle;
    font-size: 14px;
    background-color: #393c43;
    border-radius: 50px;
    line-height: 1.5;
}

.d-inline-block :focus {
    box-shadow: none !important;
    outline: 0;
}

.table {
    vertical-align: middle;
    color: #f1f1f1;
    background-color: #252b35;
    box-shadow: none !important;
    border: 0;
}

/* Mobile only specifications */
@media only screen and (max-width: 970px) {
    .search-form {
        width: 70vw;
    }

    .searchresults {
        width: 100vw;
    }

    .dropdownItems {
        width: 100vw;
    }

    .dropdownBar {
        width: 100vw;
    }
}

/* Reserved for side drawer content */
.search-tags-container {
    vertical-align: middle;
    font-size: 12px;
    line-height: 0px;
}

.search-tags-container img {
    vertical-align: middle;
    width: 20px;
    height: 20px;
}
</style>
