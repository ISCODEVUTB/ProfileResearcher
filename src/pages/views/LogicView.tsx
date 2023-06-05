import { Sync } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";
import ArticlesList from "../_ArticlesList";
import BubbleChartView from "./BubbleChartView";

import { Article, KeyPhrase } from "@/interfaces/data";

type LogicViewProps = {
  loading: boolean;
  articles: Article[] | null;
  keyPhrasesView: boolean;
  topKeyPhrases: KeyPhrase[];
};

function LogicView({
  loading,
  articles,
  keyPhrasesView,
  topKeyPhrases,
}: LogicViewProps) {
  return (
    <>
      {loading ? (
        <>
          <Sync fontSize="large" sx={{ marginTop: "40px" }} />
          <h1>Cargando...</h1>
        </>
      ) : articles?.length === 0 || !articles ? (
        articles?.length === 0 ? (
          <Grid item sx={{ color: "#1500AB" }}>
            <h1>No se encontro ningun perfil</h1>
          </Grid>
        ) : (
          <Grid item>
            <></>
          </Grid>
        )
      ) : (
        <>
          {!keyPhrasesView ? (
            <ArticlesList articles={articles} />
          ) : (
            <BubbleChartView topKeyPhrases={topKeyPhrases} />
          )}
        </>
      )}
    </>
  );
}

export default LogicView;
