import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

let App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<News country="in" category="general" />}
          ></Route>
          <Route
            path="/business"
            element={<News country="in" category="business" />}
          ></Route>
          <Route
            path="/entertainment"
            element={<News country="in" category="entertainment" />}
          ></Route>
          <Route
            path="/health"
            element={<News country="in" category="health" />}
          ></Route>
          <Route
            path="/science"
            element={<News country="in" category="science" />}
          ></Route>
          <Route
            path="/sports"
            element={<News country="in" category="sports" />}
          ></Route>
          <Route
            path="/technology"
            element={<News country="in" category="technology" />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
