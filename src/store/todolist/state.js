export default function () {
    return {
        todoLists: localStorage.getItem("data") != null ? JSON.parse(localStorage.getItem("data")) : null,
        currentTodos: localStorage.getItem("current_todo") != null ? JSON.parse(localStorage.getItem("current_todo")) : null,
        currentListId: localStorage.getItem("currentListId") != null ? parseInt(localStorage.getItem("currentListId")) : null,
        filtre: 'all',
    }
}