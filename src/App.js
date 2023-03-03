import {Route, Switch} from 'react-router-dom'

import Home from './Components/Home'
import CourseItemDetails from './Components/CourseDetails'
import NotFound from './Components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/course/:id" component={CourseItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
