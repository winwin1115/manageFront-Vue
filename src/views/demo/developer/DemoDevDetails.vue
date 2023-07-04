<template>
  <div>
    <v-row>
      <v-col cols="12" md="3">
        <demo-dev-view :data="dev_info"></demo-dev-view>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text class="pt-8">
            <h2 class="text-xl font-weight-semibold mb-2">
              スキル
            </h2>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-text>
            <vue-apex-charts
              :key="skillChart.series[0].data.length"
              type="radar"
              height="400"
              :options="skillChart.chartOptions"
              :series="skillChart.series"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text class="pt-8">
            <h2 class="text-xl font-weight-semibold mb-2">
              影響力
            </h2>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-text>
            <vue-apex-charts
              :key="influenceChart.series[0].data.length"
              type="radar"
              height="400"
              :options="influenceChart.chartOptions"
              :series="influenceChart.series"
            />
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
              :key="operateData.series[0].data.length"
              type="line"
              height="400"
              :options="chartOptions"
              :series="operateData.series"
            />
            <span class="text-xl font-weight-bold sprint-font">スプリント</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text class="pt-8">
            <h2 class="text-xl font-weight-semibold mb-2">
              生産性
            </h2>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-text class="text-center">
            <vue-apex-charts
              :key="productData.series[0].data.length"
              type="line"
              height="400"
              :options="chartOptions"
              :series="productData.series"
            />
            <span class="text-xl font-weight-bold sprint-font">スプリント</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text class="pt-8">
            <h2 class="text-xl font-weight-semibold mb-2">
              メンション数
            </h2>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-text class="text-center">
            <vue-apex-charts
              :key="mensionData.series[0].data.length"
              type="line"
              height="400"
              :options="chartOptions"
              :series="mensionData.series"
            />
            <span class="text-xl font-weight-bold sprint-font">スプリント</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text class="pt-8">
            <h2 class="text-xl font-weight-semibold mb-2">
              スキル一覧
            </h2>
          </v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-uppercase">
                    スキル名
                  </th>
                  <th class="text-center text-uppercase">
                    換算経験月数
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in skill_info"
                  :key="item.skill1_name"
                >
                  <td>{{ item.skill_name }}</td>
                  <td class="text-center">
                    {{ item.skill_months }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from '@axios'
import VueApexCharts from 'vue-apexcharts'
import themeConfig from '@themeConfig'
import DemoDevView from './DemoDevView.vue'
import constData from '@/const'

const $themeColors = themeConfig.themes.light

export default {
  components: {
    DemoDevView,
    VueApexCharts,
  },
  data() {
    const chartColors = {
      column: {
        series1: '#826af9',
        series2: '#d2b0ff',
        bg: '#f8d3ff',
      },
      success: {
        shade_100: '#7eefc7',
        shade_200: '#06774f',
      },
      donut: {
        series1: '#ffe700',
        series2: '#00d4bd',
        series3: '#826bf8',
        series4: '#2b9bf4',
        series5: '#FFA1A1',
      },
      area: {
        series3: '#e0cffe',
        series2: '#b992fe',
        series1: '#ab7efd',
      },
    }

    return {
      dev_info: [],
      dev_rate: [],
      skillChart: {
        series: [
          {
            name: 'スキル',
            data: [],
          },
        ],
        chartOptions: {
          chart: {
            toolbar: {
              show: false,
            },
            dropShadow: {
              enabled: false,
              blur: 8,
              left: 1,
              top: 1,
              opacity: 0.2,
            },
          },
          legend: {
            show: true,
            fontSize: '14px',
            fontFamily: '"Inter", sans-serif',
          },
          yaxis: {
            show: false,
          },
          colors: [chartColors.donut.series1, chartColors.donut.series3],
          xaxis: {
            categories: ['フロントエンド', 'バックエンド', 'インフラ', 'スマホ', 'データベース', 'デザイン'],
          },
          fill: {
            opacity: [1, 0.8],
          },
          stroke: {
            show: false,
            width: 0,
          },
          markers: {
            size: 0,
          },
          grid: {
            show: false,
          },
        },
      },
      influenceChart: {
        series: [
          {
            name: '影響力',
            data: [],
          },
        ],
        chartOptions: {
          chart: {
            toolbar: {
              show: false,
            },
            dropShadow: {
              enabled: false,
              blur: 8,
              left: 1,
              top: 1,
              opacity: 0.2,
            },
          },
          legend: {
            show: true,
            fontSize: '14px',
            fontFamily: '"Inter", sans-serif',
          },
          yaxis: {
            show: false,
          },
          colors: [chartColors.donut.series1, chartColors.donut.series3],
          xaxis: {
            categories: ['賞パワー', '罰パワー', '正当パワー', '魅力パワー', '参照パワー', '専門パワー'],
          },
          fill: {
            opacity: [1, 0.8],
          },
          stroke: {
            show: false,
            width: 0,
          },
          markers: {
            size: 0,
          },
          grid: {
            show: false,
          },
        },
      },
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
      operateData: {
        series: [
          {
            data: [],
          },
        ],
      },
      productData: {
        series: [
          {
            data: [],
          },
        ],
      },
      mensionData: {
        series: [
          {
            data: [],
          },
        ],
      },
      skill_info: [],
    }
  },
  mounted() {
    const { PRODUCT_API_URL, DEV_API_URL } = constData()
    const url = PRODUCT_API_URL
    const devId = this.$route.params.id
    axios.get(`${url}/dev-detail/${devId}`)
      .then(response => {
        // eslint-disable-next-line prefer-destructuring
        this.dev_info = response.data
        this.skillChart.series[0].data.push(this.dev_info.skill_rader_front, this.dev_info.skill_rader_back, this.dev_info.skill_rader_infra, this.dev_info.skill_rader_mobile, this.dev_info.skill_rader_db, this.dev_info.skill_rader_design)
        this.influenceChart.series[0].data.push(this.dev_info.Influence_rader_reward, this.dev_info.Influence_rader_penalty, this.dev_info.Influence_rader_proper, this.dev_info.influence_rader_charm, this.dev_info.Influence_rader_reference, this.dev_info.Influence_rader_specialty)
        // eslint-disable-next-line camelcase
        const skill1_row = {}
        // eslint-disable-next-line camelcase
        const skill2_row = {}
        // eslint-disable-next-line camelcase
        const skill3_row = {}
        // eslint-disable-next-line camelcase
        const skill4_row = {}
        skill1_row.skill_name = this.dev_info.skill1_name
        skill1_row.skill_months = this.dev_info.skill1_months
        this.skill_info.push(skill1_row)
        skill2_row.skill_name = this.dev_info.skill2_name
        skill2_row.skill_months = this.dev_info.skill2_months
        this.skill_info.push(skill2_row)
        skill3_row.skill_name = this.dev_info.skill3_name
        skill3_row.skill_months = this.dev_info.skill3_months
        this.skill_info.push(skill3_row)
        skill4_row.skill_name = this.dev_info.skill4_name
        skill4_row.skill_months = this.dev_info.skill4_months
        this.skill_info.push(skill4_row)
      })
      .catch(error => {
        console.log(error)
      })
    axios.get(`${url}/dev-rate/${devId}`)
      .then(response => {
        // eslint-disable-next-line prefer-destructuring
        this.dev_rate = response.data
        for (let i = 0; i < this.dev_rate.length; i++) {
          this.chartOptions.xaxis.categories.push(this.dev_rate[i].num_sprint)
          this.operateData.series[0].data.push(this.dev_rate[i].operation_rate)
          this.productData.series[0].data.push(this.dev_rate[i].productivity_rate)
          this.mensionData.series[0].data.push(this.dev_rate[i].num_mension)
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