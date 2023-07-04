<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        md="3"
      >
        <demo-project-view :item="project_info"></demo-project-view>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text class="pt-8">
            <h2 class="text-xl font-weight-semibold mb-2"> 工数超過要因 </h2>
            <v-divider></v-divider>
          </v-card-text>

          <v-card-text>
            <vue-apex-charts
              :key="pieChart.key"
              type="donut"
              height="400"
              :series="pieChart.series"
              :options="pieChart.chartOptions"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="py-3">
          <v-card-text>
            <h2 class="text-xl font-weight-semibold mb-2">その他情報</h2>
            <v-divider></v-divider>

            <v-list>
              <v-list-item dense class="px-0 mb-n2">
                <span class="font-weight-medium me-2">ドキュメント数:</span>
                <span class="text--secondary">{{ project_info.num_docs }}</span>
              </v-list-item>
              <v-list-item dense class="px-0 mb-n2">
                <span class="font-weight-medium me-2">プランログ数:</span>
                <span class="text--secondary">{{ project_info.num_plan }}</span>
              </v-list-item>
              <v-list-item dense class="px-0 mb-n2">
                <span class="font-weight-medium me-2">レビューログ数:</span>
                <span class="text--secondary">{{ project_info.num_review }}</span>
              </v-list-item>
              <v-list-item dense class="px-0 mb-n2">
                <span class="font-weight-medium me-2">振り返りログ数:</span>
                <span class="text--secondary">{{ project_info.num_retrospect }}</span>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text class="pt-8">
            <h2 class="text-xl font-weight-semibold mb-2">プロダクトバックログ</h2>
            <v-divider></v-divider>
          </v-card-text>

          <v-card-text class="text-center">
            <vue-apex-charts
              :key="backLogData.series[0].data.length"
              type="line"
              height="400"
              :options="chartOptions"
              :series="backLogData.series"
            />
            <span class="text-xl font-weight-bold sprint-font">スプリント</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text class="pt-8">
            <h2 class="text-xl font-weight-semibold mb-2">生産性</h2>
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
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text class="pt-8">
            <h2 class="text-xl font-weight-semibold mb-2">Push数</h2>
            <v-divider></v-divider>
          </v-card-text>

          <v-card-text class="text-center">
            <vue-apex-charts
              :key="pushData.series[0].data.length"
              type="line"
              height="400"
              :options="chartOptions"
              :series="pushData.series"
            />
            <span class="text-xl font-weight-bold sprint-font">スプリント</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text class="pt-8">
            <h2 class="text-xl font-weight-semibold mb-2">PR数</h2>
            <v-divider></v-divider>
          </v-card-text>

          <v-card-text class="text-center">
            <vue-apex-charts
              :key="prData.series[0].data.length"
              type="line"
              height="400"
              :options="chartOptions"
              :series="prData.series"
            />
            <span class="text-xl font-weight-bold sprint-font">スプリント</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text class="pt-8">
            <h2 class="text-xl font-weight-semibold mb-2">リリース数</h2>
            <v-divider></v-divider>
          </v-card-text>

          <v-card-text class="text-center">
            <vue-apex-charts
              :key="releaseData.series[0].data.length"
              type="line"
              height="400"
              :options="chartOptions"
              :series="releaseData.series"
            />
            <span class="text-xl font-weight-bold sprint-font">スプリント</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text class="pt-8">
            <h2 class="text-xl font-weight-semibold mb-2">技術的負債</h2>
            <v-divider></v-divider>
          </v-card-text>

          <v-card-text class="text-center">
            <vue-apex-charts
              :key="debtData.series[0].data.length"
              type="line"
              height="400"
              :options="chartOptions"
              :series="debtData.series"
            />
            <span class="text-xl font-weight-bold sprint-font">スプリント</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text class="pt-8">
            <h2 class="text-xl font-weight-semibold mb-2">コミュニケーション指数</h2>
            <v-divider></v-divider>
          </v-card-text>

          <v-card-text class="text-center">
            <vue-apex-charts
              :key="communicationData.series[0].data.length"
              type="line"
              height="400"
              :options="chartOptions"
              :series="communicationData.series"
            />
            <span class="text-xl font-weight-bold sprint-font">スプリント</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from '@axios'
