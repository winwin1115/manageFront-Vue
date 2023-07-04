<template>
  <v-card class="pt-10">
    <v-card-title class="justify-center flex-column">
      <v-avatar
        size="120"
        rounded
        class="mb-4"
      >
        <v-img :src="require(`@/assets/images/avatars/${getPictureUrl}`)"></v-img>
      </v-avatar>
    </v-card-title>

    <v-card-text>
      <h2 class="text-xl font-weight-semibold mb-2">
        開発者
      </h2>
      <v-divider></v-divider>

      <v-list>
        <v-list-item
          dense
          class="px-0 mb-n2"
        >
          <span class="font-weight-medium me-2">氏名:</span>
          <span class="text--secondary">
            {{data.name}}
          </span>
        </v-list-item>
        <v-list-item
          dense
          class="px-0 mb-n2"
        >
          <span class="font-weight-medium me-2">ふりがな:</span>
          <span class="text--secondary">{{data.ruby}}</span>
        </v-list-item>
        <v-list-item
          dense
          class="px-0 mb-n2"
        >
          <span class="font-weight-medium me-2">スキルスコア:</span>
          <span class="text--secondary">{{data.skill_score}}</span>
        </v-list-item>
        <v-list-item
          dense
          class="px-0 mb-n2"
        >
          <span class="font-weight-medium me-2">ドメイン知識:</span>
          <span class="text--secondary">{{data.domain_knowledge}}</span>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['data'],
  setup() {
    return {}
  },
  computed: {
    getPictureUrl() {
      return this.data.picture || '1.png'
    }
  }
}
</script>

<style lang="scss" scoped>
  .text-name {
    color: rgba(231, 227, 252, 0.87) !important;
  }
</style>
