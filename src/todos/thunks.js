import { 
    createTodo, 
    removeTodo,
    markAsComplete,
    loadTodosInProgress, 
    loadTodosSuccess, 
    loadTodosFailure 
} from "./actions"

export const loadTodos = () => async ( dispatch, getState ) => {
    
    try {
        dispatch(loadTodosInProgress())
        const response = await fetch('http://localhost:8080/todos')
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
        const response = await fetch('http://localhost:8080/todos', {
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
        const response = await fetch(`//localhost:8080/todos/${id}`,{
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
        
        const response = await fetch(`//localhost:8080/todos/${id}/completed`,{
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