import { 
    CREATE_TODO, 
    REMOVE_TODO, 
    MARK_AS_COMPLETE,
    LOAD_TODOS_IN_PROGRESS,
    LOAD_TODOS_SUCCESS,
    LOAD_TODOS_FAILURE
} from "./actions"

export const isLoading = (state = false, action ) => {
    const { type } = action

    switch ( type ) {
        case LOAD_TODOS_IN_PROGRESS:
            return true
        case LOAD_TODOS_SUCCESS:
        case LOAD_TODOS_FAILURE:
            return false
        default:
            return state
    }
}

export const todos = ( state = [], action ) => {
    console.log("state: ",state)
    const { type, payload } = action

    switch ( type ) {

        case CREATE_TODO: {
            /*
            const { text } = payload
            const newTodo = {
                text,
                isCompleted: false
            }
            return state.concat(newTodo)
            */
            const { todo } = payload
            return state.concat( todo )
        }

        case REMOVE_TODO: {
            const { todo: todoToRemove } = payload
            return state.filter( todo => todo.id !== todoToRemove.id )
        }

        case MARK_AS_COMPLETE: {
            /*
            const { text } = payload
            return state.map( todo => {
                if ( todo.text === text ) {
                    todo.isCompleted = true
                    return todo
                }
                return todo
            })
            */
           const { todo: updatedTodo } = payload
           return state.todos.map( todo => {
            if ( todo.id === updatedTodo.id ) {
                return updatedTodo
            }
            return todo
        })
        }

        case LOAD_TODOS_SUCCESS: {
            const { todos }= payload
            return todos
        }

        case LOAD_TODOS_IN_PROGRESS:
        case LOAD_TODOS_FAILURE:
        default:
            return state

    }

}