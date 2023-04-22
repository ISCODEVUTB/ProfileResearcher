import React, { useState, useEffect } from "react";
import { getProfileByName } from "@/services/semanticScholar";
import {
  TextField,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { AccountCircle, ExpandMore, SendOutlined } from "@mui/icons-material";
import SemanticScholar from "./_SemanticScholar";
import { Data } from "@/interfaces/Data";

function _ResearcherProfile() {
  const [data, setData] = useState<Data | null>(null);
  const [profileName, setProfileName] = useState<String>("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    async function fetchData() {
      console.log(profileName);
      const result = await getProfileByName(profileName);
      setData(result);
    }
    fetchData();
  };

  const handleChange = (event: {
    target: { value: React.SetStateAction<String> };
  }) => {
    setProfileName(event.target.value);
  };

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        alignContent="center"
        justifyContent="center"
        style={{ marginTop: "120px", marginBottom: "120px" }}
      >
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
        <Grid item>
          <form onSubmit={handleSubmit}>
            <TextField
              label=""
              type="text"
              variant="filled"
              placeholder=""
              name="profileName"
              value={profileName}
              onChange={handleChange}
              sx={{ width: "240px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle fontSize="large" />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton onClick={handleSubmit}>
              <SendOutlined fontSize="large" />
            </IconButton>
          </form>
        </Grid>

        <br />
        {data?.total === 0 || !data?.total ? (
          data?.total === 0 ? (
            <Grid item sx={{ color: "#1500AB" }} >
              <h1>No se encontro ningun perfil</h1>
            </Grid>
          ) : (
            <Grid item>
              <></>
            </Grid>
          )
        ) : (
          <SemanticScholar data={data} />
        )}
      </Grid>
    </>
  );
}

export default _ResearcherProfile;
