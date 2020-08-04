<template>
<<<<<<< Updated upstream
    <div class="search">
        <div class="container grid-side-500">
            <!-- Search Options -->
            <div class="row">
                <div class="col">
                    <!-- Get Name -->
                    <div>
                        <label for="search-form-name">
                            Name:
                            <b-form-input
                                id="search-form-name"
                                v-model="heroSearchForm.name"
                                placeholder="Name"
                                trim
                                class="input-form"
                            ></b-form-input>
                        </label>
                    </div>

                    <!-- ### Buttons update upon clicking elsewhere on the page ### -->
                    <!-- ### Appearence should update on click for clairity ### -->

                    <!-- ### Basic Options ### -->

                    <!-- Get Element Component -->
                    <div>
                        <search-filter-elements
                            @elementSelection="onElementSelection"
                            v-model="heroSearchForm.elements"
                        ></search-filter-elements>
                    </div>
                    <!-- Get Class Component -->
                    <div>
                        <search-filter-classes
                            @classSelection="onClassSelection"
                            v-model="heroSearchForm.classes"
                        ></search-filter-classes>
                    </div>
                    <!-- Get Grade Component -->
                    <!-- ### Number labels need to be fixed ### -->
                    <div>
                        <search-filter-grades
                            @gradeSelection="onGradeSelection"
                            v-model="heroSearchForm.grades"
                        ></search-filter-grades>
                    </div>

                    <!-- Search Results Options-->
                    <!-- ### Should become redundant as list will update on click ### -->
                    <div>
                        <b-button @click="clearSearch()" variant="danger">Clear</b-button>
                        <b-button @click="search()" variant="primary">Search</b-button>
                    </div>

                    <!-- ### Advanced Options ### -->
                    <hr />
                    --- Test components ---
                    <hr />
                    <!-- Get Zodiac Component -->

                    <!-- ### Trying to see what is best for visual clarity and ease of access ### -->
                    <!-- Get Imprint Component -->
                    <!--                    <div>-->
                    <!--                        <b-form-group id="input-group-3" label="Imprint:" label-for="input-3">-->
                    <!--                            <b-form-select-->
                    <!--                                id="input-3"-->
                    <!--                                class="input-form"-->
                    <!--                                v-model="heroSearchForm.imprint"-->
                    <!--                                :options="imprints"-->
                    <!--                                required-->
                    <!--                                multiple-->
                    <!--                            ></b-form-select>-->
                    <!--                        </b-form-group>-->
                    <!--                    </div>-->
                    <!--                    &lt;!&ndash; Get Imprint-Focus Component &ndash;&gt;-->
                    <!--                    <div>-->
                    <!--                        <b-form-checkbox v-model="checked" name="check-button" switch>-->
                    <!--                            Attack-->
                    <!--                        </b-form-checkbox>-->
                    <!--                        <b-form-checkbox v-model="checked" name="check-button" switch>-->
                    <!--                            Health-->
                    <!--                        </b-form-checkbox>-->
                    <!--                        <b-form-checkbox v-model="checked" name="check-button" switch>-->
                    <!--                            Defense-->
                    <!--                        </b-form-checkbox>-->
                    <!--                        <b-form-checkbox v-model="checked" name="check-button" switch>-->
                    <!--                            Speed-->
                    <!--                        </b-form-checkbox>-->
                    <!--                    </div>-->

                    <!-- Get Attribute Component -->
                    <!-- ### Placeholder for other sorting methods such as sorting by debuff etc. ### -->
                </div>
            </div>

            <!-- Search Results -->
            <div class="hero-search-results">
                <hero-search-results-header></hero-search-results-header>
                <hero-search-result
                    v-for="heroSearchResult in heroSearchResults"
                    :key="heroSearchResult.ID"
                    :hero="heroSearchResult"
                ></hero-search-result>
                <hero-search-no-results
                    v-show="heroSearchResults.length === 0"
                ></hero-search-no-results>
            </div>
            <!-- End Search Results -->
        </div>
    </div>
</template>

