const notifiMixin = {
  methods: {
    createNotification(msg, type, clo = false) {
      this.$buefy.notification.open({
        message: msg,
        type: type,
        closable: clo,
        position: "is-top",
        queue: false,
      });
    },
  },
};

export default notifiMixin;
