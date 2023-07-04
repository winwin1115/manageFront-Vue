<template>
  <v-row>
    <v-col cols="12">
      <v-card class="py-3">
        <v-card-text>
          <h2 class="text-xl font-weight-semibold mb-2">
            プロジェクト
          </h2>
          <v-divider></v-divider>

          <v-list>
            <v-list-item
              dense
              class="px-0 mb-n2"
            >
              <span class="font-weight-medium me-2">ネーム:</span>
              <span class="text--secondary">
                {{item.name}}
              </span>
            </v-list-item>
            <v-list-item
              dense
              class="px-0 mb-n2"
            >
              <span class="font-weight-medium me-2">タイプ:</span>
              <span v-if="item.mission_type == 1" class="text--secondary">プロジェクト</span>
              <span v-else class="text--secondary">プロダクト</span>
            </v-list-item>
            <v-list-item
              dense
              class="px-0 mb-n2"
            >
              <span class="font-weight-medium me-2">概要:</span>
              <span class="text--secondary">{{item.desc}}</span>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <h2 class="text-xl font-weight-semibold mb-2">
                VPM
              </h2>
              <v-divider></v-divider>
            </v-col>

            <v-col
              cols="12"
              class="text-center"
            >
              <v-avatar
                size="120"
                rounded
                class="mb-4"
              >
                <v-img v-if="item" :src="require(`@/assets/images/avatars/${pictureUrl}`)"></v-img>
              </v-avatar>
              <div class="text-xl mb-2 text-name">
                {{item.vpm_name}}
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-text>
          <h2 class="text-xl font-weight-semibold mb-2">
            経過スプリント
          </h2>
          <v-divider></v-divider>

          <v-list>
            <v-list-item
              dense
              class="px-0 mb-n2"
            >
              <span class="font-weight-medium me-2">経過スプリント数:</span>
              <span class="text--secondary">{{item.sprint_progress}}</span>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['item'],
  setup() {
    return {}
  },
  computed: {
    pictureUrl() {
      return this.item.picture || '1.png'
    },
  },
}
</script>

<style lang="scss" scoped>
  .text-name {
    color: rgba(231, 227, 252, 0.87) !important;
  }
</style>
