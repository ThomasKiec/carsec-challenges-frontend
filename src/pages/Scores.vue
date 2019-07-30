<template>
  <div>
    <div v-if="teamScores.loading">
      <md-progress-spinner md-mode="indeterminate" md-card md-fixed-header></md-progress-spinner>
    </div>
    <md-table v-model="searched" md-sort="id" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Team Scores</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable"></md-input>
        </md-field>
      </md-table-toolbar>
      <md-table-empty-state
        md-label="No team found"
        :md-description="`No team found for this '${search}' query. Try a different search term`"
      ></md-table-empty-state>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Team" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Points" md-sort-by="points">{{ item.points }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

function toLower(text) {
  return text.toString().toLowerCase()
}

function searchByTeamName(items, term) {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)))
  }

  return items
}

export default {
  name: 'scores',
  computed: {
    ...mapState({
      teamScores: state => state.teams.scores,
    }),
  },
  created() {
    this.$store.dispatch('teams/getTeamScores')
  },
  mounted() {
    this.$store.subscribe(async mutation => {
      switch (mutation.type) {
        case 'teams/getTeamScoresSuccess':
          this.searched = this.$store.state.teams.scores
          break
      }
    })
  },
  data() {
    return {
      search: null,
      searched: [],
    }
  },
  methods: {
    searchOnTable() {
      this.searched = searchByTeamName(this.teamScores, this.search)
    },
  },
}
</script>
<style lang="scss" scoped>
.md-table + .md-table {
  margin-top: 16px;
}
</style>
