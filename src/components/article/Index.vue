<template>
  <el-row :gutter="12">
    <transition-group name="list-complete" tag="span">
    <el-col :span="6" v-for="article in articles" :key="article.id" class="pt-5">
      <el-card :body-style="{ padding: '0px' }" shadow="always">
        <img height="180px" width="199px" :src="article.thumbnail" class="image">
        <div style="padding: 14px;">
          <span>{{ article.name | limit_str(25) }}</span>
          <div class="bottom clearfix">
            <el-row>
              <el-button @click="go('view_article', {id: article.id})" size="mini" type="primary" icon="el-icon-view">{{ $t('button.explore') }}</el-button>
              <el-button @click="go('edit_article', {id: article.id})" size="mini" type="info" icon="el-icon-edit">{{ $t('button.edit') }}</el-button>
              <el-button @click="trash(article.id)" size="mini" type="warning" icon="el-icon-s-cooperation">{{ $t('button.archive') }}</el-button>
            </el-row>
          </div>
        </div>
      </el-card>
    </el-col>
    </transition-group>
  </el-row>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      articles: [],
      loading: false,
      loader: null
    }
  },
  methods: {
    trash (id) {
      let article = this.articles.find(a => a.id === id)
      this.askQuestion(this.$t('article.confirm.trash', {name: article.name}), () => {
        this.pageLoading = true
        this.$articleService.archiveArticle(id)
          .then(data => {
            this.pageLoading = false
            let index = this.articles.indexOf(article)
            this.articles.splice(index, 1)
            this.notify(this.$t('article.message.trashed'))
          })
      }, 'Question', () => {
        this.pageLoading = false
      })
    }
  },
  mounted () {
    this.$articleService.getArticles()
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
    padding: 7px 5px;
  }
  .el-button+.el-button {
     margin-left: 0;
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
