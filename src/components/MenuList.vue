<template>
  <b-menu>
    <b-menu-list label="Menu">
      <b-menu-item label="Users">
        <b-menu-item
          v-for="user in users"
          :key="user.id"
          :label="user.name"
          @click="userSelected(user.id)"
        >
        </b-menu-item>
      </b-menu-item>
      <b-menu-item label="About"><About /></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
import About from "./About.vue";

export default {
  data() {
    return {
      users: []
    };
  },
  mounted() {
    this.axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        [...response.data].forEach(user => {
          this.users.push(user);
        });
      });
  },
  methods: {
    userSelected: id => {
      Event.fire("userSelected", id);
    }
  },
  components: {
    About
  }
};
</script>

<style></style>
