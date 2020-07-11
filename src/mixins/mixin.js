const notifiMixin = {
  data: () => ({
    isLoading: false,
  }),
  methods: {
    createNotification(msg, type, clo = false) {
      this.$buefy.notification.open({
        message: msg,
        type: type,
        closable: clo,
        position: "is-top",
      });
    },
  },
};

export default notifiMixin;
