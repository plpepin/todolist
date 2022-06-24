import { 
    createTodo, 
    removeTodo,
    markAsComplete,
    loadTodosInProgress, 
    loadTodosSuccess, 
    loadTodosFailure 
} from "./actions"

import keysDev from '../keys.dev.js'
import keysProd from '../keys.prod.js'

console.log("keysDev",keysDev.remote_storage);
console.log("keysProd",keysProd.remote_storage);

const fetch_url = process.env.NODE_ENV === "production" 
                    ? keysProd.remote_storage
                    : keysDev.remote_storage

export const loadTodos = () => async ( dispatch, getState ) => {

    console.log("loadTodos URL", fetch_url)
    
    try {
        dispatch(loadTodosInProgress())
        const response = await fetch( fetch_url )
        const todos = await response.json()

        dispatch( loadTodosSuccess(todos) )
    } catch (e) {
        dispatch(loadTodosFailure())
        dispatch(displayAlert(e))
    }
    
}

export const addTodoRequest = text => async dispatch => {

    try {
        const body = JSON.stringify({ text })
        const response = await fetch( fetch_url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body
        })
        const todo = await response.json()
        dispatch(createTodo(todo))
    }
    catch (e) {
        dispatch(displayAlert(e))
    }
}

export const removeTodoRequest = id => async dispatch => {
    try {
        const response = await fetch(`${fetch_url}${id}`,{
            method: "delete"
        })
        const removedTodo = await response.json()
        dispatch( removeTodo( removedTodo ))
    } catch (err) {
        dispatch( displayAlert(err))
    }
}

export const markAsCompletedRequest = id => async dispatch => {

    try {
        
        const response = await fetch(`${fetch_url}${id}/completed`,{
            method: 'post'
        })
        const updatedTodo = response.json()
        dispatch( markAsComplete( updatedTodo ) ) 

    } catch (err) {
        
    }

}

export const displayAlert = text => {
    //alert(`The item "${text}" was marked as complete`)
    alert(text)
}