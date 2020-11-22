<template>
  <div class="pt-5">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h3 class="text-center font-weight-bold">{{ $t('login.title') }}</h3>
            <div class="text-center pl-2 text-danger">
              {{ auth_message }}
            </div>
          </div>
          <el-form label-position="top" label-width="100px" :model="form" :rules="rules">
            <el-form-item :label="$t('login.email')" prop="email">
              <el-input ref="email" :placeholder="$t('login.email')" v-model="form.email"></el-input>
            </el-form-item>

            <el-form-item :label="$t('login.password')" prop="password">
              <el-input v-on:keyup.enter="login" type="password" :placeholder="$t('login.password')" v-model="form.password"></el-input>
            </el-form-item>
            <hr>
            <el-form-item size="large">
              <b-button @click.prevent="login" :disabled="loading" block variant="info">
                <span v-if="loading" class="el-icon-loading"></span>
                {{ $t('button.login') }} <span class="el-icon-position"></span>
              </b-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      auth_message: '',
      loading: false,
      rules: {
        email: [{required: true, trigger: 'change'}, {type: 'email', trigger: 'change'}],
        password: [{required: true, trigger: 'change'}]
      }
    }
  },
  computed: {
    ...mapState({
      name: state => state.Auth.user.name,
      intended: state => state.Auth.intended
    })
  },
  methods: {
    login () {
      this.loading = true
      this.$authService.login(Object.assign({}, this.form))
        .then(res => {
          this.$notify({
            title: this.$t('status.success'),
            message: this.$t('login.welcome', [this.name]),
            type: 'success'
          })
          location.reload()
          if (this.intended) {
            this.$router.push({
              name: this.intended
            })
          } else {
            this.$router.push({
              name: 'home'
            })
          }
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
