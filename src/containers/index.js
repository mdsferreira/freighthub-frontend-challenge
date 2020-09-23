import React, { createContext, useState } from "react";
import HeaderBar from "../components/HeaderBar";
import GlobalStyles from "./styles/GlobalStyles";
import ShipmentList from "./shipment";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ShipmentDetail from "./shipment/Detail";
import { Box } from "@material-ui/core";

const queryCache = new QueryCache();

export const SearchContext = createContext(null);

function App() {
  const [searchText, setSearchText] = useState("");
  return (
    <Box pt={7}>
      <SearchContext.Provider value={{ searchText, setSearchText }}>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <Router>
            <HeaderBar />
            <Switch>
              <Route exact path="/">
                <ShipmentList />
              </Route>
              <Route path="/:shipmentId">
                <ShipmentDetail />
              </Route>
            </Switch>
          </Router>
        </ReactQueryCacheProvider>
      </SearchContext.Provider>

      <GlobalStyles />
    </Box>
  );
}

export default App;
