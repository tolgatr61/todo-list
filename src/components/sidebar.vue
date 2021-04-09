<template>

  <div class="sidebar">
    <h1> Listes </h1>
    <sidebar-item :todoLists="getData"></sidebar-item>
    <input type="text" class="addTodoList" v-model="listName" placeholder="Ajouter une todolist" v-on:keyup.enter="createTodoList(listName), listName = ''"/>
    <button v-on:click="createTodoList(listName), listName = ''"> Ajouter todolist </button>
  </div>
</template>

<script>
import sidebarItem from "@/components/sidebarItem";
import {mapActions} from "vuex";

export default {
name: "sidebar",
  data() {
    return {
    listName: '',
  }
  },
  components : {
    sidebarItem
  },
  props: {
    todoLists: {type: Array}
  },
  methods : {
    ...mapActions("todolist", ['createTodoList']),
  },
  computed : {
    getData() {
      return this.todoLists;
    }
  }
}
</script>

<style scoped>

.sidebar {
  width: 40%;
  text-align : center;
  border : 1px inset black;
}

.addTodoList{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.addTodoList {
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}

button{
  margin: 0.3em;
  color : #FFFFFF;
  background : #003554;
  border : 1px solid #051923;
  border-radius: 15px;
}

button:hover{
  background : #096093;
}

</style>