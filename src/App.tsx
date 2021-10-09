import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ResponsiveGrid } from "./components/atoms/responsive-grid/responsive-grid";

const layouts = {
  lg: [
    { i: "1", x: 0, y: 0, w: 1, h: 1, static: false },
    { i: "2", x: 1, y: 0, w: 3, h: 2, static: false },
    { i: "3", x: 6, y: 0, w: 1, h: 2, static: false },
    { i: "4", x: 7, y: 0, w: 1, h: 2, static: false },
  ],
};

const cards = [
  {title: '1',key:'1'},
  {title: '2',key:'2'},
  {title: '3',key:'3'},
  {title: '4',key:'4'},
];

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path=''>
            {/* <List /> */}
            <ResponsiveGrid
              cards={cards}
              layouts={layouts}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
