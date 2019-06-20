<template>
  <form>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Solve challenge</md-dialog-title>
      <div>
        <md-field>
          <label>Insert result</label>
          <md-input v-model="result"></md-input>
        </md-field>
      </div>
      <md-button @click="solveChallenge" class="md-raised md-success">Save</md-button>
      <md-button @click="closeDialog" class="md-raised md-success">Close</md-button>
    </md-dialog>
    <md-dialog-alert
      :md-active.sync="solved.success"
      md-title="Challenge solved"
      md-content="Congratulations you have successfully solved this challenge"
      @click="reloadPage"
    />
    <md-dialog-alert
      :md-active.sync="solved.error"
      md-title="Challenge not solved"
      md-content="Unfortunately, your solution does not match the result."
      @click="reloadPage"
    />
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">{{challenge.title}}</h4>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Project</label>
              <md-input v-model="challenge.project" readonly></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Points</label>
              <md-input v-model="challenge.points" type="number" readonly></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Topic</label>
              <md-input v-model="challenge.topic" readonly></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>Description</label>
              <md-textarea v-model="challenge.description"></md-textarea>
            </md-field>
          </div>
          <div class="md-layout-item md-size-10">
            <span class="md-caption">Status:</span>
          </div>
          <div class="md-layout-item md-size-10">
            <md-icon v-show="!challenge.solved">thumb_down</md-icon>
            <md-icon v-show="challenge.solved">thumb_up</md-icon>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button
              @click="showDialog = true"
              v-show="!challenge.solved"
              class="md-raised md-success"
            >Solve</md-button>
            <md-button v-show="challenge.solved" class="md-primary md-success" disabled>Solved</md-button>
            <md-button @click="downloadChallenge" class="md-raised md-success">Download</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>

<style lang="scss" scoped>
.md-dialog {
    max-width: 768px;
}
</style>

<script>
import { mapState } from 'vuex'

export default {
    name: 'challenges-list',
    props: {
        dataBackgroundColor: {
            type: String,
            default: '',
        },
        challenge: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        ...mapState({
            solved: state => state.challenges.solved,
        }),
    },
    data: () => {
        return {
            result: '',
            showDialog: false,
        }
    },
    methods: {
        solveChallenge() {
            const { dispatch } = this.$store

            dispatch('challenges/solveUserChallenge', {
                challengeId: this.$props.challenge.id,
                result: this.$data.result,
            }).then(() => {
                this.$data.showDialog = false
                this.$data.result = ''
            })
        },
        downloadChallenge() {
            console.log('download challenge')
        },
        closeDialog() {
            this.$data.showDialog = false
            this.$data.result = ''
        },
        reloadPage() {
            this.$router.go()
        },
    },
}
</script>