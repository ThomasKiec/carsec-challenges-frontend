<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Hardware Keys</h4>
        <p class="category">Add hardware keys to get access to more challenges</p>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field v-for="key in userKeys" v-bind:key="key.keyId" v-bind:value="key.keyValue">
              <label>{{ key.name }}</label>
              <md-input v-if="!key.disabled" v-model="key.keyValue" type="text"></md-input>
              <md-input v-if="key.disabled" v-model="key.keyValue" type="text" disabled></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" @click="showDialogUpdateKeys = true">Update Keys</md-button>
          </div>
        </div>
        <md-dialog-confirm
          :md-active.sync="showDialogUpdateKeys"
          md-title="Update keys"
          md-content="Do you want to update your keys?"
          md-confirm-text="Update"
          md-cancel-text="Cancel"
          @md-cancel="showDialogUpdateKeys = false"
          @md-confirm="updateKeys"
        />
        <md-dialog-alert
          :md-active.sync="userKeysUpdated.success"
          md-title="Keys updated"
          md-content="The keys have been sucessfully updated"
          @click="reloadPage"
        ></md-dialog-alert>
        <md-dialog-alert
          :md-active.sync="error"
          md-title="Error occured"
          :md-content="error.message"
          @click="reloadPage"
        ></md-dialog-alert>
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'edit-hardware-keys-form',
  props: {
    dataBackgroundColor: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState({
      userKeys: state => state.userKeys.items,
      userKeysUpdated: state => state.userKeys.updated,
      error: state => {
        if (state.userKeys.updated.error) {
          return state.userKeys.updated
        }

        return false
      },
    }),
  },
  created() {
    this.$store.dispatch('userKeys/getUserKeys')
  },
  data() {
    return {
      showDialogUpdateKeys: false,
    }
  },
  methods: {
    async updateKeys() {
      const { dispatch } = this.$store

      const userKeys = this.$store.state.userKeys.items

      const updatedKeys = []

      for (const { disabled, keyId, keyValue } of userKeys) {
        if (!disabled && keyValue !== null) {
          updatedKeys.push({ keyId, keyValue })
        }
      }

      dispatch('userKeys/updateUserKeys', { userKeys: updatedKeys })
    },
    async reloadPage() {
      this.$store.state.userKeys.updated = {}

      this.$store.dispatch('userKeys/getUserKeys')

      await this.$nextTick()
    },
  },
}
</script>
<style></style>
