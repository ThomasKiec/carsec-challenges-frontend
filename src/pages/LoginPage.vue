<template>
  <div>
    <h1>Welcome to ANSKO & EMSKO Hacking Challenges</h1>
    <md-card display="inline-block">
      <md-card-header :data-background-color="dataBackgroundColor" md-color="green">
        <h4 class="title">Login</h4>
      </md-card-header>
      <md-card-content>
        <form @submit.prevent="handleSubmit">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label for="email">Email Address</label>
              <md-input
                type="email"
                v-model="email"
                name="email"
                :class="{ 'is-invalid': submitted && !email }"
              ></md-input>
              <div v-show="submitted && !email" class="md-invalide">required</div>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label for="password">Password</label>
              <md-input
                type="password"
                v-model="password"
                name="password"
                :class="{ 'is-invalid': submitted && !password }"
              ></md-input>
              <div v-show="submitted && !password" class="md-invalide">required</div>
            </md-field>
          </div>
          <div class="form-group md-size-100 text-center">
            <md-button type="submit" class="md-raised md-success">Login</md-button>
          </div>
        </form>
      </md-card-content>
    </md-card>
  </div>
</template>

<style lang="scss" scoped>
.md-card {
    width: 400px;
    height: auto;
    margin: 100px auto;
    display: block;
}
.md-field {
    width: 300px;
}
</style>

<script>
export default {
    name: 'login',
    props: {
        dataBackgroundColor: {
            type: String,
            default: 'green',
        },
    },
    data() {
        return {
            email: '',
            password: '',
            submitted: false,
        }
    },
    computed: {
        loggingIn() {
            return this.$store.state.authentication.status.loggingIn
        },
    },
    created() {
        // reset login status
        this.$store.dispatch('authentication/logout')
    },
    methods: {
        handleSubmit() {
            this.submitted = true
            const { email, password } = this
            const { dispatch } = this.$store
            if (email && password) {
                dispatch('authentication/login', {
                    email,
                    password,
                })
            }
        },
    },
}
</script>