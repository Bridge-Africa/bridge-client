<template>
  <div style="width: 100%;">
    <b-jumbotron class="hero-c" :header="article.name" :lead="$t('article.title.created_on') + shortDate(article.created_at)">
      <p>{{ article.description }}</p>
      <b-button @click.prevent="go('edit_article', {id: article.id})" variant="primary">
        {{ $t('article.button.edit') }} <i class="el-icon-edit"></i> </b-button>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: 'ViewArticle',
  data () {
    return {
      article: {}
    }
  },
  methods: {},
  mounted () {
    this.pageLoading = true
    this.$articleService.getArticle(this.$route.params.id)
      .then(data => {
        this.article = data
        document.querySelector('body').setAttribute('style', `
          background-image: url("${data.image}");
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
        `)
        this.pageLoading = false
      })
  },
  beforeDestroy () {
    document.querySelector('body').setAttribute('style', `
          background-image: none;
        `)
  }
}
</script>

<style scoped>
  .hero-c {
    background-color: rgba(255, 255, 255, 0.93);
    border-radius: 5px;
    color: #333;
    line-height: 1.5;
    padding: 1rem 2rem;
  }
</style>
