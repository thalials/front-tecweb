import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './views/homePage';
import Register from './views/register';

function App() {
  return (
    <Router>
      <Route exact path="/" component= { HomePage } />
      <Route exact path="/register" component= { Register } />
    </Router>
  );
}

export default App;
