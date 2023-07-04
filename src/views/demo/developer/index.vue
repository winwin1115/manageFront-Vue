<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            開発者一覧
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="d-flex align-center flex-wrap pb-0">
            <v-text-field
              v-model="searchQuery"
              placeholder="検索"
              outlined
              hide-details
              dense
              class="user-search me-3 mb-4"
            >
            </v-text-field>
            <v-spacer></v-spacer>
          </v-card-text>
          <v-data-table
            :headers="tableColumns"
            :items="devListTable"
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
                  >{{ avatarText(item.name) }}</span>
                </v-avatar>

                <div class="d-flex flex-column ms-3 text--primary font-weight-semibold">
                  {{ item.name }}
                </div>
              </div>
            </template>

            <template #[`item.project_name`]="{item}">
              <span class="text-capitalize font-weight-semibold text--primary">{{ item.domain_knowledge }}</span>
            </template>

            <template #[`item.actions`]="{item}">
              <router-link
                :to="{ name : 'demo-developer-view', params : { id : item.id } }"
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
import devsList from './devsList'

export default {
  setup() {
    const {
      devListTable,
      tableColumns,
      searchQuery,
      totalListTable,
      loading,
      options,

      fetchDevs,
    } = devsList()

    return {
      devListTable,
      tableColumns,
      searchQuery,
      totalListTable,
      loading,
      options,
      avatarText,
      fetchDevs,

      // icons
      icons: {
        mdiViewList,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.user-search {
  max-width: 200px;
}
</style>
