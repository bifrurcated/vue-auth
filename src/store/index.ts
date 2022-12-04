import {ActionContext, createStore} from 'vuex'

export default createStore({
    state: () => ({
        auth: false,
        message: ''
    }),
    getters: {},
    mutations: {
        setAuth: (state: { auth: boolean }, auth: boolean) => {
            state.auth = auth;
        },
        setMessage: (state: {message: string}, message: string) => {
            state.message = message;
        }
    },
    actions: {
        setAuth: (context: ActionContext<any, any>, auth: boolean) => {
            context.commit('setAuth', auth);
        },
        setMessage: (context: ActionContext<any, any>, message: string) => {
            context.commit('setMessage', message);
        }
    },
    modules: {}
})
