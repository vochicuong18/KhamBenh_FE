import React,{ Component } from 'react';
import './App.css';
import RouterURL from './components/RouterURL';
import { BrowserRouter as Router} from "react-router-dom";
class App extends Component {
  
  render () {
    return (
      <Router>
        <div>
          <React.StrictMode>
            <RouterURL></RouterURL>
          </React.StrictMode>
        </div>
      </Router>
    )

  };
}

export default App;
