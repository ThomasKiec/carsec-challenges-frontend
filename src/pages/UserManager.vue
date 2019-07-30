<template>
  <div>
    <div v-if="users.loading">
      <md-progress-spinner md-mode="indeterminate" md-card md-fixed-header></md-progress-spinner>
    </div>
    <md-button @click="clickAddUser">Add User</md-button>
    <md-table v-model="searched" md-sort="id" md-card md-fixed-header @md-selected="onSelect">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Users</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by email..." v-model="search" @input="searchOnTable"></md-input>
        </md-field>
      </md-table-toolbar>
      <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
        <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>
        <div class="md-toolbar-section-end">
          <md-button
            v-if="selectedLength() === 1"
            class="md-icon-button md-raised md-info md-just-icon"
            @click="showDialogDeleteUserKeyValues = true"
          >
            <md-icon>autorenew</md-icon>
            <md-tooltip md-direction="bottom">Reset user key values</md-tooltip>
          </md-button>
          <md-button
            v-if="selectedLength() === 1"
            class="md-icon-button md-raised md-warning md-just-icon"
            @click="showDialogResetPassword = true"
          >
            <md-icon>clear</md-icon>
            <md-tooltip md-direction="bottom">Reset user password</md-tooltip>
          </md-button>
          <md-button
            class="md-icon-button md-raised md-danger md-just-icon"
            @click="showDialogDeleteUser = true"
          >
            <md-icon>delete</md-icon>
            <md-tooltip md-direction="bottom">Delete users</md-tooltip>
          </md-button>
        </div>
      </md-table-toolbar>
      <md-table-empty-state
        md-label="No users found"
        :md-description="`No user found for this '${search}' query. Try a different search term or create a new user`"
      >
        <md-button class="md-success" @click="clickAddUser">Add User</md-button>
      </md-table-empty-state>
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        md-selectable="multiple"
        md-auto-select
      >
        <md-table-cell md-label="Id" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Role" md-sort-by="role">{{ item.role }}</md-table-cell>
        <md-table-cell md-label="Team" md-sort-by="team">{{ item.team }}</md-table-cell>
      </md-table-row>
    </md-table>
    <md-dialog :md-active.sync="showDialogAddUser">
      <md-dialog-title>Add User</md-dialog-title>
      <md-dialog-content>
        <div class="md-layout-item md-small-size-100 md-size-100">
          <md-field>
            <label>Email</label>
            <md-input v-model="userForm.email" type="email" maxlength="100"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100">
          <md-radio class="md-primary" v-model="userForm.role" value="student">Student</md-radio>
          <md-radio class="md-primary" v-model="userForm.role" value="admin">Admin</md-radio>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100">
          <md-field>
            <label for="teams">Teams</label>
            <md-select v-model="userForm.teamId" name="userForm.teamId" id="userForm.teamId">
              <md-option
                v-for="key in teams"
                v-bind:key="key.id"
                v-bind:value="key.id"
              >{{ key.name }}</md-option>
            </md-select>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100 text left">
          <md-button class="md-icon-button md-raised md-danger md-round" @click="clickDeleteTeam">
            <md-icon>remove</md-icon>
            <md-tooltip md-direction="bottom">Delete Team</md-tooltip>
          </md-button>
          <md-button class="md-icon-button md-raised md-success md-round" @click="clickAddTeam">
            <md-icon>add</md-icon>
            <md-tooltip md-direction="bottom">Add Team</md-tooltip>
          </md-button>
        </div>
        <div class="md-layout-item md-size-100 text-right">
          <md-button @click="closeDialogCreateUser" class="md-raised">Close</md-button>
          <md-button @click="createUser" class="md-raised md-success">Save</md-button>
        </div>
        <md-dialog-prompt
          :md-active.sync="showDialogAddTeam"
          v-model="teamForm.name"
          md-title="Create Team"
          md-input-maxlength="100"
          md-input-placeholder="Type team name..."
          md-confirm-text="Save"
          @md-confirm="createTeam"
        />
        <md-dialog :md-active.sync="showDialogDeleteTeam">
          <md-dialog-title>Delete Team</md-dialog-title>
          <md-dialog-content>
            <div class="md-layout-item md-small-size-100 md-size-100"></div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label for="teams">Team</label>
                <md-select
                  v-model="teamForm.selected"
                  name="teamForm.selected"
                  id="teamForm.selected"
                >
                  <md-option v-for="team in teams" v-bind:key="team.id" v-bind:value="team.id">
                    {{
                    team.name
                    }}
                  </md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-size-100 text-right">
              <md-button class="md-raised" @click="showDialogDeleteTeam = false">Cancel</md-button>
              <md-button class="md-raised md-danger" @click="deleteTeam">Delete</md-button>
            </div>
          </md-dialog-content>
        </md-dialog>
      </md-dialog-content>
    </md-dialog>
    <md-dialog-confirm
      :md-active.sync="showDialogDeleteUser"
      md-title="Delete Users"
      :md-content="
        'You have selected <strong>' + selectedLength() + ' user(s) </strong>. <br> Do you really want to delete those?'
      "
      md-confirm-text="Delete"
      md-cancel-text="Cancel"
      @md-cancel="closeDialogDeleteUsers"
      @md-confirm="deleteUsers"
    />
    <md-dialog-confirm
      :md-active.sync="showDialogResetPassword"
      md-title="Reset user password"
      :md-content="
        'You have selected user with email: <strong>' +
          firstSelectedEmail() +
          '</strong>. <br> Do you really want to reset the password?'
      "
      md-confirm-text="Reset"
      md-cancel-text="Cancel"
      @md-cancel="closeDialogResetPassword"
      @md-confirm="resetPassword"
    />
    <md-dialog-confirm
      :md-active.sync="showDialogDeleteUserKeyValues"
      md-title="Reset user key values"
      :md-content="
        'You have selected user with email: <strong>' +
          firstSelectedEmail() +
          '</strong>. <br> Do you really want to reset the users hardware key value?'
      "
      md-confirm-text="Reset"
      md-cancel-text="Cancel"
      @md-cancel="closeDialogDeleteUserKeyValues"
      @md-confirm="deleteUserKeyValues"
    />
    <md-dialog-alert
      :md-active.sync="userCreated.success"
      md-title="User created"
      md-content="The user has been sucessfully created"
      @click="reloadPage"
    ></md-dialog-alert>
    <md-dialog-alert
      :md-active.sync="userDeleted.success"
      md-title="User deleted"
      md-content="The user has been sucessfully deleted"
      @click="reloadPage"
    ></md-dialog-alert>
    <md-dialog-alert
      :md-active.sync="passwordReset.success"
      md-title="Password reset"
      md-content="The users password has been reset"
      @click="reloadPage"
    ></md-dialog-alert>
    <md-dialog-alert
      :md-active.sync="userKeyValuesDeleted.success"
      md-title="User keys delted"
      md-content="The users hardware key values have been sucessfully deleted"
      @click="reloadPage"
    ></md-dialog-alert>
    <md-dialog-alert
      :md-active.sync="teamCreated.success"
      md-title="Team deleted"
      md-content="The team has been sucessfully deleted"
      @click="reloadPage"
    ></md-dialog-alert>
    <md-dialog-alert
      :md-active.sync="teamDeleted.success"
      md-title="Team deleted"
      md-content="The team has been sucessfully deleted"
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
import { mapState } from 'vuex'

