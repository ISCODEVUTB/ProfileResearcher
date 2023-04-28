import { ExpandMore } from "@mui/icons-material";
import {
  Grid,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  List,
} from "@mui/material";
import React from "react";
import SCProfileData from "./_SCProfileData";
import { Data } from "@/interfaces/data";

function _SemanticScholar({ data = {} as Data }) {
  return (
    <>
      <Grid item>
        <Accordion
          sx={{
            bgcolor: "#B7E5FD",
            color: "#333333",
            marginTop: "20px",
            width: "1200px",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore sx={{ color: "#333333" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>SemanticScholar [{data?.total}]</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List
              sx={{
                width: "92%",
                bgcolor: "#7CC8F1",
                color: "#333333",
                position: "relative",
                overflow: "auto",
                marginLeft: "40px",
                //maxHeight: 700,

                "& ul": { padding: 0 },
              }}
              subheader={<li />}
            >
              <ul>
                <hr/>
                {data?.data?.map((profile) => (
                  <li key={profile.authorId}  >
                    <SCProfileData profileId={profile.authorId} />
                    <hr />
                  </li>
                ))}
              </ul>
            </List>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </>
  );
}

export default _SemanticScholar;
