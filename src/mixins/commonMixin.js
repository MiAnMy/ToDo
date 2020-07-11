const commonDataMixin = {
  data: () => ({
    isLoading: false,
  }),
  methods: {
    toggleVarBoolean(variable) {
      this[variable] = !this[variable];
    },
  },
};

export default commonDataMixin;
