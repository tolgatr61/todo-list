export const getTodoLists = (state) => {
    return state.todoLists;
}

export const getCurrentTodos = (state) => {
    return state.currentTodos;
}

export const getCurrentListId = (state) => {
    return state.currentListId;
}

export const getFilteredCurrentTodos = (state) => {
    if (state.filtre === 'todo') {
        return state.currentTodos.filter(todo => todo.completed == 0);
    }
    else if (state.filtre === 'finished') {
        return state.currentTodos.filter(todo => todo.completed == 1);
    }
    return state.currentTodos;
}

export const getFiltre = (state) => {
    return state.filtre;
}

export const countRemainingTodos = (state) => {
    return state.currentTodos.filter(todo => todo.completed != 1).length;
}

export const countTodos = (state) => {
    return state.currentTodos.length;
}

export const getCurrentListName = (state) => (id) => {
    return state.todoLists.find(el => el.id === id).name;
}