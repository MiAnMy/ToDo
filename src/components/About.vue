<template>
  <section>
    <button class="button block is-link" @click="isActive = !isActive">
      <b-icon icon="help" size="is-small"></b-icon>
    </button>
    <b-notification
      :active.sync="isActive"
      aria-close-label="Close notification"
      class="is-dark"
    >
      Program created with Vue, Buefy, Material Design Icons and Axios
    </b-notification>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    };
  }
};
</script>

<style></style>
