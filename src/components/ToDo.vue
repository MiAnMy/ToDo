<template>
  <b-field
    id="ToDo"
    :type="task.completed ? 'has-text-success' : 'has-text-primary'"
  >
    <p class="control">
      <b-button type="is-dark" @click="toggleTodo">
        <b-tooltip label="Unlock" type="is-dark" v-if="isDisable">
          <b-icon icon="lock-outline"></b-icon>
        </b-tooltip>
        <b-tooltip label="Lock" type="is-dark" v-else>
          <b-icon icon="lock-open-outline"></b-icon>
        </b-tooltip>
      </b-button>
    </p>
    <p class="control">
      <b-button type="is-success" @click="updateItem" :loading="isLoading">
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
      <b-button type="is-primary" @click="taskDone" :loading="isLoading">
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
        :loading="isLoading"
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
import commonDataMixin from "../mixins/commonMixin";
import { axiosPatch, axiosDelete } from "../modules/axios";

export default {
  mixins: [notifiMixin, commonDataMixin],
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      title: this.task.title,
      isDisable: false,
    };
  },
  methods: {
    toggleTodo() {
      this.isDisable = !this.isDisable;
    },
    taskDone() {
      this.toggleVarBoolean("isLoading");
      this.task.completed = !this.task.completed;
      axiosPatch(this.task.id, {
        completed: this.task.completed,
      })
        .then((res) => {
          window.console.log(res);
          const msg = this.task.completed ? `Task done` : "Task undone";
          this.createNotification(msg, "is-primary");
        })
        .catch((err) => {
          this.createNotification(err.toString(), "is-black");
          this.task.completed = !this.task.completed;
        })
        .finally(() => this.toggleVarBoolean("isLoading"));
    },
    updateItem() {
      this.toggleVarBoolean("isLoading");
      axiosPatch(this.task.id, {
        title: this.title,
      })
        .then((res) => {
          window.console.log(res);
          this.createNotification("Task updated", "is-success");
        })
        .catch((err) => this.createNotification(err.toString(), "is-black"))
        .finally(() => this.toggleVarBoolean("isLoading"));
    },
    removeItem() {
      this.toggleVarBoolean("isLoading");
      axiosDelete(this.task.id)
        .then((res) => {
          window.console.log(res);
          Event.fire("removeTask", this.task.id);
          this.createNotification("Task deleted", "is-danger");
        })
        .catch((err) => this.createNotification(err.toString(), "is-black"))
        .finally(() => this.toggleVarBoolean("isLoading"));
    },
  },
};
</script>

<style>
.field.has-addons .control {
  z-index: 0 !important;
}
</style>
