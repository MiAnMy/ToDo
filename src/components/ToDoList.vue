<template>
  <article class="message" id="ToDoList">
    <div class="message-header">
      <p>
        Tasks <b-tag type="is-info">{{ taskLength }}</b-tag>
      </p>
      <b-button class="is-pulled-right is-small" rounded @click="addToDo()">
        <b-tooltip label="Add new task">
          <b-icon icon="plus" size="is-small"></b-icon>
        </b-tooltip>
      </b-button>
    </div>
    <div class="message-body">
      <ToDo
        v-for="task in tasks"
        :key="task.id"
        :id-task="task.id"
        :title-task="task.title"
      ></ToDo>
    </div>
  </article>
</template>

<script>
import ToDo from "./ToDo.vue";

export default {
  data() {
    return {
      tasks: [],
    };
  },
  mounted() {
    this.axios
      .get("https://jsonplaceholder.typicode.com/todos?userId=1")
      .then((response) => {
        [...response.data].forEach((data) => {
          this.addToDo(data.title);
        });
      });
  },
  methods: {
    addToDo(title) {
      this.tasks.unshift({
        id: this.tasks.length,
        title: title,
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
      this.tasks = this.tasks.filter((item) => {
        return item.id != id;
      });
    });
    Event.listener("changeText", (data) => {
      this.tasks.map((item) => {
        if (data.id === item.id) {
          item.title = data.title;
        }
      });
    });
  },
  components: {
    ToDo,
  },
};
</script>

<style></style>