function toLower(text) {
  return text.toString().toLowerCase()
}

function searchByEmail(items, term) {
  if (term) {
    return items.filter(item => toLower(item.email).includes(toLower(term)))
  }

  return items
}

export default {
  name: 'user-manager',
  computed: {
    ...mapState({
      users: state => state.users.items,
      userCreated: state => state.users.created,
      userDeleted: state => state.users.deleted,
      passwordReset: state => state.users.reset,
      userKeyValuesDeleted: state => state.userKeys.values.deleted,
      teams: state => state.teams.items,
      teamCreated: state => state.teams.created,
      teamDeleted: state => state.teams.deleted,
      error: state => {
        if (state.users.created.error) {
          return state.users.created
        }
        if (state.users.deleted.error) {
          return state.users.deleted
        }
        if (state.users.reset.error) {
          return state.teams.reset
        }
        if (state.userKeys.values.deleted.error) {
          return state.userKeys.values.deleted
        }
        if (state.teams.created.error) {
          return state.teams.created
        }
        if (state.teams.deleted.error) {
          return state.teams.deleted
        }

        return false
      },
    }),
  },
  created() {
    this.$store.dispatch('users/getUsers')
  },
  mounted() {
    this.$store.subscribe(async mutation => {
      switch (mutation.type) {
        case 'users/getUsersSuccess':
          this.searched = this.$store.state.users.items
          break
      }
    })
  },
  data() {
    return {
      search: null,
      searched: [],
      selected: [],
      selectedLength: () => this.$data.selected.length,
      firstSelectedEmail: () => (this.$data.selected[0] ? this.$data.selected[0].email : ''),
      showDialogAddUser: false,
      showDialogDeleteUser: false,
      showDialogAddTeam: false,
      showDialogDeleteTeam: false,
      showDialogResetPassword: false,
      showDialogDeleteUserKeyValues: false,
      userForm: {
        email: '',
        teamId: null,
        role: 'student',
      },
      teamForm: {
        name: '',
        selected: null,
      },
    }
  },
  methods: {
    async createUser() {
      await this.$nextTick()

      const { dispatch } = this.$store

      dispatch('users/createUser', {
        email: this.$data.userForm.email,
        teamId: this.$data.userForm.teamId,
        role: this.$data.userForm.role,
      })

      dispatch('users/getUsers')

      await this.closeDialogCreateUser()
    },
    async deleteUsers() {
      const { dispatch } = this.$store

      const userIds = this.$data.selected.map(({ id }) => id)

      dispatch('users/deleteUser', {
        userIds,
      })

      this.reloadPage()
    },
    async resetPassword() {
      const { dispatch } = this.$store

      const [{ id: userId }] = this.$data.selected

      dispatch('users/resetPassword', { userId })
    },
    async deleteUserKeyValues() {
      const { dispatch } = this.$store

      const [{ id: userId }] = this.$data.selected

      dispatch('userKeys/deleteUserKeyValues', { userId })
    },
    async createTeam() {
      const { dispatch } = this.$store

      dispatch('teams/createTeam', {
        name: this.$data.teamForm.name,
      })

      await this.closeDialogTeam()
    },
    async deleteTeam() {
      const { dispatch } = this.$store

      dispatch('teams/deleteTeam', {
        teamId: this.$data.teamForm.selected,
      })

      await this.closeDialogTeam()
    },
    clickAddUser() {
      this.$store.dispatch('teams/getTeams')
      this.$data.showDialogAddUser = true
    },
    clickAddTeam() {
      this.$data.showDialogAddTeam = true
    },
    clickDeleteTeam() {
      this.$data.showDialogDeleteTeam = true
    },
    onSelect(items) {
      this.selected = items
    },
    getAlternateLabel(count) {
      let plural = ''

      if (count > 1) {
        plural = 's'
      }

      return `${count} user${plural} selected`
    },
    searchOnTable() {
      this.searched = searchByEmail(this.users, this.search)
    },
    async closeDialogCreateUser() {
      this.$data.showDialogAddUser = false
      this.$data.userForm.email = ''
      this.$data.userForm.teamId = null
      this.$data.userForm.role = 'student'

      await this.$nextTick()
    },
    async closeDialogDeleteUsers() {
      this.$data.showDialogDeleteUser = false

      await this.$nextTick()
    },
    async closeDialogResetPassword() {
      this.data.showDialogResetPassword = false

      await this.$nextTick()
    },
    async closeDialogDeleteUserKeyValues() {
      this.data.showDialogDeleteUserKeyValues = false

      await this.$nextTick()
    },
    async closeDialogTeam() {
      this.$data.showDialogAddTeam = false
      this.$data.showDialogDeleteTeam = false
      this.$data.teamForm.name = ''
      this.$data.teamForm.selected = null

      await this.$nextTick()
    },
    async reloadPage() {
      this.$store.state.users.created = {}
      this.$store.state.users.deleted = {}
      this.$store.state.users.reset = {}
      this.$store.state.teams.created = {}
      this.$store.state.teams.deleted = {}
      this.$store.state.userKeys.values.deleted = {}
      this.$store.dispatch('users/getUsers')
      this.$store.dispatch('teams/getTeams')

      await this.$nextTick()
    },
  },
}
</script>
<style lang="scss" scoped>
.md-table + .md-table {
  margin-top: 16px;
}
</style>
