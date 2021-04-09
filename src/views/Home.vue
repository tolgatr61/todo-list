<template>
  <div class="blocApp">
  <div v-if="isConnected">
    <sidebar class="sideb" :todoLists="getTodoLists"></sidebar>
    <todo-list class="todo" v-if="getCurrentTodos !== null" :todos="getCurrentTodos"></todo-list>
  </div>
  <div v-else>
    <h2> Veuillez vous connectez. </h2>
  </div>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar";
import TodoList from "@/components/TodoList";
import {mapGetters, mapActions} from "vuex";

export default {
  name: "Home",
  components: {
    sidebar, TodoList
  },
  methods : {
    ...mapActions("todolist", ['load']),
  },
  created() {
    if (localStorage.getItem('USER_TOKEN') !== null) {
      this.load()
    }
  },
  computed : {
    ...mapGetters("todolist", ['getTodoLists', 'getCurrentTodos']),
    ...mapGetters("account", ['isConnected']),
  },
}
</script>

<style scoped>

.blocApp {
  text-align : center;
  margin: 0 auto;
}
.sideb {
  color : black;
  background : white;
  float: left;
  width: 300px;
}

.todo {
  margin-left : 400px;
  background: #ffffff;
}

@media screen and (max-width: 640px) {
  .blocApp {
    text-align : center;
  }
  .sideb {
    overflow: auto;
  }
  .todo {
    overflow : auto;
    margin-left : 100px;
  }
}

</style>