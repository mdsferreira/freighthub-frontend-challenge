import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

export default function TableActions({ onViewClick, onEditClick }) {
  return (
    <Grid container>
      <Grid item>
        <IconButton size="small" onClick={onViewClick}>
          <VisibilityOutlinedIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton size="small" onClick={onEditClick}>
          <EditOutlinedIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
