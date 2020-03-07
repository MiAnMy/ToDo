<template>
  <div id="app">
    <div class="columns is-centered">
      <div class="column is-6">
        <AboutProgram />
        <ToDoList></ToDoList>
      </div>
    </div>
  </div>
</template>

<script>
import ToDoList from "./components/ToDoList.vue";
import AboutProgram from "./components/About.vue";

export default {
  name: "app",
  components: {
    ToDoList,
    AboutProgram
  }
};
</script>

<style></style>
