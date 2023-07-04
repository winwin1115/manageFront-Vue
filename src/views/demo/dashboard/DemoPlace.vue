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
              </span>
            </v-list-item>
            <v-list-item
              dense
              class="px-0 mb-n2"
            >
              <span class="font-weight-medium me-2">タイプ:</span>
              <span class="text--secondary"></span>
            </v-list-item>
            <v-list-item
              dense
              class="px-0 mb-n2"
            >
              <span class="font-weight-medium me-2">概要:</span>
              <span class="text--secondary"></span>
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
                <v-img :src="require('@/assets/images/avatars/1.png')"></v-img>
              </v-avatar>
              <div class="text-xl mb-2 text-name">
                VPM名前
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-text>
          <h2 class="text-xl font-weight-semibold mb-2">
            生産性
          </h2>
          <v-divider></v-divider>

          <v-list>
            <v-list-item
              dense
              class="px-0 mb-n2"
            >
              <span class="font-weight-medium me-2">チーム稼働率:</span>
              <span class="text--secondary"></span>
            </v-list-item>
            <v-list-item
              dense
              class="px-0 mb-n2"
            >
              <span class="font-weight-medium me-2">チームスコア:</span>
              <span class="text--secondary"></span>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-row>
            <v-col
              cols="12"
              class="btn-col"
            >
              <v-btn
                color="secondary"
                class="detail-btn"
              >
                プロジェクト
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              class="btn-col"
            >
              <v-btn
                color="secondary"
                class="detail-btn"
              >
                チーム
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              class="btn-col"
            >
              <v-btn
                color="secondary"
                class="detail-btn"
              >
                スプリント
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  setup() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
  .btn-col {
    a {
      text-decoration: none;
    }
    text-align: center;
    .detail-btn {
      width: 85%;
    }
  }
  .text-name {
    color: rgba(231, 227, 252, 0.87) !important;
  }
</style>
