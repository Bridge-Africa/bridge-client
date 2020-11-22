<template>
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-row class="text-center">
        <el-image style="width: 100px; height: 100px;" :src="imageThumbnail" fit="cover"></el-image>
        <h3>{{ $t('article.title.edit', {name: form.name}) }}</h3>
        <hr>
      </el-row>

      <el-form-item :label="$t('article.form.name')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('article.form.description')" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item :label="$t('article.form.price')" prop="price">
        <el-input v-model.number="form.price"></el-input>
      </el-form-item>
      <el-form-item :label="$t('article.form.image')" prop="image">
        <el-upload action="#" :multiple="false" list-type="picture-card" :http-request="handleImageUpload" :auto-upload="true">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <!--<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                <i class="el-icon-download"></i>
              </span>-->
              <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="update">{{ $t('article.button.update') }}</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
export default {
  name: 'EditArticle',
  data () {
    return {
      form: {
        name: '',
        description: '',
        price: null,
        image: ''
      },
      loading: false,
      imageThumbnail: '',
      dialogImageUrl: '',
      dialogVisible: false,
      rules: {
        name: [{required: true, trigger: 'blur'}],
        description: [{required: true, trigger: 'blur'}],
        price: [{required: true, type: 'number', trigger: 'blur'}],
        image: [{required: true}]
      }
    }
  },
  methods: {
    handleRemove (file) {
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload (file) {
      console.log(file)
    },
    handleImageUpload (files) {
      if (files.file) {
        var reader = new FileReader()

        reader.onload = (e) => {
          this.form.image = e.target.result
        }

        reader.readAsDataURL(files.file) // convert to base64 string
      }
    },
    update () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$articleService.updateArticle(this.form.id, Object.assign({}, this.form))
            .then(data => {
              this.displayMessage(this.$t('article.message.updated', {name: this.form.name}))
              this.go('articles')
            })
            .then(() => (this.loading = false))
        }
      })
    }
  },
  mounted () {
    this.$articleService.getArticle(this.$route.params.id)
      .then(data => {
        this.form = data
        if (this.form.image) {
          this.imageThumbnail = this.form.image
        }
      })
  }
}
</script>

<style scoped>
  form {
    width: 100%;
    padding-top: 15px;
  }
</style>
