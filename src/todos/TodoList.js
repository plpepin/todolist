import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import NewTodoForm from './NewTodoForm'
import TodoListItem from './TodoListItem'
import { loadTodos, removeTodoRequest, markAsCompletedRequest } from './thunks'




const TodoList = ({ todos = [], onRemovePressed, onMarkAsCompletePressed, isLoading, startLoadingTodos }) => {

    useEffect(() => {
        startLoadingTodos()
    }, [])
    console.log(todos)
    const loadingMessage = <div>Loading todos...</div>
    const content = (
        <div className="list-wrapper">
            <NewTodoForm />
            {
                todos.map( todo => 
                    <TodoListItem 
                        todo={todo} 
                        onMarkAsCompletePressed={onMarkAsCompletePressed} 
                        onRemovePressed={onRemovePressed} 
                    />
                )
            }
        </div>
    )
    return isLoading ? loadingMessage : content
};

// mapStateToProps is a function 
// which takes "state" as a param 
// and returns an object 
const mapStateToProps = state => ({
    isLoading: state.isLoading,
    todos: state.todos,
})

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch( loadTodos() ),
    onRemovePressed: id => dispatch ( removeTodoRequest(id) ),
    onMarkAsCompletePressed: id => dispatch ( markAsCompletedRequest(id) )
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)