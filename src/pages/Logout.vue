<template>
  <div>
    <h1></h1>
    <md-card display="inline-block">
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Are you already leaving us?</h4>
      </md-card-header>
      <md-card-content>
        <form @submit.prevent="handleSubmit">
          <div class="form-group md-size-100 text-center">
            <md-button type="submit" class="md-raised md-success">Logout</md-button>
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
            default: '',
        },
    },
    methods: {
        handleSubmit() {
            this.submitted = true

            const { dispatch } = this.$store

            dispatch('authentication/logout')
        },
    },
}
</script>