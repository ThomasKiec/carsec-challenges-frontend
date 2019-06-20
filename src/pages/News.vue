<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item"></div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            data: [],
        }
    },
    methods: {
        notifyVue(verticalAlign, horizontalAlign) {
            var color = Math.floor(Math.random() * 4 + 1)
            this.$notify({
                message:
                    'Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer.',
                icon: 'add_alert',
                horizontalAlign: horizontalAlign,
                verticalAlign: verticalAlign,
                type: this.type[color],
            })
        },
    },
}
</script>
