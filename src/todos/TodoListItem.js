import React from 'react'
import './TodoListItem.css'
import styled from 'styled-components'

const TodoItemContainer = styled.div`
    border-bottom: 2px transparent solid
`

const TodoItemContainerWithWarning = styled(TodoItemContainer)`
    border-bottom: ${ props => 
        ( new Date(props.createdAt) > new Date( Date.now() - 86400000 * 5 )
        ? 'none'
        : '2px red solid' )};
`

const TodoListItem = ({ todo, onRemovePressed, onMarkAsCompletePressed }) => {
    const Container = todo.isCompleted ? TodoItemContainer : TodoItemContainerWithWarning
    return ( 
        <Container className='card shadow my-2' createdAt={todo.createdAt}>
            <div className="todo-item-container d-flex justify-content-between align-items-center p-2">
                <span className='m-0 text-primary text-muted'>{ todo.text }<br /><span className="small">Created At: &nbsp;{ (new Date(todo.createdAt)).toLocaleDateString() }</span></span>
                <div>
                    <div className="buttons-container btn-group btn-group-sm" role="group" aria-label="Item Actions">
                        { todo.isCompleted 
                            ? <button
                                disabled 
                                className="completed-button btn btn-success" 
                                type="button">Complete <i className="bi bi-check"></i></button>
                            : <button 
                                onClick={() => onMarkAsCompletePressed( todo.id )} 
                                className="completed-button btn btn-primary" 
                                type="button">Mark as Complete</button>
                        }
                        <button 
                            onClick={()=> onRemovePressed( todo.id ) } 
                            className="remove-button btn btn-danger" 
                            type="button">Remove</button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default TodoListItem