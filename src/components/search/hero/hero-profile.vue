<template>
    <b-container fluid class="detailed-content">
        <div v-if="heroProfile.id" class="container">
            <b-col sm="1" />
            <b-col>
                <b-row>
                    <b-col sm="1">
                        <b-img :src="heroProfile.Hero_icon" height="50px" />
                    </b-col>
                    <b-col>
                        <b-row class="heroTitle">
                            <b-link class="titleLink" @click="expandDetail">
                                <b>{{ heroProfile.name }}</b>
                            </b-link>
                        </b-row>
                        <b-row class="heroDesc">
                            {{ heroProfile.description }}
                        </b-row>
                    </b-col>
                    <b-col class="attributeText">
                        <b-row>
                            <b-col sm="1">
                                <span v-if="heroProfile.element === 'fire'">
                                    <b-img
                                        :src="require('../../../assets/symbol/icon_fire.png')"
                                        height="20px"
                                    />
                                </span>
                                <span v-else-if="heroProfile.element === 'earth'">
                                    <b-img
                                        :src="require('../../../assets/symbol/icon_earth.png')"
                                        height="20px"
                                    />
                                </span>
                                <span v-else-if="heroProfile.element === 'ice'">
                                    <b-img
                                        :src="require('../../../assets/symbol/icon_ice.png')"
                                        height="20px"
                                    />
                                </span>
                                <span v-else-if="heroProfile.element === 'light'">
                                    <b-img
                                        :src="require('../../../assets/symbol/icon_light.png')"
                                        height="20px"
                                    />
                                </span>
                                <span v-else-if="heroProfile.element === 'dark'">
                                    <b-img
                                        :src="require('../../../assets/symbol/icon_dark.png')"
                                        height="20 px"
                                    />
                                </span>
                                <span v-else><b-icon /></span>
                            </b-col>
                            <b-col sm="2">
                                <p>{{ heroProfile.element }}</p>
                            </b-col>
                            <b-col sm="4">
                                <span v-if="heroProfile.rarity === '1'">
                                    <b-icon-star-fill style="width: 10px; height: 10px;" />
                                </span>
                                <span v-if="heroProfile.rarity === '2'">
                                    <b-icon-star-fill style="width: 10px; height: 10px;" />
                                    <b-icon-star-fill style="width: 10px; height: 10px;" />
                                </span>
                                <span v-if="heroProfile.rarity === '3'">
                                    <b-icon-star-fill style="width: 10px; height: 10px;" />
                                    <b-icon-star-fill style="width: 10px; height: 10px;" />
                                    <b-icon-star-fill style="width: 10px; height: 10px;" />
                                </span>
                                <span v-if="heroProfile.rarity === '4'">
                                    <b-icon-star-fill style="width: 10px; height: 10px;" />
                                    <b-icon-star-fill style="width: 10px; height: 10px;" />
                                    <b-icon-star-fill style="width: 10px; height: 10px;" />
                                    <b-icon-star-fill style="width: 10px; height: 10px;" />
                                </span>
                                <span v-if="heroProfile.rarity === '5'">
                                    <b-icon-star-fill style="width: 10px; height: 10px;" />
                                    <b-icon-star-fill style="width: 10px; height: 10px;" />
                                    <b-icon-star-fill style="width: 10px; height: 10px;" />
                                    <b-icon-star-fill style="width: 10px; height: 10px;" />
                                    <b-icon-star-fill style="width: 10px; height: 10px;" />
                                </span>
                                <span v-else><b-icon /></span>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="1">
                                <span v-if="heroProfile.role === 'knight'">
                                    <b-img
                                        :src="
                                            require('../../../assets/symbol/icon_class_knight.png')
                                        "
                                        height="20px"
                                    />
                                </span>
                                <span v-else-if="heroProfile.role === 'warrior'">
                                    <b-img
                                        :src="
                                            require('../../../assets/symbol/icon_class_warrior.png')
                                        "
                                        height="20px"
                                    />
                                </span>
                                <span v-else-if="heroProfile.role === 'ranger'">
                                    <b-img
                                        :src="
                                            require('../../../assets/symbol/icon_class_ranger.png')
                                        "
                                        height="20px"
                                    />
                                </span>
                                <span v-else-if="heroProfile.role === 'thief'">
                                    <b-img
                                        :src="
                                            require('../../../assets/symbol/icon_class_thief.png')
                                        "
                                        height="20px"
                                    />
                                </span>
                                <span v-else-if="heroProfile.role === 'mage'">
                                    <b-img
                                        :src="require('../../../assets/symbol/icon_class_mage.png')"
                                        height="20px"
                                    />
                                </span>
                                <span v-else-if="heroProfile.role === 'soul weaver'">
                                    <b-img
                                        :src="
                                            require('../../../assets/symbol/icon_class_soulweaver.png')
                                        "
                                        height="20px"
                                    />
                                </span>
                                <span v-else><b-icon /></span>
                            </b-col>
                            <b-col sm="2">
                                <p>{{ heroProfile.role }}</p>
                            </b-col>
                            <b-col sm="1"><p>Z-img</p></b-col>
                            <b-col>
                                <p>{{ heroProfile.zodiac }}</p>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col sm="1" />
                </b-row>

                <div>
                    <b-tabs card class="tabNav">
                        <b-tab title="Stats" active>
                            <b-row>
                                <b-col>
                                    <b-row>
                                        <b-col>
                                            <vue-slider
                                                tooltip="none"
                                                v-model="level"
                                                :min="1"
                                                :max="60"
                                            />
                                        </b-col>
                                        <b-col sm="3" class="textInput">
                                            Level:
                                        </b-col>
                                        <b-col sm="1" class="textInput">
                                            <input
                                                v-model="level"
                                                type="number"
                                                step="1"
                                                min="1"
                                                max="60"
                                                @input="
                                                    level = Math.max(
                                                        Math.min(Math.round(level), 60),
                                                        0
                                                    )
                                                "
                                            />
                                        </b-col>
                                        <b-col sm="1" />
                                    </b-row>

                                    <b-row>
                                        <b-col>
                                            <vue-slider
                                                tooltip="none"
                                                v-model="awaken"
                                                :min="0"
                                                :max="6"
                                            />
                                        </b-col>
                                        <b-col sm="3" class="textInput">
                                            Awaken:
                                        </b-col>
                                        <b-col sm="1" class="textInput">
                                            <input
                                                v-model="awaken"
                                                type="number"
                                                step="1"
                                                min="0"
                                                max="6"
                                                @input="
                                                    awaken = Math.max(
                                                        Math.min(Math.round(awaken), 6),
                                                        0
                                                    )
                                                "
                                            />
                                        </b-col>
                                        <b-col sm="1" />
                                    </b-row>

                                    <b-row class="mb-1">
                                        <b-col sm="2">
                                            <b class="statText">
                                                Stats:
                                            </b>
                                        </b-col>
                                    </b-row>

                                    <b-row class="mb-1">
                                        <b-col sm="2" class="statText">
                                            Attack:
                                        </b-col>
                                        <b-col sm="1" class="statText">
                                            <b>{{ Math.floor(this.attack) }}</b>
                                        </b-col>
                                        <b-progress-bar
                                            class="statBar"
                                            variant="success"
                                            :value="Math.floor((attack / 1435) * 50)"
                                        ></b-progress-bar>
                                        <b-col sm="2" />
                                    </b-row>

                                    <b-row class="mb-1">
                                        <b-col sm="2" class="statText">
                                            Health:
                                        </b-col>
                                        <b-col sm="1" class="statText">
                                            <b>{{ Math.floor(this.health) }}</b>
                                        </b-col>
                                        <b-progress-bar
                                            class="statBar"
                                            variant="success"
                                            :value="Math.floor((health / 7323) * 50)"
                                        ></b-progress-bar>
                                        <b-col sm="2" />
                                    </b-row>

                                    <b-row class="mb-1">
                                        <b-col sm="2" class="statText">
                                            Defense:
                                        </b-col>
                                        <b-col sm="1" class="statText">
                                            <b>{{ Math.floor(this.defense) }}</b>
                                        </b-col>
                                        <b-progress-bar
                                            class="statBar"
                                            variant="success"
                                            :value="Math.floor((defense / 776) * 50)"
                                        ></b-progress-bar>
                                        <b-col sm="2" />
                                    </b-row>

                                    <b-row class="mb-1">
                                        <b-col sm="2" class="statText">
                                            Speed:
                                        </b-col>
                                        <b-col sm="1" class="statText">
                                            <b>{{ Math.floor(this.speed) }}</b>
                                        </b-col>
                                        <b-progress-bar
                                            class="statBar"
                                            variant="success"
                                            :value="Math.floor((speed / 129) * 25)"
                                        ></b-progress-bar>
                                        <b-col sm="2" />
                                    </b-row>

                                    <b-row class="mb-1">
                                        <b-col sm="2" class="statText-xs">
                                            Critical Hit Chance:
                                        </b-col>
                                        <b-col sm="1" class="statText">
                                            <b>{{ critChance }}</b>
                                        </b-col>
                                        <b-progress-bar
                                            class="statBar"
                                            variant="success"
                                            :value="Math.floor((critChance / 27) * 25)"
                                        ></b-progress-bar>
                                        <b-col sm="2" />
                                    </b-row>

                                    <b-row class="mb-1">
                                        <b-col sm="2" class="statText-sm">
                                            Critical damage:
                                        </b-col>
                                        <b-col sm="1" class="statText">
                                            <b>{{ critDamage }}</b>
                                        </b-col>
                                        <b-progress-bar
                                            class="statBar"
                                            variant="success"
                                            :value="Math.floor((critDamage / 165) * 25)"
                                        ></b-progress-bar>
                                        <b-col sm="2" />
                                    </b-row>

                                    <b-row class="mb-1">
                                        <b-col sm="2" class="statText">
                                            Effectiveness:
                                        </b-col>
                                        <b-col sm="1" class="statText">
                                            <b>{{ effectiveness }}</b>
                                        </b-col>
                                        <b-progress-bar
                                            class="statBar"
                                            variant="success"
                                            :value="Math.floor((effectiveness / 30) * 25)"
                                        ></b-progress-bar>
                                        <b-col sm="2" />
                                    </b-row>

                                    <b-row class="mb-1">
                                        <b-col sm="2" class="statText-sm">
                                            Effect Resistance:
                                        </b-col>
                                        <b-col sm="1" class="statText">
                                            <b>{{ resistance }}</b>
                                        </b-col>
                                        <b-progress-bar
                                            class="statBar"
                                            variant="success"
                                            :value="Math.floor((resistance / 30) * 25)"
                                        ></b-progress-bar>
                                        <b-col sm="2" />
                                    </b-row>

                                    <b-row class="mb-4">
                                        <b-col sm="2" class="statText-xs">
                                            Dual Attack Chance:
                                        </b-col>
                                        <b-col sm="1" class="statText">
                                            <b>{{ dualattackchance }}</b>
                                        </b-col>
                                        <b-progress-bar
                                            class="statBar"
                                            variant="success"
                                            :value="Math.floor((dualattackchance / 100) * 25)"
                                        ></b-progress-bar>
                                        <b-col sm="2" />
                                    </b-row>

                                    <b-row>
                                        <b-col>
                                            <b-card class="skillCard" v-b-toggle.collapse-1-inner>
                                                <b-row class="mb-2">
                                                    <b-col sm="3">
                                                        <b-img
                                                            :src="heroProfile.Skill_1_icon"
                                                            height="50px"
                                                        />
                                                    </b-col>
                                                    <b-col>
                                                        <b-row>
                                                            {{ heroProfile.Skill_1_name }}
                                                        </b-row>
                                                        <b-row>
                                                            <i style="font-size: 10px;">
                                                                {{
                                                                    'Aquire ' +
                                                                    heroProfile.Skill_1_soul_gain +
                                                                    ' soul'
                                                                }}
                                                            </i>
                                                        </b-row>

                                                        <b-row>
                                                            <i style="font-size: 10px;">
                                                                {{
                                                                    heroProfile.Skill_1_att_rate +
                                                                    ' attack rate, ' +
                                                                    heroProfile.Skill_1_pow +
                                                                    ' pow'
                                                                }}
                                                            </i>
                                                        </b-row>
                                                    </b-col>
                                                </b-row>
                                                <b-card-text>
                                                    {{ heroProfile.Skill_1_description }}
                                                </b-card-text>
                                                <!-- Toggle arrow direction start -->
                                                <span>
                                                    Skill enhance:
                                                    <b-icon-arrow-down />
                                                </span>
                                                <span>
                                                    Skill enhance:
                                                    <b-icon-arrow-up />
                                                </span>
                                                <!-- Toggle arrow direction end -->
                                                <b-collapse id="collapse-1-inner">
                                                    <b-card class="skillCardDetail">
                                                        {{ /* code to iterate through Skill_1_enhance_#_description */ }}
                                                    </b-card>
                                                </b-collapse>
                                            </b-card>
                                        </b-col>
                                        <b-col>
                                            <b-card class="skillCard" v-b-toggle.collapse-2-inner>
                                                <b-row class="mb-2">
                                                    <b-col sm="3">
                                                        <b-img
                                                            :src="heroProfile.Skill_2_icon"
                                                            height="50px"
                                                        />
                                                    </b-col>
                                                    <b-col>
                                                        <b-row>
                                                            {{ heroProfile.Skill_2_name }}
                                                        </b-row>
                                                        <b-row>
                                                            <i style="font-size: 10px;">
                                                                {{
                                                                    'Aquire ' +
                                                                    heroProfile.Skill_2_soul_gain +
                                                                    ' soul'
                                                                }}
                                                            </i>
                                                        </b-row>

                                                        <b-row>
                                                            <i style="font-size: 10px;">
                                                                {{
                                                                    heroProfile.Skill_2_att_rate +
                                                                    ' attack rate, ' +
                                                                    heroProfile.Skill_2_pow +
                                                                    ' pow'
                                                                }}
                                                            </i>
                                                        </b-row>
                                                    </b-col>
                                                </b-row>
                                                <b-card-text>
                                                    {{ heroProfile.Skill_3_description }}
                                                </b-card-text>
                                                <!-- Toggle arrow direction start -->
                                                <span>
                                                    Skill enhance:
                                                    <b-icon-arrow-down />
                                                </span>
                                                <span>
                                                    Skill enhance:
                                                    <b-icon-arrow-up />
                                                </span>
                                                <!-- Toggle arrow direction end -->
                                                <b-collapse id="collapse-2-inner">
                                                    <b-card class="skillCardDetail">
                                                        {{ /* code to iterate through Skill_1_enhance_#_description */ }}
                                                    </b-card>
                                                </b-collapse>
                                            </b-card>
                                        </b-col>
                                        <b-col>
                                            <b-card class="skillCard" v-b-toggle.collapse-3-inner>
                                                <b-row class="mb-2">
                                                    <b-col sm="3">
                                                        <b-img
                                                            :src="heroProfile.Skill_3_icon"
                                                            height="50px"
                                                        />
                                                    </b-col>
                                                    <b-col>
                                                        <b-row>
                                                            {{ heroProfile.Skill_3_name }}
                                                        </b-row>
                                                        <b-row>
                                                            <i style="font-size: 10px;">
                                                                {{
                                                                    'Aquire ' +
                                                                    heroProfile.Skill_3_soul_gain +
                                                                    ' soul'
                                                                }}
                                                            </i>
                                                        </b-row>

                                                        <b-row>
                                                            <i style="font-size: 10px;">
                                                                {{
                                                                    heroProfile.Skill_3_att_rate +
                                                                    ' attack rate, ' +
                                                                    heroProfile.Skill_3_pow +
                                                                    ' pow'
                                                                }}
                                                            </i>
                                                        </b-row>
                                                    </b-col>
                                                </b-row>
                                                <b-card-text>
                                                    {{ heroProfile.Skill_3_description }}
                                                </b-card-text>
                                                <!-- Toggle arrow direction start -->
                                                <span>
                                                    Skill enhance:
                                                    <b-icon-arrow-down />
                                                </span>
                                                <span>
                                                    Skill enhance:
                                                    <b-icon-arrow-up />
                                                </span>
                                                <!-- Toggle arrow direction end -->

                                                <b-collapse id="collapse-3-inner">
                                                    <b-card class="skillCardDetail">
                                                        {{ /* code to iterate through Skill_1_enhance_#_description */ }}
                                                    </b-card>
                                                </b-collapse>
                                            </b-card>
                                        </b-col>
                                    </b-row>
                                </b-col>
                                <b-col sm="1" />
                            </b-row>
                        </b-tab>
                        <b-tab title="Information">
                            <b-card-text>Tab contents 2</b-card-text>
                        </b-tab>
                        <b-tab title="Model Viewer">
                            <b-card-text>Tab contents 3</b-card-text>
                        </b-tab>
                        <b-tab title="Relationships">
                            <b-card-text>Tab contents 4</b-card-text>
                        </b-tab>
                        <b-tab title="Guides">
                            <b-card-text>Tab contents 5</b-card-text>
                        </b-tab>
                    </b-tabs>
                </div>
            </b-col>
            <b-col sm="1" />
        </div>
        <div vif="!heroProfile.id">
            No hero data available for ID: {{ heroId }}
        </div>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { BIcon, BIconStarFill, BIconArrowUp, BIconArrowDown } from 'bootstrap-vue'

