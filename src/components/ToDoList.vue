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
import mixin from "../mixins/mixin";
import ToDo from "./ToDo.vue";

export default {
  mixins: [mixin],
  data() {
    return {
      tasks: [],
    };
  },
  mounted() {
    this.axios
      .get("https://jsonplaceholder.typicode.com/todos?userId=1")
      .then((response) => {
        [...response.data].forEach((task) => {
          this.addToDo(task);
        });
      });
  },
  methods: {
    addNewToDo() {
      this.isLoading = true;
      this.axios
        .post("https://jsonplaceholder.typicode.com/todos")
        .then((res) => {
          this.addToDo(res.data);
          this.createNotification("Created new task", "is-light");
        })
        .finally(() => (this.isLoading = false));
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
