<template>
  <div class="content">
    <md-dialog :md-active.sync="showDialogAddChallenge">
      <md-dialog-title>Add Challenges</md-dialog-title>
      <md-dialog-content>
        <div class="md-layout-item md-small-size-100 md-size-100">
          <md-field>
            <label>Title</label>
            <md-input v-model="challengeForm.title" maxlength="100"></md-input>
          </md-field>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Project</label>
              <md-input v-model="challengeForm.project" maxlength="100"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Points</label>
              <md-input v-model="challengeForm.points" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Topic</label>
              <md-input v-model="challengeForm.topic" maxlength="100"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Build Call</label>
              <md-input v-model="challengeForm.buildCall" maxlength="255"></md-input>
              <span
                class="md-helper-text"
              >Note: The hardware keys will be append to the build call in the selected order</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label for="hardwareKeys">Hardware Keys</label>
              <md-select
                v-model="selectedItem"
                name="selectedItem"
                id="selectedItem"
                @md-selected="addSelectedKey"
              >
                <md-option v-for="key in hardwareKeys" v-bind:key="key.id" v-bind:value="key.id">
                  {{
                  key.name
                  }}
                </md-option>
              </md-select>
              <span class="md-helper-text">Choose hardware keys for challenge</span>
            </md-field>
            <md-chips v-model="challengeForm.selectedKeys.names" md-static></md-chips>
          </div>
          <div></div>
          <div class="md-layout-item md-small-size-100 md-size-100 text-left">
            <md-button class="md-icon-button md-raised md-round" @click="removeLastKey">
              <md-icon>clear</md-icon>
              <md-tooltip md-direction="bottom">Remove last hardware key</md-tooltip>
            </md-button>
            <md-button
              class="md-icon-button md-raised md-danger md-round"
              @click="clickDeleteHardwareKey"
            >
              <md-icon>remove</md-icon>
              <md-tooltip md-direction="bottom">Delete hardware key</md-tooltip>
            </md-button>
            <md-button
              class="md-icon-button md-raised md-success md-round"
              @click="clickAddHardwareKey"
            >
              <md-icon>add</md-icon>
              <md-tooltip md-direction="bottom">Create hardware key</md-tooltip>
            </md-button>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field>
              <label>Description</label>
              <md-textarea v-model="challengeForm.description" maxlength="512" md-autogrow></md-textarea>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button @click="closeDialogChallenge" class="md-raised">Close</md-button>
            <md-button @click="createChallenge" class="md-raised md-success">Save</md-button>
          </div>
          <md-dialog-prompt
            :md-active.sync="showDialogAddHardwareKey"
            v-model="hardwareKeyForm.name"
            md-title="Create hardware key"
            md-input-maxlength="30"
            md-input-placeholder="Type key name..."
            md-confirm-text="Save"
            @md-confirm="createHardwareKey"
          />
          <md-dialog :md-active.sync="showDialogDeleteHardwareKey">
            <md-dialog-title>Delete hardware key</md-dialog-title>
            <md-dialog-content>
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label for="hardwareKeys">Hardware Keys</label>
                  <md-select
                    v-model="hardwareKeyForm.selected"
                    name="hardwareKeyForm.selected"
                    id="hardwareKeyForm.selected"
                  >
                    <md-option
                      v-for="key in hardwareKeys"
                      v-bind:key="key.id"
                      v-bind:value="key.id"
                    >
                      {{
                      key.name
                      }}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item md-size-100 text-right">
                <md-button @click="showDialogDeleteHardwareKey = false" class="md-raised">Cancel</md-button>
                <md-button @click="deleteHardwareKey" class="md-raised md-danger">Delete</md-button>
              </div>
            </md-dialog-content>
          </md-dialog>
        </div>
      </md-dialog-content>
    </md-dialog>
    <md-dialog-alert
      :md-active.sync="challengeCreated.success"
      md-title="Challenge created"
      md-content="The challenge has been successfully created. 
      The user-challenge builds are processed in the background now."
      @click="reloadPage"
    />
    <md-dialog-alert
      :md-active.sync="hardwareKeyCreated.success"
      md-title="Hardware key created"
      md-content="The hardware key has been successfully created."
    />
    <md-dialog-alert
      :md-active.sync="hardwareKeyDeleted.success"
      md-title="Hardware key deleted"
      md-content="The hardware key has been successfully deleted."
    />
    <md-dialog-alert
      :md-active.sync="error"
      md-title="Error occured"
      :md-content="error.message"
      @click="reloadPage"
    >
      <label>{{ error.message }}</label>
    </md-dialog-alert>
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <div v-if="challenges.loading">
          <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>
        <md-button @click="clickAddChallenge" v-if="role === 'admin'">
          <label>Add challenge</label>
        </md-button>
        <div v-if="Array.isArray(challenges)">
          <div v-for="(challenge, index) of challenges" :key="index">
            <ChallengesCard
              v-if="!challenge.solved"
              :challenge="challenge"
              data-background-color="grey"
            ></ChallengesCard>
            <ChallengesCard v-else :challenge="challenge" data-background-color="green"></ChallengesCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChallengesCard } from '@/components'
