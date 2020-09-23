import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  TablePagination,
  Paper,
  TableSortLabel,
  TextField,
  Button,
  Hidden,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CheckIcon from "@material-ui/icons/Check";
import StatusText from "../../components/StatusText";
import TableActions from "../../components/TableActions";
import Axios from "axios";
import { urls } from "../../utils/url";
import LoadingOverlay from "react-loading-overlay";
import { useHistory } from "react-router-dom";

const status = {
  ERROR: "error",
  SUCCESS: "success",
  LOADING: "loading",
};

export default function ShipmentTable({
  shipmentList,
  sort,
  order,
  limit,
  page,
  onChangePage,
  requestSort,
  onChangeRowsPerPage,
  isFetching,
  isLoading,
}) {
  const [editShipmentId, setEditShipmentId] = useState(null);
  const [newName, setNewName] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const classes = useStyles();
  const history = useHistory();

  const handleEdit = (shipment) => {
    setNewName(shipment.name);
    setEditShipmentId(shipment.id);
  };

  const handleSave = (id) => {
    if (!newName) {
      setEditStatus(status.ERROR);
    } else {
      setEditStatus(status.LOADING);
      Axios.patch(`${urls.shipment}/${id}`, {
        name: newName,
      }).then(() => {
        setEditStatus(status.SUCCESS);
      });
    }
  };

  const handleView = (shipmentId) => {
    history.push({
      pathname: `/${shipmentId}`,
    });
  };

  useEffect(() => {
    if (editStatus === status.SUCCESS) {
      setTimeout(() => {
        setEditStatus("");
        setEditShipmentId(null);
      }, 2000);
    }
  }, [editStatus]);

  return (
    <Paper className={classes.paper}>
      <LoadingOverlay active={isLoading || isFetching} spinner>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sortDirection={sort === "id" ? order : false}>
                <TableSortLabel
                  active={sort === "id"}
                  direction={sort === "id" ? order : "asc"}
                  onClick={() => requestSort("id")}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sort === "name" ? order : false}>
                <TableSortLabel
                  active={sort === "name"}
                  direction={sort === "name" ? order : "asc"}
                  onClick={() => requestSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <Hidden smDown>
                <TableCell sortDirection={sort === "mode" ? order : false}>
                  <TableSortLabel
                    active={sort === "mode"}
                    direction={sort === "mode" ? order : "asc"}
                    onClick={() => requestSort("mode")}
                  >
                    Mode
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={sort === "origin" ? order : false}>
                  <TableSortLabel
                    active={sort === "origin"}
                    direction={sort === "origin" ? order : "asc"}
                    onClick={() => requestSort("origin")}
                  >
                    Origin
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sortDirection={sort === "destination" ? order : false}
                >
                  <TableSortLabel
                    active={sort === "destination"}
                    direction={sort === "destination" ? order : "asc"}
                    onClick={() => requestSort("destination")}
                  >
                    Destination
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sortDirection={sort === "status" ? order : false}
                  align="center"
                >
                  <TableSortLabel
                    active={sort === "status"}
                    direction={sort === "status" ? order : "asc"}
                    onClick={() => requestSort("status")}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={sort === "total" ? order : false}>
                  <TableSortLabel
                    active={sort === "total"}
                    direction={sort === "total" ? order : "asc"}
                    onClick={() => requestSort("total")}
                  >
                    Total
                  </TableSortLabel>
                </TableCell>
              </Hidden>

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipmentList &&
              shipmentList.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell>{shipment.id}</TableCell>
                  <TableCell>
                    {editShipmentId === shipment.id ? (
                      <TextField
                        label="type the new name"
                        id="shipment-name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        fullWidth
                        helperText={
                          editStatus === status.ERROR ? "Incorrect entry." : ""
                        }
                        error={editStatus === status.ERROR}
                      />
                    ) : (
                      shipment.name
                    )}
                  </TableCell>
                  <Hidden smDown>
                    <TableCell>{shipment.mode}</TableCell>
                    <TableCell>{shipment.origin}</TableCell>
                    <TableCell>{shipment.destination}</TableCell>
                    <TableCell>
                      <StatusText status={shipment.status} />
                    </TableCell>
                    <TableCell>{shipment.total}</TableCell>
                  </Hidden>

                  <TableCell>
                    {editShipmentId === shipment.id ? (
                      <>
                        <Button
                          color={
                            editStatus === status.SUCCESS
                              ? "inherit"
                              : "primary"
                          }
                          variant="contained"
                          size="small"
                          onClick={() => handleSave(shipment.id)}
                          startIcon={
                            editStatus === status.SUCCESS ? (
                              <CheckIcon />
                            ) : (
                              <SaveIcon />
                            )
                          }
                          disabled={editStatus === status.SUCCESS}
                        >
                          {editStatus === status.SUCCESS ? "Saved" : "Save"}
                        </Button>
                      </>
                    ) : (
                      <TableActions
                        onEditClick={() => handleEdit(shipment)}
                        onViewClick={() => handleView(shipment.id)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[20, 40, 60]}
          component="div"
          count={-1}
          rowsPerPage={limit}
          page={page - 1}
          onChangePage={(e, newPage) => onChangePage(newPage)}
          onChangeRowsPerPage={onChangeRowsPerPage}
          labelDisplayedRows={({ from }) =>
            `${from}-${from + shipmentList?.length - 1}`
          }
          labelRowsPerPage="Rows"
        />
      </LoadingOverlay>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "10px 0",
  },
}));
