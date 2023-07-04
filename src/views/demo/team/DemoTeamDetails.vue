<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <h2 class="text-xl font-weight-semibold mb-2">
              チーム
            </h2>
            <v-divider></v-divider>

            <v-list>
              <v-list-item
                dense
                class="px-0 mb-n2"
              >
                <span class="font-weight-medium me-2">プロジェクト名:</span>
                <span class="text--secondary">
                  {{team_info.name}}
                </span>
              </v-list-item>
              <v-list-item
                dense
                class="px-0 mb-n2"
              >
                <span class="font-weight-medium me-2">アラート:</span>
                <span class="text--secondary">{{team_info.alert}}</span>
              </v-list-item>
              <v-list-item
                dense
                class="px-0 mb-n2"
              >
                <span class="font-weight-medium me-2">稼働アラート:</span>
                <span class="text--secondary">{{team_info.operation_alert}}</span>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <h2 class="text-xl font-weight-semibold mb-2">
              組織図
            </h2>

            <v-img size="100" :key="team_info.organization_chart" :src="require(`@/assets/images/chart/${getPictureUrl}`)"></v-img>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text class="pt-8">
            <h2 class="text-xl font-weight-semibold mb-2">
              チームスコア遷移
            </h2>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-text class="text-center">
            <vue-apex-charts
              :key="scoreData.series[0].data.length"
              type="line"
              height="400"
              :options="chartOptions"
              :series="scoreData.series"
            />
            <span class="text-xl font-weight-bold sprint-font">スプリント</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text class="pt-8">
            <h2 class="text-xl font-weight-semibold mb-2">
              稼働
            </h2>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-text class="text-center">
            <vue-apex-charts
              :key="teamRateData.series[0].data.length"
              type="line"
              height="400"
              :options="chartOptions"
              :series="teamRateData.series"
            />
            <span class="text-xl font-weight-bold sprint-font">スプリント</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-text class="pt-8">
            <h2 class="text-xl font-weight-semibold mb-2">
              星取表
            </h2>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text class="text-center">
            <v-data-table
              :headers="tableColumns"
              :items="devListTable"
              :server-items-length="totalListTable"
              :loading="loading"
            >
              <template #[`item.user_name`]="{item}">
                <div class="d-flex align-center">
                  <div class="d-flex flex-column text--primary font-weight-semibold">
                    {{ item.user_name }}
                  </div>
                </div>
              </template>

              <template #[`item.PHP`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item.PHP >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item.PHP >= 25 && item.PHP < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item.PHP < 25 && item.PHP > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item.PHP}}</span>
                </v-tooltip>
              </template>
              <template #[`item.Ruby`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item.Ruby >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item.Ruby >= 25 && item.Ruby < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item.Ruby < 25 && item.Ruby > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item.Ruby}}</span>
                </v-tooltip>
              </template>
              <template #[`item.Java`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item.Java >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item.Java >= 25 && item.Java < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item.Java < 25 && item.Java > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item.Java}}</span>
                </v-tooltip>
              </template>
              <template #[`item.COBOL`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item.COBOL >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item.COBOL >= 25 && item.COBOL < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item.COBOL < 25 && item.COBOL > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item.COBOL}}</span>
                </v-tooltip>
              </template>
              <template #[`item.CPP`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item['C++'] >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item['C++'] >= 25 && item['C++'] < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item['C++'] < 25 && item['C++'] > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item['C++']}}</span>
                </v-tooltip>
              </template>
              <template #[`item.Rust`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item.Rust >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item.Rust >= 25 && item.Rust < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item.Rust < 25 && item.Rust > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item.Rust}}</span>
                </v-tooltip>
              </template>
              <template #[`item.Swift`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item.Swift >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item.Swift >= 25 && item.Swift < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item.Swift < 25 && item.Swift > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item.Swift}}</span>
                </v-tooltip>
              </template>
              <template #[`item.Kotlin`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item.Kotlin >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item.Kotlin >= 25 && item.Kotlin < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item.Kotlin < 25 && item.Kotlin > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item.Kotlin}}</span>
                </v-tooltip>
              </template>
              <template #[`item.Python`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item.Python >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item.Python >= 25 && item.Python < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item.Python < 25 && item.Python > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item.Python}}</span>
                </v-tooltip>
              </template>
              <template #[`item.Laravel`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item.Laravel >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item.Laravel >= 25 && item.Laravel < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item.Laravel < 25 && item.Laravel > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item.Laravel}}</span>
                </v-tooltip>
              </template>
              <template #[`item.RoR`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item['Ruby on Rails'] >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item['Ruby on Rails'] >= 25 && item['Ruby on Rails'] < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item['Ruby on Rails'] < 25 && item['Ruby on Rails'] > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item['Ruby on Rails']}}</span>
                </v-tooltip>
              </template>
              <template #[`item.Spring`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item.Spring >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item.Spring >= 25 && item.Spring < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item.Spring < 25 && item.Spring > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item.Spring}}</span>
                </v-tooltip>
              </template>
              <template #[`item.ASM`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item.ASM >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item.ASM >= 25 && item.ASM < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item.ASM < 25 && item.ASM > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item.ASM}}</span>
                </v-tooltip>
              </template>
              <template #[`item.iOS`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item.iOS >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item.iOS >= 25 && item.iOS < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item.iOS < 25 && item.iOS > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item.iOS}}</span>
                </v-tooltip>
              </template>
              <template #[`item.Android`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item.Android >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item.Android >= 25 && item.Android < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item.Android < 25 && item.Android > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item.Android}}</span>
                </v-tooltip>
              </template>
              <template #[`item.R`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item.R >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item.R >= 25 && item.R < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item.R < 25 && item.R > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item.R}}</span>
                </v-tooltip>
              </template>
              <template #[`item.MySQL`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item.MySQL >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item.MySQL >= 25 && item.MySQL < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item.MySQL < 25 && item.MySQL > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item.MySQL}}</span>
                </v-tooltip>
              </template>
              <template #[`item.PostgreSQL`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item.PostgreSQL >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item.PostgreSQL >= 25 && item.PostgreSQL < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item.PostgreSQL < 25 && item.PostgreSQL > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item.PostgreSQL}}</span>
                </v-tooltip>
              </template>
              <template #[`item.ORACLE`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item.ORACLE >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item.ORACLE >= 25 && item.ORACLE < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item.ORACLE < 25 && item.ORACLE > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item.ORACLE}}</span>
                </v-tooltip>
              </template>
              <template #[`item.DynamoDB`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item.DynamoDB >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item.DynamoDB >= 25 && item.DynamoDB < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item.DynamoDB < 25 && item.DynamoDB > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item.DynamoDB}}</span>
                </v-tooltip>
              </template>
              <template #[`item.AWS`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item.AWS >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item.AWS >= 25 && item.AWS < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item.AWS < 25 && item.AWS > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item.AWS}}</span>
                </v-tooltip>
              </template>
              <template #[`item.GCP`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item.GCP >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item.GCP >= 25 && item.GCP < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item.GCP < 25 && item.GCP > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item.GCP}}</span>
                </v-tooltip>
              </template>
              <template #[`item.Azure`]="{item}">
                <v-tooltip bottom>
                  <template #activator="{ on: tooltip }">
                    <v-icon v-if="item.Azure >= 50" v-on="tooltip" color="success">
                      {{ icons.mdiCircleDouble }}
                    </v-icon>
                    <v-icon v-if="item.Azure >= 25 && item.Azure < 50" v-on="tooltip" color="warning">
                      {{ icons.mdiCircleOutline }}
                    </v-icon>
                    <v-icon v-if="item.Azure < 25 && item.Rust > 0" v-on="tooltip" color="error">
                      {{ icons.mdiTriangleOutline }}
                    </v-icon>
                  </template>
                  <span>{{item.Azure}}</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiCircleDouble, mdiCircleOutline, mdiTriangleOutline } from '@mdi/js'
