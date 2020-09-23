import React from "react";
import {
  Paper,
  Grid,
  Container,
  Typography,
  makeStyles,
  Breadcrumbs,
} from "@material-ui/core";
import { useQuery } from "react-query";
import { fetchShipmentById } from "../../core/actions/shipment";
import { useParams, useHistory } from "react-router-dom";
import StatusText from "../../components/StatusText";
import HomeIcon from "@material-ui/icons/Home";
import GrainIcon from "@material-ui/icons/Grain";
import { CustomLink } from "../../components/CustomLink";
import uuid from "react-uuid";

export default function ShipmentDetail({ match }) {
  const classes = useStyles();
  let { shipmentId } = useParams();
  const history = useHistory();
  const { data: shipment } = useQuery(
    ["shipment", shipmentId],
    fetchShipmentById
  );

  return (
    <Container className={classes.root} maxWidth="xl">
      <Grid
        container
        direction="row"
        className={classes.body}
        justify="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item md={12}>
          <Typography variant="h4">Shipment {shipment?.data.id}</Typography>
        </Grid>
        <Grid item md={12}>
          <Breadcrumbs className={classes.breadcrumbs}>
            <CustomLink href="#" onClick={() => history.goBack()}>
              <HomeIcon />
              <Typography component="span">Home</Typography>
            </CustomLink>
            <CustomLink href="#">
              <GrainIcon />
              {shipment?.data.id}
            </CustomLink>
            Core
          </Breadcrumbs>
        </Grid>
        <Grid item md={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item md={10} xs={12}>
                <Typography variant="h5" className={classes.name}>
                  {shipment?.data.name}
                </Typography>
              </Grid>
              <Grid item md={2} xs={12}>
                <StatusText status={shipment?.data.status || ""} />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item md={1} xs={2}>
                Origin:
              </Grid>
              <Grid item md={5} xs={10}>
                {shipment?.data.origin}
              </Grid>
              <Grid item md={1} xs={4}>
                Destination:
              </Grid>
              <Grid item md={5} xs={8}>
                {shipment?.data.destination}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item md={1}>
                Mode:
              </Grid>
              <Grid item md={5}>
                {shipment?.data.mode}
              </Grid>
              <Grid item md={1}>
                Total:
              </Grid>
              <Grid item md={5}>
                {shipment?.data.total}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item md={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.name}>
              Cargos
            </Typography>
            {shipment?.data.cargo &&
              shipment?.data.cargo.map((cargo) => (
                <Grid container spacing={2} key={uuid()}>
                  <Grid item md={1}>
                    Description:
                  </Grid>
                  <Grid item md={5}>
                    {cargo.description}
                  </Grid>
                  <Grid item md={1}>
                    Type:
                  </Grid>
                  <Grid item md={2}>
                    {cargo.type}
                  </Grid>
                  <Grid item md={1}>
                    Volume:
                  </Grid>
                  <Grid item md={2}>
                    {cargo.volume}
                  </Grid>
                </Grid>
              ))}
          </Paper>
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
    padding: "10px",
    marginBottom: "10px",
  },
  name: {
    marginBottom: "20px",
  },
  breadcrumbs: {
    color: "#ccc",
  },
}));
