export function load(state, data) {
    state.todoLists = data;
}

export function addTodoList(state, data) {
    state.todoLists.push(data);
}

export function setCurrentTodos(state, todo) {
    state.currentTodos = todo;
}

export function setCurrentListId(state, id) {
    state.currentListId = id;
}

export function complete(state, data) {
    state.currentTodos.find(el => el.id === data.id).completed = data.completed;
}

export function addTodo(state, data) {
    state.currentTodos.push({
        id : data.id,
        todolist_id : data.todolist_id,
        name: data.name,
        completed: data.completed,
        created_at: data.created_at,
        updated_at: data.updated_at
        });
    console.log(state.currentTodos);
}

export function modify(state, data) {
    let todo = state.currentTodos.find(el => el.id === data.id)
    todo.name = data.name;
}

export function resetState(state) {
    state.todoLists = null;
    state.currentTodos = null;
    state.currentListId = null;
}

export function setFiltre(state, filtre) {
    state.filtre = filtre;
}

export function deleteList(state, [todolist_id, data]) {
    console.log(data);
    let todoListIndex = state.todoLists.indexOf(state.todoLists.find(el => el.id === todolist_id));
    state.todoLists.splice(todoListIndex, 1);
}

export function deleteTodo(state, [id, data]) {
    console.log(data);
    let todoIndex = state.currentTodos.indexOf(state.currentTodos.find(el => el.id === id));
    console.log(todoIndex)
    state.currentTodos.splice(todoIndex, 1);
}