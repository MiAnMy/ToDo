<template>
  <b-field
    id="ToDo"
    :type="task.completed ? 'has-text-success' : 'has-text-primary'"
  >
    <p class="control">
      <b-button type="is-dark" @click="disableItem">
        <b-tooltip label="Unlock" type="is-dark" v-if="isDisable">
          <b-icon icon="lock-outline"></b-icon>
        </b-tooltip>
        <b-tooltip label="Lock" type="is-dark" v-else>
          <b-icon icon="lock-open-outline"></b-icon>
        </b-tooltip>
      </b-button>
    </p>
    <p class="control">
      <b-button type="is-success" @click="updateItem" :loading="loading">
        <b-tooltip label="update task" type="is-success">
          <b-icon icon="update"></b-icon>
        </b-tooltip>
      </b-button>
    </p>
    <b-input
      placeholder="To do..."
      :value="task.title"
      :disabled="isDisable === true"
      v-model="title"
      expanded
    ></b-input>
    <p class="control">
      <b-button type="is-primary" @click="taskDone" :loading="loading">
        <b-tooltip label="Undone" type="is-primary" v-if="task.completed">
          <b-icon icon="close-circle-outline"></b-icon>
        </b-tooltip>
        <b-tooltip label="Done" v-else>
          <b-icon icon="checkbox-marked-circle-outline"></b-icon>
        </b-tooltip>
      </b-button>
    </p>
    <p class="control">
      <b-button
        type="is-danger"
        :loading="loading"
        @click="removeItem"
        :disabled="isDisable === true"
      >
        <b-tooltip label="Delete" type="is-danger">
          <b-icon icon="delete-forever"> </b-icon></b-tooltip
      ></b-button>
    </p>
  </b-field>
</template>

<script>
import notifiMixin from "../mixins/notifiMixin";

export default {
  mixins: [notifiMixin],
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isDisable: false,
      title: this.task.title,
      loading: false,
    };
  },
  methods: {
    disableItem() {
      this.isDisable = !this.isDisable;
    },
    isLoading() {
      this.loading = !this.loading;
    },
    taskDone() {
      this.loading = true;
      this.axios
        .patch(`https://jsonplaceholder.typicode.com/todos/${this.task.id}`, {
          completed: !this.task.completed,
        })
        .then((res) => {
          window.console.log(res);
          const msg = !this.task.completed ? "Task done" : "Task undone";
          this.createNotification(msg, "is-primary");
          this.task.completed = !this.task.completed;
        })
        .catch((err) => window.console.error(err))
        .finally(() => (this.loading = false));
    },
    updateItem() {
      this.loading = true;
      this.axios
        .patch(`https://jsonplaceholder.typicode.com/todos/${this.task.id}`, {
          title: this.title,
        })
        .then((res) => {
          window.console.log(res);
          this.createNotification("Task updated", "is-success");
        })
        .catch((err) => window.console.error(err))
        .finally(() => (this.loading = false));
    },
    removeItem() {
      this.loading = true;
      this.axios
        .delete(`https://jsonplaceholder.typicode.com/todos/${this.task.id}`)
        .then((res) => {
          window.console.log(res);
          Event.fire("removeTask", this.task.id);
          this.createNotification("Task deleted", "is-danger");
        })
        .catch((err) => window.console.error(err))
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style></style>
