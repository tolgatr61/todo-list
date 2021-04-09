<template>

  <div class="bloc">
    <h2> Todos de la liste : {{ getCurrentListName(getCurrentListId)}} </h2>

    <div class="add">
      <input type="text" class="addTodo" placeholder="Ajouter une todo" v-model="newTodo" v-on:keyup.enter="createTodo([newTodo, 0, getCurrentListId]), newTodo = ''">
      <button v-on:click="createTodo([newTodo, 0, getCurrentListId]), newTodo = ''"> Ajouter </button>
    </div>

    <div class="main">

        <ul class="todo-list">
        <li v-for="todo in getFilteredCurrentTodos" :key="todo.id" :class="{completed: todo.completed == 1, editing: todo == editing}" >
          <div class="view">
            <label v-if="!todo.editing" @dblclick="editTodo(todo)" id="nameTodo"> {{ todo.name }} </label>
            <input class="edit" v-else type="text" v-model="todo.name" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" v-focus>
            <input type="checkbox" class="checkBox" v-model="todo.completed" true-value="1" false-value="0" @change="completeTodo([todo.id, todo.name, todo.completed, todo.todolist_id])"/>
            <button class="delete" v-on:click="deleteTodo(todo.id)"> X </button>
          </div>
        </li>
      </ul>

    </div>

    <div class="filtres">
        <p> <strong> Todos restantes : {{ countRemainingTodos }} sur {{ countTodos }}</strong> </p>
        <button v-bind:class="{selected: getFiltre === 'all'}" v-on:click.prevent="setFiltre('all')"> Tout</button>
        <button v-bind:class="{selected: getFiltre === 'todo'}" v-on:click.prevent="setFiltre('todo')"> Todo </button>
        <button v-bind:class="{selected: getFiltre === 'finished'}" v-on:click.prevent="setFiltre('finished')"> Terminé </button>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
name: "TodoList",
  data () {
  return {
    newTodo: '',
    editing : false,
    beforeEditCache : '',
  }
  },
  props: ['todos'],
  methods : {
    ...mapActions("todolist", ['completeTodo', 'createTodo', 'modifyTodo', 'deleteTodo', 'modifyTodo']),
    ...mapMutations("todolist", ["setFiltre"]),
    editTodo(todo) {
      this.beforeEditCache = todo.title
      todo.editing = true
    },
    doneEdit(todo) {
      if (todo.name.trim() == '') {
        todo.name = this.beforeEditCache
      }
      todo.editing = false
      this.modifyTodo([todo.id, todo.name, todo.completed, todo.todolist_id]);
    },
    cancelEdit(todo) {
      todo.name = this.beforeEditCache
      todo.editing = false
    },
  },
  computed : {
    ...mapGetters("todolist", ['getCurrentListId', 'getFilteredCurrentTodos', 'getFiltre', 'countRemainingTodos', 'countTodos', 'getCurrentListName']),
  },
  directives : {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
}
</script>

<style src="./style.css">


</style>