<script>
import heroSearchService from '@/services/hero-search.service'
import SearchFilterElements from '@/components/search/search-filter-elements'
import SearchFilterClasses from '@/components/search/search-filter-classes'
import SearchFilterGrades from '@/components/search/search-filter-grades'

import HeroSearchResultsHeader from '@/components/search/hero/hero-search-results-header'
import HeroSearchResult from '@/components/search/hero/hero-search-result'
import HeroSearchNoResults from '@/components/search/hero/hero-search-no-results'
export default {
    name: 'search',
    components: {
        SearchFilterElements,
        SearchFilterClasses,
        SearchFilterGrades,
        HeroSearchResultsHeader,
        HeroSearchResult,
        HeroSearchNoResults
=======
  <div class="search">
    <h1/>


    <div id="searchContent">
      <div class="container grid-side-500">
        <div class="d-flex justify-content-center">
          <div>
            <b-form-tags v-model="value" no-outer-focus class="input-form">
              <template v-slot="{ tags, inputAttrs, inputHandlers, tagVariant, addTag, removeTag }">
                <b-input-group class="search-form">
                  <b-form-input
                    v-model="text"
                    v-bind="inputAttrs"
                    v-on:keyup="changeTags"
                    placeholder="New tag - Press enter to add"
                    class="search-form"
                  ></b-form-input>
                </b-input-group>
                <div class="d-inline-block" style="font-size: 1.5rem;">
                  <b-form-tag
                    v-for="tag in tags"
                    @remove="removeTag(tag)"
                    :key="tag"
                    :title="tag"
                    :variant="tagVariant"
                    class="tag"
                  >{{ tag }}</b-form-tag>
                </div>
              </template>
            </b-form-tags>
          </div>
        </div>
        <b-row class="justify-content-md-center">
          <b-navbar type="dark" variant="dark" class="dropdownBar">
              <b-navbar-nav align="center" small justify class="dropdownItems">
                <b-nav-text><b>Sort:</b></b-nav-text>
                <b-nav-item></b-nav-item>
                <b-nav-item>Name</b-nav-item>

                <b-nav-item-dropdown text="Element" @click.stop="">
                  <b-form-checkbox-group
                    v-model="selected"
                    :options="elementOptions"
                    switches
                    stacked
                    class="switchbox"
                  ></b-form-checkbox-group>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown text="Class" @click.stop="">
                  <b-form-checkbox-group
                    v-model="selected"
                    :options="classOptions"
                    switches
                    stacked
                    class="switchbox"
                  ></b-form-checkbox-group>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown text="Grade" @click.stop="">
                  <b-form-checkbox-group
                    v-model="selected"
                    :options="gradeOptions"
                    switches
                    stacked
                    class="switchbox"
                  ></b-form-checkbox-group>
                </b-nav-item-dropdown>

                <b-nav-item>Atk</b-nav-item>
                <b-nav-item>HP</b-nav-item>
                <b-nav-item>Def</b-nav-item>
                <b-nav-item>Spd</b-nav-item>
              </b-navbar-nav>
            </b-navbar>
        </b-row>
        <h1 />
        <b-row class="justify-content-md-center">
          <div>
            <b-table
            small
            :items="printHeroes"
            :fields="fields"
            responsive="sm"
            class="table"
            selectable
            select-mode="single"
            borderless
            thead-class="hidden_header"
            @row-clicked="loadDetailed"
            ><template v-slot:cell(Face_URL)="data">
              <img :src="data.value">
            </template>
            </b-table>
          </div>
        </b-row>
      </div>
    </div>


  </div>
</template>

<script>
import heroData from '../assets/hero-data.json'

export default {
    name: 'search',
    components: {

>>>>>>> Stashed changes
    },

    data() {
        return {
<<<<<<< Updated upstream
            heroSearchForm: {
                name: '',
                elements: [],
                classes: [],
                grades: [],
                imprint: []
            },
=======
            text: '',
            value: [],
            fields: [
              { key: 'ID',
                tdClass: 'tableColumn' },
              { key: 'Face_URL',
                tdClass: 'tableColumn' },
              { key: 'Name',
                tdClass: 'NameColumn' },
              { key: 'Element',
                tdClass: 'tableColumn' },
              { key: 'Class',
                tdClass: 'tableColumn' },
            ],
            heroData: heroData,
            acceptedTags: [
                // Elements
                'Fire', 'Ice', 'Earth', 'Light', 'Dark'
            ],
>>>>>>> Stashed changes
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

            heroSearchResults: []
        }
    },
    methods: {
        changeTags(e) {
          if (e.keyCode === 13 && this.text != ""){
            for(var i = 0; i < this.acceptedTags.length; i++)
              if(this.text.toUpperCase() == this.acceptedTags[i].toUpperCase()){
                this.value.push(this.acceptedTags[i]);
                this.text = '';
                break;
              }
          }
          else if (e.keyCode === 8 && this.text == ""){
            this.value.pop();
          }
        },
        renderSymbol(symbol) {
            return require(`@/assets/${symbol}`)
        },
<<<<<<< Updated upstream
        onElementSelection(value) {
            this.heroSearchForm.elements = value
        },
        onClassSelection(value) {
            this.heroSearchForm.classes = value
        },
        onGradeSelection(value) {
            this.heroSearchForm.grades = value
        }
=======
        loadDetailed(e){
          console.log(e.ID);
          this.sidebarToggle();
        },
        sidebarToggle(){
          if(document.getElementById("searchContent").style.marginRight == "50vw"){
            document.getElementById("searchContent").style.transitionDuration = "0.35s";
            document.getElementById("searchContent").style.marginRight = "";
          }
          else {
            document.getElementById("searchContent").style.transitionDuration = "0.35s";
            document.getElementById("searchContent").style.marginRight = "50vw";
          }
        },
    },
    computed: {
      printHeroes() {

        return heroData.map((hero) => {
          if(hero.Name != ""){
            return {"ID": hero.ID,
                    "Name": hero.Name,
                    "Face_URL": hero.Face_URL,
                    "Element": hero.Element,
                    "Class": hero.Class
                  };
          }
        })
      },
      printArtifacts() {
        return null;
      },
      printItems() {
        return null;
      },
>>>>>>> Stashed changes
    }
}
</script>

<style>
@import '~../less/variables.less';
.search {
    margin-top: 3vh;
    background: #252b35;
}

.input-form {
    width: 30vw;
    background-color: #252b35;
    color: #f1f1f1;
    box-shadow: none !important;
    border: 0;
}
.search-form {
    background-color: #222731;
    color: #f1f1f1;
    box-shadow: none !important;
    border: 0;
}
<<<<<<< Updated upstream

.grid-side-500 {
    display: grid;
    column-gap: 20px;
    height: 90vh;
=======
.search-form :focus {
    background-color: #222731;
    color: #f1f1f1;
    box-shadow: none !important;
    border: 0;
}

.dropdownBar {
  border: 1px solid #222731;
  border-radius: 3px;
  box-shadow: none !important;
  outline: 0;
  height: 3.5vh;
  max-width: 100vw;
  width: 700px;
}
.dropdownItems {
  width: 700px;
  max-width: 80vw;
}

.tag {
  font-size: 14px;
  background-color: #222731;
  border: 1px solid #f1f1f1;
  border-radius: 3px;
  box-shadow: none !important;
  outline: 0;
>>>>>>> Stashed changes
}
@media (min-width: 500px) {
    .grid-side-500 {
        grid-template-columns: 200px auto;
    }
}
<<<<<<< Updated upstream
=======


.table{
  color: #f1f1f1;
  background-color: #252b35;
  box-shadow: none !important;
  border: 0;
}
.hidden_header {
  display: none;
}
.tableColumn {
  width: 100px !important;
  font-size: 10px;
}
.NameColumn {
}

.navDrawer{
  width: 50vw;
}
@media only screen and (max-width: 600px) {
  .navDrawer{
    width: 100vw;
  }
  .input-form {
    width: 100vw;
  }
}


.detailedContent {
}
>>>>>>> Stashed changes
</style>
