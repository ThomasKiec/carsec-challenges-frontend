<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-hardware-keys-form data-background-color="green"></edit-hardware-keys-form>
      </div>
    </div>
  </div>
</template>

<script>
import { EditHardwareKeysForm } from '@/pages'

export default {
  components: {
    EditHardwareKeysForm,
  },
}
</script>
