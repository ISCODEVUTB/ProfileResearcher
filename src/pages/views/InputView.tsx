import { AccountCircle, SendOutlined } from "@mui/icons-material";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";

type InputViewProps = {
  handleSubmit: (event: any) => void;
  profileName: string;
  handleChange: (event: {
    target: { value: React.SetStateAction<string> };
  }) => void;
};

function InputView({
  handleSubmit,
  profileName,
  handleChange,
}: InputViewProps) {
  return (
    <Grid item style={{ marginLeft: "auto" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label=""
          type="text"
          variant="filled"
          placeholder=""
          name="profileName"
          value={profileName}
          onChange={handleChange}
          style={{ width: "320px", height: "32px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle fontSize="large" />
              </InputAdornment>
            ),
            style: { fontSize: "1.5rem" },
          }}
        />
        <IconButton onClick={handleSubmit}>
          <SendOutlined fontSize="large" />
        </IconButton>
      </form>
    </Grid>
  );
}

export default InputView;
