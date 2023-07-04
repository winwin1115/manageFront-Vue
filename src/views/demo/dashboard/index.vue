<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" sm="12">
        <demo-congratulation></demo-congratulation>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <demo-statistics :data="total_info" :key="total_info.length"></demo-statistics>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="item in dash_info" :key="item.id" cols="12" md="3" sm="6" >
        <demo-project :item="item"></demo-project>
      </v-col>
      <v-col cols="12" md="3" sm="6" >
        <demo-place></demo-place>
      </v-col>
      <v-col cols="12" md="3" sm="6" >
        <demo-place></demo-place>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from '@axios'
import DemoCongratulation from './DemoCongratulation.vue'
import DemoStatistics from './DemoStatistics.vue'
import DemoProject from './DemoProject.vue'
import DemoPlace from './DemoPlace.vue'
import constData from '@/const'

export default {
  components: {
    DemoCongratulation,
    DemoStatistics,
    DemoProject,
    DemoPlace,
  },
  data() {
    return {
      dash_info: [],
      total_info: [],
    }
  },
  created() {
    const { PRODUCT_API_URL, DEV_API_URL } = constData()
    const url = PRODUCT_API_URL
    axios.get(`${url}/dash-info`)
      .then(response => {
        this.dash_info = response.data
      })
      .catch(error => {
        console.log(error)
      })
    axios.get(`${url}/dash-total`)
      .then(response => {
        this.total_info = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
}
</script>
