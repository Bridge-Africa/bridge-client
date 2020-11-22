<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3 class="text-center font-weight-bold">{{ $t('login.register') }}</h3>
          </div>
          <el-form label-position="top" label-width="100px" :model="form" :rules="rules">
            <el-form-item :label="$t('login.name')" prop="name">
              <el-input ref="email" :placeholder="$t('login.name')" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('login.email')" prop="email">
              <el-input ref="email" :placeholder="$t('login.email')" v-model="form.email"></el-input>
            </el-form-item>

            <el-form-item :label="$t('login.password')" prop="password">
              <el-input v-on:keyup.enter="register" type="password" :placeholder="$t('login.password')" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item :label="$t('login.password_confirmation')">
              <el-input v-on:keyup.enter="register" type="password" :placeholder="$t('login.password_confirmation')" v-model="form.password_confirmation"></el-input>
            </el-form-item>
            <hr>
            <el-form-item size="large">
              <b-button @click.prevent="register" :disabled="loading" block variant="info">
                <span v-if="loading" class="el-icon-loading"></span>
                {{ $t('login.register') }} <span class="el-icon-position"></span>
              </b-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      },
      auth_message: '',
      loading: false,
      rules: {
        name: [{required: true, trigger: 'change'}],
        email: [{required: true, trigger: 'change'}, {type: 'email', trigger: 'change'}],
        password: [{required: true, trigger: 'change'}]
      }
    }
  },
  methods: {
    register () {
      this.loading = true
      this.$authService.register(Object.assign({}, this.form))
        .then(res => {
          this.$notify({
            title: this.$t('status.success'),
            message: this.$t('message.registered', [this.name]),
            type: 'success'
          })
          this.$router.push({
            name: 'login'
          })
        })
        .catch(err => {
          let status = err.response.status
          if (status === 500) {
            this.auth_message = this.$t('login.error.server')
          } else if (status === 401) {
            this.auth_message = this.$t('login.error.message')
          }
        })
        .then(() => (this.loading = false))
    }
  },
  mounted () {
    this.$refs.email.focus()
  }
}
</script>

<style scoped>

</style>
