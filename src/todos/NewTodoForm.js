import React, { useState } from 'react'
import { connect } from 'react-redux'
//import { createTodo } from './actions'
import { addTodoRequest } from './thunks'
import './NewTodoForm.css'

const NewTodoForm = ({ todos, onCreatePressed }) => {
    
    const [inputValue, setInputValue] = useState('')

    return (
        <div className='shadow'>
            <div className="pb-3">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">todo:</span>
                    </div>
                    <input className="form-control" type="text" value={inputValue} onChange={ e => setInputValue(e.target.value)} placeholder="Type your new todo here" />
                    <button className="btn btn-primary" onClick={() => {
                        const isDuplicateText = todos.some(todo => todo.text === inputValue)

                        if ( !isDuplicateText )
                        {
                            onCreatePressed( inputValue )
                            setInputValue('')
                        }
                        
                    }}>Create Todo</button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    todos: state.todos
})

const mapDispatchToProps = dispatch => ({
    //onCreatePressed: text => dispatch( createTodo(text) )
    onCreatePressed: text => dispatch( addTodoRequest(text) )
})


export default connect(mapStateToProps,mapDispatchToProps)(NewTodoForm)