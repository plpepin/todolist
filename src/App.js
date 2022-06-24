import './App.css'
import TodoList from './todos/TodoList'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import styled from 'styled-components'
import keysDev from './keys.dev'
import keysProd from './keys.prod'

const remote_storage = process.env.NODE_ENV === "production" 
                              ? keysProd.remote_storage
                              : keysDev.remote_storage

const TodoListHeading = styled.h1`
  color: white;
`
const AppContainer = styled.div`
  text-align: center;
  /*background-color: #282c34;*/
  background: linear-gradient(#282c34,#000);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* font-size: calc(10px + 2vmin); */
  color: white;
`

const App = () => (
  <AppContainer>
    <div className='container pb-5'>
      <TodoListHeading className="display-1 p-5">Todo List</TodoListHeading>
      <TodoList />
    </div>
    <p>remote storage: {remote_storage}</p>
    <Footer />
  </AppContainer>
)

const Badge = (props) => {

  const bg = props.type === "tech" ? "bg-info" : "bg-success"

  return (
    <span className={`badge text-dark m-1 ${bg}`}>
      <small>{props.children}</small>
    </span>
  )
}

const Footer = (props) => (
  <>
    <h2 className="p-0 h4">From <strong>Building Modern Projects with React</strong></h2>
    <p className='p-5 pt-1 pb-0'>This app was created as a result of <a href="https://www.linkedin.com/learning/building-modern-projects-with-react/" target="new">this course</a> and slightly modified to experiment with Bootstrap Bootstrap v5.1.3</p>
    <p className='p-5 py-1 pb-3'>Testing Redux with Mocha &amp; Chai were not performed in this project but were part of the course. Needing more in depth understanding first.</p>
    <small className="m-2">Created with</small>
    <p className="text-uppercase">
      <Badge>Create React App</Badge>
      <Badge>Side Effects Hooks</Badge>
      <Badge>Redux</Badge>
      <Badge>Thunks</Badge>
      <Badge>PresistGate</Badge>
      <Badge>Provider</Badge>
      <Badge>Styled &amp; Extended Styled Components</Badge>
      <Badge>Bootstrap</Badge>
    </p>

    {/* <h2 className="fs-6">Tested with</h2>
    <p className="text-uppercase">
      <Badge>Reducers</Badge>
      <Badge>Selectors</Badge>
      <Badge>Thunks &amp; Styled Components</Badge>
      <Badge type="tech">Mocha</Badge>
      <Badge type="tech">Chai</Badge> 
    </p> */}

    <p>Pierre-Luc Pepin - 2022</p>
  </>  
)

export default App;