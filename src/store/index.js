import Vue from 'vue'
import Vuex from 'vuex'

import { alert } from './alert.module'
import { authentication } from './authentication.module'
import { challenges } from './user-challenges.module'
import { hardwareKeys } from './hardware-keys.module'
import { users } from './users.module'
import { teams } from './teams.module'
import { userKeys } from './user-keys.module'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    alert,
    authentication,
    challenges,
    hardwareKeys,
    users,
    teams,
    userKeys,
  },
})
