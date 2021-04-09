export const isConnected = (state) => {
    return state.token !== '';
}

export const getWindow = (state) => {
    return state.window;
}

export const getUsername = (state) => {
    return state.currentUser.name;
}

export const getEmail = (state) => {
    return state.currentUser.email;
}