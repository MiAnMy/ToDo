<template>
  <article class="message" id="ToDoList">
    <div class="message-header">
      <p>
        Tasks <b-tag type="is-info">{{ taskLength }}</b-tag>
      </p>
      <b-button
        class="is-pulled-right is-small"
        rounded
        @click="addNewToDo"
        :loading="isLoading"
      >
        <b-tooltip label="Add new task" type="is-light">
          <b-icon icon="plus" size="is-small"></b-icon>
        </b-tooltip>
      </b-button>
    </div>
    <div class="message-body">
      <ToDo v-for="task in tasks" :key="task.id" :task="task"></ToDo>
    </div>
  </article>
</template>

<script>
import notifiMixin from "../mixins/notifiMixin";
import commonDataMixin from "../mixins/commonMixin";
import { axiosPost, axiosGet } from "../modules/axios";

import ToDo from "./ToDo.vue";

export default {
  mixins: [notifiMixin, commonDataMixin],
  data() {
    return {
      tasks: [],
    };
  },
  mounted() {
    axiosGet()
      .then((response) => {
        [...response.data].forEach((task) => {
          this.addToDo(task);
        });
      })
      .catch((err) => window.console.error(err));
  },
  methods: {
    addNewToDo() {
      this.toggleVarBoolean("isLoading");
      axiosPost()
        .then((res) => {
          this.addToDo(res.data);
          this.createNotification("Created new task", "is-light");
        })
        .catch((err) => {
          this.createNotification(err.toString(), "is-black");
        })
        .finally(() => this.toggleVarBoolean("isLoading"));
    },
    addToDo(task) {
      this.tasks.unshift({
        id: this.tasks.length,
        title: task?.title,
        completed: task?.completed,
      });
    },
  },
  computed: {
    taskLength() {
      return this.tasks.length;
    },
  },
  beforeCreate() {
    Event.listener("removeTask", (id) => {
      this.tasks = this.tasks.filter((task) => task.id != id);
    });
  },
  components: {
    ToDo,
  },
};
</script>

<style></style>
