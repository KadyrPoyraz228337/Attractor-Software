import store from "./store/configureStore";

export default function (role) {
    return store.getState().users.user.role === role
}