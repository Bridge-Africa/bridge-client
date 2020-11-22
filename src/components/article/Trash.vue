<template>
  <el-row :gutter="12">
    <el-col :span="6" v-for="(article, o) in articles" :key="o" class="pt-5">
      <el-card :body-style="{ padding: '0px' }" shadow="always">
        <img height="180px" width="199px" :src="article.thumbnail" class="image">
        <div style="padding: 14px;">
          <span>{{ article.name | limit_str(25) }}</span>
          <div class="bottom clearfix">
            <el-row>
              <el-button @click="restore(article.id)" size="mini" type="primary" icon="el-icon-refresh-left">{{ $t('button.restore') }}</el-button>
              <el-button @click="destroy(article.id)" size="mini" type="danger" icon="el-icon-delete">{{ $t('button.delete') }}</el-button>
            </el-row>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      articles: []
    }
  },
  methods: {
    restore (id) {
      this.pageLoading = true
      let article = this.articles.find(a => a.id === id)
      this.askQuestion(this.$t('article.confirm.restore', {name: article.name}), () => {
        this.$articleService.restoreArticle(id)
          .then(data => {
            this.pageLoading = false
            let index = this.articles.indexOf(article)
            this.articles.splice(index, 1)
            this.notify(this.$t('article.message.restored'))
          })
      }, 'Question', () => {
        this.pageLoading = false
      })
    },
    destroy (id) {
      this.pageLoading = true
      let article = this.articles.find(a => a.id === id)
      this.askQuestion(this.$t('article.confirm.destroy', {name: article.name}), () => {
        this.$articleService.destroyArticle(id)
          .then(data => {
            this.pageLoading = false
            let index = this.articles.indexOf(article)
            this.articles.splice(index, 1)
            this.notify(this.$t('article.message.destroyed'))
          })
      }, 'Question', () => {
        this.pageLoading = false
      })
    }
  },
  mounted () {
    this.$articleService.getArchivedArticles()
      .then(data => {
        this.articles = data
        this.pageLoading = false
      })
  },
  beforeMount () {
    this.pageLoading = true
  }
}
</script>

<style scoped>
  .el-button--mini, .el-button--mini.is-round {
    padding: 7px 8px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