import axios from '@axios'
import VueApexCharts from 'vue-apexcharts'
import themeConfig from '@themeConfig'
import { avatarText } from '@core/utils/filter'
import constData from '@/const'

const $themeColors = themeConfig.themes.light

export default {
  components: {
    VueApexCharts,
  },
  data() {
    return {
      icons: {
        mdiCircleDouble,
        mdiCircleOutline,
        mdiTriangleOutline,
      },
      team_info: [],
      sprint_info: [],
      chartOptions: {
        chart: {
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        markers: {
          strokeWidth: 7,
          strokeOpacity: 1,
          strokeColors: [$themeColors.secondary],
          colors: [$themeColors.warning],
        },
        colors: [$themeColors.warning],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
        },
        tooltip: {
          custom(data) {
            return `${'<div class="px-1 py-50"><span>'}${
              data.series[data.seriesIndex][data.dataPointIndex]
            }</span></div>`
          },
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          // opposite: isRtl,
        },
      },
      scoreData: {
        series: [
          {
            data: [],
          },
        ],
      },
      teamRateData: {
        series: [
          {
            data: [],
          },
        ],
      },
      tableColumns: [
        { text: '名前', value: 'user_name', width: '150px' },
        { text: 'PHP', value: 'PHP', width: '100px' },
        { text: 'Ruby', value: 'Ruby', width: '100px' },
        { text: 'Java', value: 'Java', width: '100px' },
        { text: 'COBOL', value: 'COBOL', width: '100px' },
        { text: 'C++', value: 'CPP', width: '100px' },
        { text: 'Rust', value: 'Rust', width: '100px' },
        { text: 'Swift', value: 'Swift', width: '100px' },
        { text: 'Kotlin', value: 'Kotlin', width: '100px' },
        { text: 'Python', value: 'Python', width: '100px' },
        { text: 'Laravel', value: 'Laravel', width: '100px' },
        { text: 'Ruby on Rails', value: 'RoR', width: '150px' },
        { text: 'Spring', value: 'Spring', width: '100px' },
        { text: 'ASM', value: 'ASM', width: '100px' },
        { text: 'iOS', value: 'iOS', width: '100px' },
        { text: 'Android', value: 'Android', width: '100px' },
        { text: 'R', value: 'R', width: '100px' },
        { text: 'MySQL', value: 'MySQL', width: '100px' },
        { text: 'PostgreSQL', value: 'PostgreSQL', width: '150px' },
        { text: 'ORACLE', value: 'ORACLE', width: '100px' },
        { text: 'DynamoDB', value: 'DynamoDB', width: '150px' },
        { text: 'AWS', value: 'AWS', width: '100px' },
        { text: 'GCP', value: 'GCP', width: '100px' },
        { text: 'Azure', value: 'Azure', width: '100px' },
      ],
      totalListTable: 0,
      devListTable: [],
      loading: false,
      skill_name: ['PHP', 'Ruby', 'Java', 'COBOL', 'C++', 'Rust', 'Swift', 'Kotlin', 'Python', 'Laravel', 'Ruby on Rails', 'Spring', 'ASM', 'iOS', 'Android', 'R', 'MySQL', 'PostgreSQL', 'ORACLE', 'DynamoDB', 'AWS', 'GCP', 'Azure'],
    }
  },
  computed: {
    getPictureUrl() {
      return this.team_info.organization_chart || 'project1.png'
    },
  },
  mounted() {
    const { PRODUCT_API_URL, DEV_API_URL } = constData()
    const url = PRODUCT_API_URL
    const teamId = this.$route.params.id
    axios.get(`${url}/team-detail/${teamId}`)
      .then(response => {
        // eslint-disable-next-line prefer-destructuring
        this.team_info = response.data[0]
      })
      .catch(error => {
        console.log(error)
      })
    axios.get(`${url}/project-sprint/${teamId}`)
      .then(response => {
        // eslint-disable-next-line prefer-destructuring
        this.sprint_info = response.data
        for (let i = 0; i < this.sprint_info.length; i++) {
          this.chartOptions.xaxis.categories.push(this.sprint_info[i].num_sprint)
          this.scoreData.series[0].data.push(this.sprint_info[i].num_backlog)
          this.teamRateData.series[0].data.push(this.sprint_info[i].team_operation_rate)
        }
      })
      .catch(error => {
        console.log(error)
      })
    axios.get(`${url}/team-dev/${teamId}`)
      .then(response => {
        this.totalListTable = response.data.length
        for (let i = 0; i < response.data.length; i++) {
          const skill_row = {}
          skill_row.user_name = response.data[i].name
          for (let j = 0; j < this.skill_name.length; j++) {
            if (response.data[i].skill1_name === this.skill_name[j])
            {
              skill_row[this.skill_name[j]] = response.data[i].skill1_months
            }
            else if (response.data[i].skill2_name === this.skill_name[j])
            {
              skill_row[this.skill_name[j]] = response.data[i].skill2_months
            }
            else if (response.data[i].skill3_name === this.skill_name[j])
            {
              skill_row[this.skill_name[j]] = response.data[i].skill3_months
            }
            else if (response.data[i].skill4_name === this.skill_name[j])
            {
              skill_row[this.skill_name[j]] = response.data[i].skill4_months
            }
            else
            {
              skill_row[this.skill_name[j]] = 0
            }
          }
          this.devListTable.push(skill_row)
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
}
</script>

<style lang="scss" scoped>
  .sprint-font {
    color: #000;
  }
</style>
