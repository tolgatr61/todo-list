import axios from "axios";

export function load({commit}) {
    commit("resetState"); // On réinitialise le State (si jamais un autre compte a utilisé le site) ca évitera d'avoir son state pendant le loading
    const AuthStr = 'Bearer '.concat(localStorage.getItem('USER_TOKEN'));
    axios.get('http://138.68.74.39/api/todolists', { headers: { Authorization: AuthStr } })
        .then(response => {
            localStorage.setItem("data", JSON.stringify(response.data))
            console.log('loading ...');
            commit('load', JSON.parse(localStorage.getItem("data")));
        })
        .catch((error) => {
            console.log('error ' + error);
        });
}

export function getTodo({commit}, id) {
    const AuthStr = 'Bearer '.concat(localStorage.getItem('USER_TOKEN'));
    axios.get('http://138.68.74.39/api/todos/' .concat(id), { headers: { Authorization: AuthStr } })
        .then(response => {
            localStorage.setItem('current_todo', JSON.stringify(response.data));
            localStorage.setItem('currentListId', id);
            commit('setFiltre', 'all');
            commit('setCurrentTodos', JSON.parse(localStorage.getItem('current_todo')));
            commit('setCurrentListId', parseInt(localStorage.getItem('currentListId')));
        })
        .catch((error) => {
            console.log('error ' + error);
        });
}

export function createTodoList({commit}, name) {
    const AuthStr = 'Bearer '.concat(localStorage.getItem('USER_TOKEN'));

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': AuthStr,
    }

    axios.post('http://138.68.74.39/api/todolist?name=' . concat(name), null, { headers: headers })
        .then(response => {
            localStorage.setItem("data",JSON.stringify(JSON.parse(localStorage.getItem("data")).concat(response.data)));
            console.log("Todolist ajouté");
            commit('load', JSON.parse(localStorage.getItem("data")));
        })
        .catch((error) => {
            console.log('error ' + error);
        });
}

export function createTodo({commit}, [name, completed, todolist_id]) {
    const AuthStr = 'Bearer '.concat(localStorage.getItem('USER_TOKEN'));

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': AuthStr,
    }

    axios.post('http://138.68.74.39/api/todo', null, { headers: headers , params: {name : name, completed : completed, todolist_id : todolist_id}})
        .then(response => {
            localStorage.setItem("current_todo",JSON.stringify(JSON.parse(localStorage.getItem("current_todo")).concat(response.data)))
            console.log("ca marche");
            commit('setCurrentTodos', JSON.parse(localStorage.getItem("current_todo")));
        })
        .catch((error) => {
            console.log('error ' + error);
        });
}

export function completeTodo({commit}, [id, name, completed, todolist_id]) {
    const AuthStr = 'Bearer '.concat(localStorage.getItem('USER_TOKEN'));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': AuthStr,
    }
    axios.post('http://138.68.74.39/api/completeTodo/' . concat(id), null, { headers: headers , params: {name : name, completed : completed, todolist_id : todolist_id}})
        .then(response => {
            let current = JSON.parse(localStorage.getItem("current_todo"));
            current.find(el => el.id === response.data.id).completed=parseInt(completed);
            localStorage.setItem("current_todo",JSON.stringify(current));
            commit('setCurrentTodos', JSON.parse(localStorage.getItem("current_todo")));
        })
        .catch((error) => {
            console.log('error ' + error);
        });
}

export function modifyTodo({commit}, [id, name, completed, todolist_id]) {
    const AuthStr = 'Bearer '.concat(localStorage.getItem('USER_TOKEN'));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': AuthStr,
    }
    axios.patch('http://138.68.74.39/api/todo/' . concat(id), null, { headers: headers , params: {name : name, completed : completed, todolist_id : todolist_id}})
        .then(response => {
            let current = JSON.parse(localStorage.getItem("current_todo"));
            current.find(el => el.id === response.data.id).name=name;
            localStorage.setItem("current_todo",JSON.stringify(current));
            commit("setCurrentTodos", JSON.parse(localStorage.getItem("current_todo")));
            console.log("j'ai modif");
        })
        .catch((error) => {
            console.log('error ' + error);
        });
}

export function deleteTodoList({commit}, todolist_id) {
    const AuthStr = 'Bearer '.concat(localStorage.getItem('USER_TOKEN'));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': AuthStr,
    }
    axios
        .delete('http://138.68.74.39/api/todolist/' + todolist_id, { headers : headers })
        .then(() => {
            let todelete = JSON.parse(localStorage.getItem("data"));
            let index = todelete.indexOf(todelete.find(el => el.id === todolist_id));
            todelete.splice(index,1);
            localStorage.setItem("data",JSON.stringify(todelete));
            commit("load", JSON.parse(localStorage.getItem("data")));
            // on reset la currentTodo
            localStorage.removeItem("current_todo");
            commit("setCurrentTodos", null);
        })
        .catch((error) => {
            console.log('error ' + error);
        });
}

export function deleteTodo({commit}, id) {
    const AuthStr = 'Bearer '.concat(localStorage.getItem('USER_TOKEN'));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': AuthStr,
    }
    axios
        .delete('http://138.68.74.39/api/todo/' + id, {headers: headers})
        .then(() => {
            let todelete = JSON.parse(localStorage.getItem("current_todo"));
            let index = todelete.indexOf(todelete.find(el => el.id === id));
            todelete.splice(index,1);
            localStorage.setItem("current_todo",JSON.stringify(todelete));
            commit("setCurrentTodos", JSON.parse(localStorage.getItem("current_todo")));
        })
        .catch((error) => {
            console.log('error ' + error);
        });
}