<template>
  <div class="pt-5">
    <el-row class="text-center">
      <el-button v-show="$route.name !== 'articles'" @click="go('articles')" type="success" icon="el-icon-s-order">{{ $t('article.button.all') }}
      </el-button>
      <el-button v-show="$route.name !== 'create_article'" @click="go('create_article')" type="primary" icon="el-icon-plus">{{ $t('article.button.add') }}
      </el-button>
      <el-button v-show="$route.name !== 'articles_trash'" @click="go('articles_trash')" type="warning" icon="el-icon-s-cooperation">{{ $t('button.archive')
        }}
      </el-button>
      <hr>
    </el-row>

    <el-container class="container">
      <router-view/>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Articles',
  data () {
    return {}
  },
  methods: {},
  mounted () {
  }
}
</script>

<style scoped>

</style>
