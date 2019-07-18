<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar>
      <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>Profile</p>
      </sidebar-link>
      <sidebar-link v-if="role === 'admin'" to="/user-manager">
        <md-icon>people</md-icon>
        <p>User Manager</p>
      </sidebar-link>
      <sidebar-link to="/challenges">
        <md-icon>content_paste</md-icon>
        <p>Challenges</p>
      </sidebar-link>
      <sidebar-link to="/news">
        <md-icon>notifications</md-icon>
        <p>News</p>
      </sidebar-link>
      <sidebar-link to="/logout" class="active-pro">
        <md-icon>power_settings_new</md-icon>
        <p>Logout</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content></dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from './TopNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import DashboardContent from './Content.vue'
import { mapState } from 'vuex'

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
  },
  computed: {
    ...mapState({
      role: state => state.authentication.user.role,
    }),
  },
}
</script>
