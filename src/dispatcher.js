import Vue from "vue";
export default new (class {
  constructor() {
    this.vue = new Vue();
  }

  fire(event, data = null) {
    this.vue.$emit(event, data);
  }

  listener(event, callback) {
    this.vue.$on(event, callback);
  }

  destroy(event, callback) {
    this.vue.$off(event, callback);
  }
})();
