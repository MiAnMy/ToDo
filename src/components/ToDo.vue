<template>
    <b-field id="ToDo" :type="isDone ? 'has-text-success' : 'has-text-primary'">
      <p class="control">
        <b-button type="is-dark" @click="disableItem">
          <b-icon icon="lock-outline" v-if="isDisable"></b-icon>
          <b-icon icon="lock-open-outline" v-else></b-icon>
        </b-button>
      </p>
      <b-input
        placeholder="To do..."
        :value="titleTask"
        :disabled="isDisable === true"
        @change="updateItem($event.target.value)"
        expanded
      ></b-input>
      <p class="control">
        <b-button type="is-primary" @click="taskDone">
          <b-icon icon="close-circle-outline" v-if="isDone"></b-icon>
          <b-icon icon="checkbox-marked-circle-outline" v-else></b-icon>
        </b-button>
      </p>
      <p class="control">
        <b-button
          type="is-danger"
          @click="removeItem"
          :disabled="isDisable === true"
          ><b-icon icon="delete-forever"></b-icon
        ></b-button>
      </p>
    </b-field>
</template>

<script>
export default {
  props: {
    idTask: {
      type: Number,
      require: true
    },
    titleTask: {
      type: String
    }
  },
  data() {
    return {
      isDone: false,
      isDisable: false
    };
  },
  methods: {
    taskDone() {
      this.isDone = !this.isDone;
    },
    removeItem() {
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
      Event.fire("removeTask", this.idTask);
    },
    disableItem() {
      this.isDisable = !this.isDisable;
    },
    updateItem(title) {
      Event.fire("changeText", { id: this.idTask, title });
    }
  }
};
</script>

<style>

</style>