import VueApexCharts from 'vue-apexcharts'
import themeConfig from '@themeConfig'
import DemoProjectView from './DemoProjectView.vue'
import constData from '@/const'

const $themeColors = themeConfig.themes.light

export default {
  components: {
    DemoProjectView,
    VueApexCharts,
  },
  data() {
    const chartColors = {
      primaryColorShade: '#836AF9',
      yellowColor: '#ffe800',
      successColorShade: '#28dac6',
      warningColorShade: '#ffe802',
      warningLightColor: '#FDAC34',
      infoColorShade: '#299AFF',
      greyColor: '#4F5D70',
      blueColor: '#2c9aff',
      blueLightColor: '#84D0FF',
      greyLightColor: '#EDF1F4',
      tooltipShadow: 'rgba(0, 0, 0, 0.25)',
      lineChartPrimary: '#666ee8',
      lineChartDanger: '#ff4961',
      labelColor: '#6e6b7b',
      grid_line_color: 'rgba(200, 200, 200, 0.2)',
    }

    return {
      project_info: [],
      sprint_info: [],
      pieChart: {
        key: 0,
        series: [],
        chartOptions: {
          chart: {
            width: 380,
            type: 'donut',
          },
          labels: [
            '仕様バグ',
            '技術的困難',
            'ミドルウェア問題',
            'サポート',
            '営業からの割り込み',
            '緊急対応',
            'ミスコミュニケーション',
            'チーム外関係者遅延',
          ],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
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
      backLogData: {
        key: 0,
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
      pushData: {
        series: [
          {
            data: [],
          },
        ],
      },
      prData: {
        series: [
          {
            data: [],
          },
        ],
      },
      releaseData: {
        series: [
          {
            data: [],
          },
        ],
      },
      debtData: {
        series: [
          {
            data: [],
          },
        ],
      },
      communicationData: {
        series: [
          {
            data: [],
          },
        ],
      },
    }
  },
  mounted() {
    const { PRODUCT_API_URL, DEV_API_URL } = constData()
    const url = PRODUCT_API_URL
    const projectId = this.$route.params.id
    axios
      .get(`${url}/project-detail/${projectId}`)
      .then(response => {
        // eslint-disable-next-line prefer-destructuring
        this.project_info = response.data[0]
        this.pieChart.series.push(
          parseFloat(this.project_info.excess_cause_bug),
          parseFloat(this.project_info.excess_cause_technical),
          parseFloat(this.project_info.excess_cause_middle),
          parseFloat(this.project_info.excess_cause_support),
          parseFloat(this.project_info.excess_cause_business),
          parseFloat(this.project_info.excess_cause_emergency),
          parseFloat(this.project_info.excess_cause_communication),
          parseFloat(this.project_info.excess_cause_outside),
        )
        this.pieChart.key += 1
      })
      .catch(error => {
        console.log(error)
      })
    axios
      .get(`${url}/project-sprint/${projectId}`)
      .then(response => {
        // eslint-disable-next-line prefer-destructuring
        this.sprint_info = response.data
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.sprint_info.length; i++) {
          this.chartOptions.xaxis.categories.push(this.sprint_info[i].num_sprint)
          this.backLogData.series[0].data.push(this.sprint_info[i].num_backlog)
          this.teamRateData.series[0].data.push(this.sprint_info[i].team_operation_rate)
          this.pushData.series[0].data.push(this.sprint_info[i].num_push)
          this.prData.series[0].data.push(this.sprint_info[i].num_pr)
          this.releaseData.series[0].data.push(this.sprint_info[i].num_release)
          this.debtData.series[0].data.push(this.sprint_info[i].num_debt)
          this.communicationData.series[0].data.push(this.sprint_info[i].num_communication)
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