import HeroStatService from '@/services/hero-stat.service'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
    name: 'hero-profile',
    props: ['heroId'],
    components: {
        BIcon,
        BIconStarFill,
        BIconArrowUp,
        BIconArrowDown,
        VueSlider
    },
    data() {
        return {
            level: 60,
            awaken: 6
        }
    },
    methods: {
        expandDetail() {}
    },
    computed: {
        ...mapGetters('hero', ['getHeroProfile']),
        heroProfile() {
            return this.getHeroProfile(this.heroId)
        },
        attack: {
            get() {
                return HeroStatService.getAttack(this.heroProfile, this.level, this.awaken)
            }
        },
        health: {
            get() {
                return HeroStatService.getHealth(this.heroProfile, this.level, this.awaken)
            }
        },
        defense: {
            get() {
                return HeroStatService.getDefense(this.heroProfile, this.level, this.awaken)
            }
        },
        speed: {
            get() {
                return HeroStatService.getSpeed(this.heroProfile, this.level, this.awaken)
            }
        },
        critChance: {
            get() {
                return HeroStatService.getCritChance(this.heroProfile, this.awaken)
            }
        },
        critDamage: {
            get() {
                return HeroStatService.getCritDamage(this.heroProfile, this.awaken)
            }
        },
        effectiveness: {
            get() {
                return HeroStatService.getEffectiveness(this.heroProfile, this.awaken)
            }
        },
        resistance: {
            get() {
                return HeroStatService.getResistance(this.heroProfile, this.awaken)
            }
        },
        dualattackchance: {
            get() {
                return HeroStatService.getDualAttack()
            }
        }
    }
}
</script>

<style scoped lang="less">
.detailed-content {
    font-family: Verdana, Helvetica, Arial, sans-serif;
    width: 49vw;
    text-align: left;
}
.detailed-content :focus {
    outline: none !important;
    outline-width: 0 !important;
    box-shadow: none;
}
.tabNav {
    width: 100%;
    background: #252b35;
}
.heroTitle {
    line-height: -1;
}
.heroDesc {
    font-size: 12px;
}
.attributeText {
    font-size: 12px;
}
.textInput {
    text-align: right;
    font-size: 12px;
    height: 24px;
    width: 2vw;
}
.statText {
    text-align: right;
    font-size: 12px;
}
.statText-xs {
    letter-spacing: -1.5px;
    text-align: right;
    font-size: 12px;
}
.statText-sm {
    letter-spacing: -1px;
    text-align: right;
    font-size: 12px;
}
.statBar {
    padding: 5px;
    vertical-align: middle;
    border-radius: 7px;
}
.skillCard {
    font-size: 12px;
    width: 13vw;
    height: 24vh;
    background-color: #222731;
}

.skillCardDetail {
    font-size: 12px;
    background-color: #252b35;
}
</style>
