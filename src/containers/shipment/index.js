import React, { useState, useContext } from "react";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { usePaginatedQuery } from "react-query";
import { fetchShipmentList } from "../../core/actions/shipment";
import ShipmentTable from "./ShipmentTable";
import { SearchContext } from "..";

export default function ShipmentList() {
  const classes = useStyles();
  const [filterParams, setfilterParams] = useState({
    _limit: 20,
    _page: 1,
    _sort: "id",
    _order: "asc",
  });
  const { searchText } = useContext(SearchContext);

  const { isFetching, isLoading, resolvedData: shipments } = usePaginatedQuery(
    ["shipments", searchText ? { id_like: searchText } : filterParams],
    fetchShipmentList
  );

  const handleChangeRowsPerPage = (event) => {
    setfilterParams({
      ...filterParams,
      _limit: parseInt(event.target.value, 10),
      _page: 1,
    });
  };

  const handleRequestSort = (property) => {
    const isAsc =
      filterParams._sort === property && filterParams._order === "asc";
    setfilterParams({
      ...filterParams,
      _sort: property,
      _order: isAsc ? "desc" : "asc",
    });
  };

  return (
    <Container className={classes.root} maxWidth="xl">
      <Grid
        container
        direction="row"
        className={classes.body}
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item md={12}>
          <Typography variant="h4">Shipment List</Typography>
        </Grid>

        <Grid item className={classes.tableContainer}>
          <ShipmentTable
            shipmentList={shipments?.data}
            sort={filterParams._sort}
            order={filterParams._order}
            limit={filterParams._limit}
            page={filterParams._page}
            requestSort={handleRequestSort}
            onChangePage={(newPage) =>
              setfilterParams({ ...filterParams, _page: newPage + 1 })
            }
            onChangeRowsPerPage={handleChangeRowsPerPage}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc( 100% - 64px )",
    overflow: "auto",
  },
  body: {
    marginTop: "20px",
  },
  paper: {
    margin: "10px 0",
  },
  tableContainer: {
    width: "100%",
  },
}));
