<template>
  <div class="bloc_liste">
    <ul v-for="todo in todoLists" :key="todo.id">
      <li v-on:click="getTodo(todo.id)">
        <label id="nameTodo" v-on:click="getTodo(todo.id)"> {{ todo.name }} </label>
      </li>
      <button v-on:click="deleteTodoList(todo.id)"> X </button>
    </ul>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "sidebarItem",
  props : ['todoLists'],
  methods : {
    ...mapActions("todolist", ['getTodo', 'deleteTodoList']),
  }
}
</script>

<style scoped>

.bloc_liste {
  width : 200px;
}
button{
  margin: 0.3em;
  color : #FFFFFF;
  background : #003554;
  border : 1px solid #051923;
  border-radius: 15px;
  float : right;
}

button:hover{
  background : #096093;
}
ul {
  display : flex;
}
ul li {
  background: rgba(120,200,244,0.4);
  overflow : hidden;
  cursor : pointer;
  width: 100%;
}

ul li:hover {
  background: rgba(255,255,255,0.6);
  color : green;
  overflow : hidden;
  width : 100%;
  border : 1px solid black;
}
</style>