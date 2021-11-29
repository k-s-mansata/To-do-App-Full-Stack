import axios from "axios";
import {url, setHeaders} from "../../api";
import { toast } from "react-toastify";

export const getTodos = () => {
    return (dispatch) => {
        axios
        .get(`${url}/todos`, setHeaders())
        .then(todos => {
            dispatch({
                type : "GET_TODOS",
                todos
            })
        })
        .catch((error) => {
            console.log(error.response);
            toast.error(error.response?.data, {
                position : toast.POSITION.BOTTOM_CENTER
            });
        });

    } 
}

export const addTodo = (newTodo) => {
    return (dispatch, getState) => {
        const author = getState().auth.name;
        const uid = getState().auth._id;
        axios
        .post(`${url}/todos`, {...newTodo, author, uid}, setHeaders())
        .then(todo => {
            dispatch({
                type : "ADD_TODO",
                todo
            })
        })
        .catch((error) => {
            console.log(error.response);
            toast.error(error.response?.data, {
                position : toast.POSITION.BOTTOM_CENTER
            });
        });

    } 
}

export const updateTodo = (updatedTodo, id) => {
    return (dispatch, getState) => {
        axios
        .put(`${url}/todos/${id}`, updatedTodo, setHeaders())
        .then(todo => {
            dispatch({
                type : "UPDATE_TODO",
                todo
            })
        })
        .catch((error) => {
            console.log(error.response);
            toast.error(error.response?.data, {
                position : toast.POSITION.BOTTOM_CENTER
            });
        });

    } 
}

export const checkTodo = ( id) => {
    return (dispatch, getState) => {
        axios
        .patch(`${url}/todos/${id}`, {}, setHeaders())
        .then(todo => {
            dispatch({
                type : "CHECK_TODO",
                todo
            })
        })
        .catch((error) => {
            console.log(error.response);
            toast.error(error.response?.data, {
                position : toast.POSITION.BOTTOM_CENTER
            });
        });

    } 
}

export const deleteTodo = (id) => {
    return (dispatch, getState) => {
        axios
        .delete(`${url}/todos/${id}`, setHeaders())
        .then(() => {
            dispatch({
                type : "DELETE_TODO",
                id
            })
        })
        .catch((error) => {
            console.log(error.response);
            toast.error(error.response?.data, {
                position : toast.POSITION.BOTTOM_CENTER
            });
        });

    } 
}