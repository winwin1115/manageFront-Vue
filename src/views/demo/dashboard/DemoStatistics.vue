<template>
  <v-card>
    <v-card-title class="align-start">
      <span class="font-weight-semibold">統計</span>
    </v-card-title>

    <v-card-subtitle class="mb-7">
      <span>現在、</span>
      <span class="font-weight-semibold text--primary me-1">プロジェクト</span>
      <span>、</span>
      <span class="font-weight-semibold text--primary me-1">チーム</span>
      <span>、</span>
      <span class="font-weight-semibold text--primary me-1">開発者</span>
    </v-card-subtitle>

    <v-card-text>
      <v-row>
        <v-col
          v-for="data in statisticsData"
          :key="data.title"
          cols="6"
          sm="4"
          class="d-flex align-center"
        >
          <v-avatar
            size="44"
            :color="resolveStatisticsIconVariation (data.title).color"
            rounded
            class="elevation-1"
          >
            <v-icon
              dark
              color="white"
              size="30"
            >
              {{ resolveStatisticsIconVariation (data.title).icon }}
            </v-icon>
          </v-avatar>

          <div class="ms-3">
            <p class="text-xs mb-0">
              {{ data.title }}
            </p>
            <h3 class="text-xl font-weight-bold">
              {{ data.total }}
            </h3>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiAccountOutline, mdiArchiveOutline, mdiMicrosoftTeams, mdiDotsVertical, mdiCardAccountDetailsStarOutline } from '@mdi/js'

export default {
  props: ['data'],
  setup(props) {
    const statisticsData = [
      {
        title: 'プロジェクト',
        total: props.data[0],
      },
      {
        title: 'チーム',
        total: props.data[1],
      },
      {
        title: '開発者',
        total: props.data[2],
      },
    ]

    const resolveStatisticsIconVariation = data => {
      if (data === 'プロジェクト') return { icon: mdiArchiveOutline, color: 'error' }
      if (data === 'チーム') return { icon: mdiMicrosoftTeams, color: 'success' }
      if (data === '開発者') return { icon: mdiCardAccountDetailsStarOutline, color: 'info' }

      return { icon: mdiAccountOutline, color: 'success' }
    }

    return {
      statisticsData,
      resolveStatisticsIconVariation,

      // icons
      icons: {
        mdiDotsVertical,
      },
    }
  },
}
</script>
