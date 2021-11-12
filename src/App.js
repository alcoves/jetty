import React from "react";

import { Route } from "react-router-dom";

const Content = styled.div`
  overflow: auto;
  width: calc(100vw - 60px);
  height: calc(1000vh - 30px);
`;

function App() {
  return (
    <div>
      Here it is
      {/* <TitleBar />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Sidebar />
        <Content>
          <Route exact path="/" component={Home} />
          <Route exact path="/settings" component={Settings} />
        </Content>
      </div> */}
    </div>
  );
}

export default App;