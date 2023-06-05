import { Grid, Typography } from "@mui/material";
import React from "react";
import InputView from "./InputView";
import SwitchButton from "./SwitchButton";

type TopViewProps = {
  handleSubmit: (event: any) => void;
  profileName: string;
  handleChange: (event: {
    target: { value: React.SetStateAction<string> };
  }) => void;
  handleChangeSwitch: () => void;
};

function TopView({
  handleSubmit,
  profileName,
  handleChange,
  handleChangeSwitch,
}: TopViewProps) {
  return (
    <>
      <Grid item>
        <Typography
          style={{ fontFamily: "Oswald, sans-serif" }}
          variant="h2"
          component="h1"
          gutterBottom
        >
          Researcher Profile
        </Typography>
      </Grid>

      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      ></Grid>

      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <InputView
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          profileName={profileName}
        />
        <SwitchButton handleChangeSwitch={handleChangeSwitch} />
      </Grid>
    </>
  );
}

export default TopView;
