<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-hardware-keys-form data-background-color="green"></edit-hardware-keys-form>
        <md-button @click="showDialogChangePassword = true">Change Password</md-button>
        <md-dialog :md-active.sync="showDialogChangePassword">
          <md-dialog-title>Change password</md-dialog-title>
          <md-dialog-content>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label for="password">Password</label>
                <md-input
                  type="password"
                  v-model="password"
                  name="password"
                  :class="{ 'is-invalid': !password}"
                ></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-size-100 text-center">
              <md-button class="md-raised" @click="reloadPage">Cancel</md-button>
              <md-button type="submit" class="md-raised md-success" @click="changePassword">Save</md-button>
            </div>
          </md-dialog-content>
        </md-dialog>
        <!-- <md-dialog-prompt
          :md-active.sync="showDialogChangePassword"
          v-model="password"
          md-title="Change Password"
          md-input-placeholder="Type password..."
          type="password"
          md-confirm="Save"
          @md-confirm="ChangePassword"
        ></md-dialog-prompt>-->
      </div>
    </div>
    <md-dialog-alert
      :md-active.sync="passwordChanged.success"
      md-title="Password changed"
      md-content="You have successfully changed your password"
      @click="reloadPage"
    ></md-dialog-alert>
    <md-dialog-alert
      :md-active.sync="error"
      md-title="Error occured"
      :md-content="error.message"
      @click="reloadPage"
    ></md-dialog-alert>
  </div>
</template>

<script>
import { EditHardwareKeysForm } from '@/pages'
import { mapState } from 'vuex'

export default {
  name: 'user-profile',
  components: {
    EditHardwareKeysForm,
  },
  computed: {
    ...mapState({
      passwordChanged: state => state.users.changed,
      error: state => {
        if (state.users.changed.error) {
          return state.users.changed
        }

        return false
      },
    }),
  },
  data() {
    return {
      showDialogChangePassword: false,
      password: null,
    }
  },
  methods: {
    async changePassword() {
      const { dispatch } = this.$store

      const password = this.$data.password

      if (password) {
        dispatch('users/changePassword', { password })
      }

      await this.reloadPage()
    },

    async reloadPage() {
      this.$store.state.users.changed = {}
      this.$data.password = null
      this.showDialogChangePassword = false

      await this.$nextTick()
    },
  },
}
</script>
