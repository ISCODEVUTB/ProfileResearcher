import { getProfileById } from "@/services/semanticScholar";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  List,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface openAccessPdf {
  url: string;
  status: string;
}

interface paper {
  paperId: string;
  title: string;
  abstract: string | null;
  openAccessPdf: openAccessPdf;
}

interface ProfileData {
  authorId: string;
  externalIds: {
    DBLP: string[];
    ORCID: string;
  };
  url: string;
  name: string;
  affiliations: string[];
  homepage: string;
  paperCount: number;
  citationCount: number;
  papers: paper[];
}

function _SCProfileData({ profileId = "" }) {
  const [data, setData] = useState<ProfileData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const result = await getProfileById(profileId);
      setData(result);
    }

    fetchData();
  }, [profileId]);

  return (
    <Accordion
      sx={{
        bgcolor: "#7CC8F1",
        color: "#333333",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore sx={{ color: "#333333" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          {" "}
          [{data?.authorId}] {data?.name}{" "}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List
          sx={{
            width: "92%",
            bgcolor: "#7FB7F1",
            color: "#333333",
            position: "relative",
            overflow: "auto",
            marginLeft: "40px",
            //maxHeight: 300,

            "& ul": { padding: 0 },
          }}
          subheader={<li />}
        >
          <ul>
            <li>ORCID: {data?.externalIds.ORCID}</li>
            <li>Afiliacion: {data?.affiliations}</li>
            <li>Citaciones: {data?.citationCount}</li>
            <li>
              Pagina:{" "}
              {data?.homepage && (
                <>
                  <Link href={data.homepage}>
                    {" "}
                    <span>{data.homepage}</span>{" "}
                  </Link>
                </>
              )}{" "}
            </li>
            <li>
              SemanticScholar Url:{" "}
              {data?.url && (
                <>
                  <Link href={data.url}>
                    {" "}
                    <span>{data.url}</span>{" "}
                  </Link>
                </>
              )}{" "}
            </li>

            <Accordion
              sx={{
                bgcolor: "#BBDEFB",
                color: "#333333",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore sx={{ color: "#333333" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Articulos: [{data?.paperCount}]</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List
                  sx={{
                    width: "92%",
                    bgcolor: "#BBDEFB",
                    color: "#333333",
                    position: "relative",
                    overflow: "auto",
                    marginLeft: "40px",
                    //maxHeight: 300,

                    "& ul": { padding: 0 },
                  }}
                  subheader={<li />}
                >
                  <ul>
                    {data?.papers?.map((paper, i) => (
                      <li key={`paper-${paper.paperId}`}>
                        <strong>[{i+1}] {paper.title}</strong>
                        <br />
                        {paper.openAccessPdf && (
                          <>
                            <strong>
                              {paper.openAccessPdf?.url && (
                                <>
                                  <Link href={paper.openAccessPdf.url}>
                                    {" "}
                                    <span>{paper.openAccessPdf.url}</span>{" "}
                                  </Link>
                                </>
                              )}{" "}
                            </strong>
                            <br />
                          </>
                        )}
                        <br />
                        <span>{paper.abstract}</span>
                        <hr />
                      </li>
                    ))}
                  </ul>
                </List>
              </AccordionDetails>
            </Accordion>
          </ul>
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

export default _SCProfileData;