import { mapState } from 'vuex'

export default {
  components: {
    ChallengesCard,
  },
  computed: {
    ...mapState({
      challenges: state => state.challenges.items,
      challengeCreated: state => state.challenges.created,
      hardwareKeys: state => state.hardwareKeys.items,
      hardwareKeyCreated: state => state.hardwareKeys.created,
      hardwareKeyDeleted: state => state.hardwareKeys.deleted,
      error: state => {
        if (state.challenges.items.error) {
          return state.challenges.items
        }
        if (state.challenges.created.error) {
          return state.challenges.created
        }
        if (state.challenges.deleted.error) {
          return state.challenges.deleted
        }
        if (state.hardwareKeys.created.error) {
          return state.hardwareKeys.created
        }
        if (state.hardwareKeys.deleted.error) {
          return state.hardwareKeys.deleted
        }
        return false
      },
      role: state => state.authentication.user.role,
    }),
  },
  created() {
    this.$store.dispatch('challenges/getAllChallenges')
  },
  data: () => {
    return {
      selectedItem: null,
      showDialogAddChallenge: false,
      showDialogAddHardwareKey: false,
      showDialogDeleteHardwareKey: false,
      challengeForm: {
        project: '',
        title: '',
        points: 0,
        topic: '',
        buildCall: '',
        description: '',
        selectedKeys: {
          names: [],
          ids: [],
        },
      },
      hardwareKeyForm: {
        name: '',
        selected: null,
      },
    }
  },
  methods: {
    async addSelectedKey() {
      const selectedItem = this.$data.selectedItem

      const foundKey = await this.$data.challengeForm.selectedKeys.ids.find(id => id === selectedItem)

      if (!foundKey) {
        const { id, name } = await this.hardwareKeys.find(({ id }) => id === selectedItem)

        this.$data.challengeForm.selectedKeys.names.push(name)
        this.$data.challengeForm.selectedKeys.ids.push(id)
      }

      this.$data.selectedItem = null
    },
    removeLastKey() {
      this.$data.challengeForm.selectedKeys.names.pop()
      this.$data.challengeForm.selectedKeys.ids.pop()
    },
    clickAddChallenge() {
      this.$store.dispatch('hardwareKeys/getHardwareKeys')
      this.$data.showDialogAddChallenge = true
    },
    clickAddHardwareKey() {
      this.$data.showDialogAddHardwareKey = true
    },
    clickDeleteHardwareKey() {
      this.$data.showDialogDeleteHardwareKey = true
    },
    async createChallenge() {
      await this.$nextTick()

      const { dispatch } = this.$store

      console.log(this.$data.challengeForm.selectedKeys.ids)

      dispatch('challenges/createChallenge', {
        project: this.$data.challengeForm.project,
        title: this.$data.challengeForm.title,
        points: this.$data.challengeForm.points,
        topic: this.$data.challengeForm.topic,
        buildCall: this.$data.challengeForm.buildCall,
        description: this.$data.challengeForm.description,
        challengeKeys: this.$data.challengeForm.selectedKeys.ids,
      })

      dispatch('challenges/getAllChallenges')

      await this.closeDialogChallenge()
    },
    async createHardwareKey() {
      const { dispatch } = this.$store

      const name = this.$data.hardwareKeyForm.name

      if (name.length > 0) {
        dispatch('hardwareKeys/createHardwareKey', { name })
      }

      this.$store.dispatch('hardwareKeys/getHardwareKeys')

      await this.closeDialogHardwareKey()
    },
    async deleteHardwareKey() {
      const { dispatch } = this.$store
      const selectedKey = this.$data.hardwareKeyForm.selected

      if (selectedKey) {
        dispatch('hardwareKeys/deleteHardwareKey', { keyId: selectedKey })
      }
      this.reloadPage()

      this.$data.hardwareKeyForm.selected = null

      await this.closeDialogHardwareKey()
    },
    async closeDialogChallenge() {
      this.$data.showDialogAddChallenge = false
      this.$data.challengeForm.project = ''
      this.$data.challengeForm.title = ''
      this.$data.challengeForm.points = ''
      this.$data.challengeForm.topic = ''
      this.$data.challengeForm.buildCall = ''
      this.$data.challengeForm.description = ''
      this.$data.challengeForm.selectedKeys.names = []
      this.$data.challengeForm.selectedKeys.ids = []

      await this.$nextTick()
    },
    async closeDialogHardwareKey() {
      this.$data.showDialogAddHardwareKey = false
      this.$data.showDialogDeleteHardwareKey = false
      this.$data.hardwareKeyForm.name = ''
      this.$data.hardwareKeyForm.selected = null

      await this.$nextTick()
    },
    async reloadPage() {
      this.$store.state.challenges.items = {}
      this.$store.state.challenges.created = {}
      this.$store.state.challenges.deleted = {}
      this.$store.state.hardwareKeys.created = {}
      this.$store.state.hardwareKeys.deleted = {}

      this.$store.dispatch('hardwareKeys/getHardwareKeys')
      this.$store.dispatch('challenges/getAllChallenges')

      await this.$nextTick()
    },
  },
}
</script>
