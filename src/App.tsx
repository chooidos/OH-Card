import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Card } from "./components/atoms/card/card";
import { ResponsiveGrid } from "./components/atoms/responsive-grid/responsive-grid";

const layouts = {
  lg: [
    { i: "1", x: 0, y: 0, w: 1, h: 1, static: false },
    { i: "2", x: 1, y: 0, w: 3, h: 2, static: false },
    { i: "3", x: 6, y: 0, w: 1, h: 2, static: false },
  ],
};

const cards = [
  { title: "a", key: "1" },
  { title: "b", key: "2" },
  { title: "c", key: "3" },
];

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path=''>
            {/* <List /> */}
            <ResponsiveGrid
              layouts={layouts}
              cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            >
              {cards.map((item, index) => (
                <Card key={item.key} title={item.title}>
                  <span className='text drag'>{index}</span>
                </Card>
              ))}
            </ResponsiveGrid>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
