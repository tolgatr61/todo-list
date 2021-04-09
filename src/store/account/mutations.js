export function login (state, token) {
    state.token = token;
}

export function error (state, error) {
    state.errors.push(error);
}

export function logout(state) {
    state.token = '';
    state.window = "login";
    state.currentUser = '';
    state.errors = [];

    localStorage.clear();
}

export function setWindow(state, windowName) {
    state.window = windowName;
}

export function setUser(state, data) {
    state.currentUser = data;
}