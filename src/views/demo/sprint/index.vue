<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card class="py-3">
          <v-card-text>
            <h2 class="text-xl font-weight-semibold mb-2">前スプリント</h2>
            <v-divider></v-divider>
          </v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-card-text>
                <v-list>
                  <v-list-item dense class="px-0 mb-n2">
                    <span class="font-weight-medium me-2">チケット数:</span>
                    <span class="text--secondary">{{ prev_info.num_ticket }}</span>
                  </v-list-item>
                  <v-list-item dense class="px-0 mb-n2">
                    <span class="font-weight-medium me-2">完了工数合計:</span>
                    <span class="text--secondary">{{ prev_info.num_done }}</span>
                  </v-list-item>
                  <v-list-item dense class="px-0 mb-n2">
                    <span class="font-weight-medium me-2">Push数:</span>
                    <span class="text--secondary">{{ prev_info.num_push }}</span>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-col>
            <v-col cols="12" md="6">
              <v-card-text>
                <v-list>
                  <v-list-item dense class="px-0 mb-n2">
                    <span class="font-weight-medium me-2">緊急対応数:</span>
                    <span class="text--secondary">{{ prev_info.num_emergency }}</span>
                  </v-list-item>
                  <v-list-item dense class="px-0 mb-n2">
                    <span class="font-weight-medium me-2">改修工数:</span>
                    <span class="text--secondary">{{ prev_info.num_improvement }}</span>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-card>
                <v-card-title>
                  <span>PR数</span>
                  <v-spacer></v-spacer>
                </v-card-title>
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
                <v-card-title>
                  <span>工数超過要因</span>
                  <v-spacer></v-spacer>
                </v-card-title>
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
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <h2 class="text-xl font-weight-semibold mb-2">今スプリント</h2>
            <v-divider></v-divider>
          </v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-card-text>
                <v-list>
                  <v-list-item dense class="px-0 mb-n2">
                    <span class="font-weight-medium me-2">チケット数:</span>
                    <span class="text--secondary">{{ now_info.num_ticket }}</span>
                  </v-list-item>
                  <v-list-item dense class="px-0 mb-n2">
                    <span class="font-weight-medium me-2">緊急対応数:</span>
                    <span class="text--secondary">{{ now_info.num_emergency }}</span>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-col>
            <v-col cols="12" md="6">
              <v-card-text>
                <v-list>
                  <v-list-item dense class="px-0 mb-n2">
                    <span class="font-weight-medium me-2">完了工数合計:</span>
                    <span class="text--secondary">{{ now_info.num_done }}</span>
                  </v-list-item>
                  <v-list-item dense class="px-0 mb-n2">
                    <span class="font-weight-medium me-2">完了割合:</span>
                    <span class="text--secondary">{{ (now_info.num_done / now_info.num_ticket) * 100 }}</span>
                  </v-list-item>
                  <v-list-item dense class="px-0 mb-n2">
                    <span class="font-weight-medium me-2">改修工数:</span>
                    <span class="text--secondary">{{ now_info.num_improvement }}</span>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from '@axios'
import VueApexCharts from 'vue-apexcharts'
import themeConfig from '@themeConfig'
import constData from '@/const'

const $themeColors = themeConfig.themes.light

export default {
  components: {
    VueApexCharts,
  },
  data() {
    return {
      prev_info: [],
      now_info: [],
      pr_info: [],
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
      prData: {
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
    axios
      .get(`${url}/sprint-now`)
      .then(response => {
        // eslint-disable-next-line prefer-destructuring
        this.now_info = response.data.now_data[0]
        // eslint-disable-next-line prefer-destructuring
        this.prev_info = response.data.prev_data[0]
        this.pieChart.series.push(
          parseFloat(this.prev_info.excess_cause_bug),
          parseFloat(this.prev_info.excess_cause_technical),
          parseFloat(this.prev_info.excess_cause_middle),
          parseFloat(this.prev_info.excess_cause_support),
          parseFloat(this.prev_info.excess_cause_business),
          parseFloat(this.prev_info.excess_cause_emergency),
          parseFloat(this.prev_info.excess_cause_communication),
          parseFloat(this.prev_info.excess_cause_outside),
        )
        this.pieChart.key += 1
      })
      .catch(error => {
        console.log(error)
      })
    axios
      .get(`${url}/project-sprint/1`)
      .then(response => {
        this.pr_info = response.data
        for (let i = 0; i < this.pr_info.length; i++) {
          this.chartOptions.xaxis.categories.push(this.pr_info[i].num_sprint)
          this.prData.series[0].data.push(this.pr_info[i].num_pr)
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
