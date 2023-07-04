<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            チーム一覧
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="d-flex align-center flex-wrap pb-0">
            <v-text-field
              v-model="searchQuery"
              placeholder="検索"
              outlined
              hide-details
              dense
              class="search-bar me-3 mb-4"
            >
            </v-text-field>
            <v-spacer></v-spacer>
          </v-card-text>
          <v-data-table
            :headers="tableColumns"
            :items="teamsListTable"
            :options.sync="options"
            :server-items-length="totalListTable"
            :loading="loading"
          >
            <template #[`item.picture`]="{item}">
              <div class="d-flex align-center">
                <v-avatar
                  :color="item.picture ? '' : 'primary'"
                  :class="item.picture ? '' : 'v-avatar-light-bg primary--text'"
                  size="32"
                >
                  <v-img
                    v-if="item.picture"
                    :src="require(`@/assets/images/avatars/${item.picture}`)"
                  ></v-img>
                  <span
                    v-else
                    class="font-weight-medium"
                  >{{ avatarText(item.vpm_name) }}</span>
                </v-avatar>

                <div class="d-flex flex-column ms-3 text--primary font-weight-semibold">
                  {{ item.vpm_name }}
                </div>
              </div>
            </template>

            <template #[`item.name`]="{item}">
              <span class="text-capitalize font-weight-semibold text--primary">{{ item.name }}</span>
            </template>

            <template #[`item.actions`]="{item}">
              <router-link
                :to="{ name : 'demo-team-view', params : { id : item.id } }"
              >
                <v-icon>{{ icons.mdiViewList }}</v-icon>
              </router-link>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  mdiViewList,
} from '@mdi/js'
import { avatarText } from '@core/utils/filter'
import teamsList from './teamsList'

export default {
  setup() {
    const {
      teamsListTable,
      tableColumns,
      searchQuery,
      totalListTable,
      loading,
      options,

      fetchTeams,
    } = teamsList()

    return {
      teamsListTable,
      tableColumns,
      searchQuery,
      totalListTable,
      loading,
      options,
      avatarText,
      fetchTeams,

      // icons
      icons: {
        mdiViewList,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.search-bar {
  max-width: 200px;
}
</style>
