<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <div v-if="challenges.items.loading">Loading users...</div>
        <span class="text-danger" v-if="challenges.items.error">ERROR:{{challenges.error}}</span>
        <div v-if="challenges.items">
          <div v-for="(challenge, index) of challenges.items" :key="index">
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

export default {
    components: {
        ChallengesCard,
    },
    data() {
        return {
            challenges: this.$store.state.challenges,
            color: 'green',
        }
    },
    created() {
        this.$store.dispatch('challenges/getAllChallenges')
    },
}
</script>

