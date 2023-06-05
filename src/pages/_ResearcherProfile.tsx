import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { Article, KeyPhrase } from "@/interfaces/data";
import { getArticles } from "@/services/getArticles";
import {
  TextAnalyticsClient,
  AzureKeyCredential,
} from "@azure/ai-text-analytics";
import TopView from "./views/TopView";
import LogicView from "./views/LogicView";

const endpoint = process.env.ENDPOINT as string;
const apiKey = process.env.APIKEY as string;
const credential = new AzureKeyCredential(apiKey);
const client = new TextAnalyticsClient(endpoint, credential);

function _ResearcherProfile() {
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [keyPhrases, setKeyPhrases] = useState<KeyPhrase[]>([]);
  const [topKeyPhrases, setTopKeyPhrases] = useState<KeyPhrase[]>([]);
  const [profileName, setProfileName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [keyPhrasesView, setKeyPhrasesView] = useState(false);

  useEffect(() => {
    async function fetchKeyPhrases() {
      if (articles) {
        setKeyPhrases([]);
        const promises = articles.map((article) => {
          if (article.abstract) {
            return client.recognizeEntities([article.abstract, article.title]);
          } else {
            return client.recognizeEntities([article.title]);
          }
        });

        const resultsArray: any[] = await Promise.all(promises);

        const updatedKeyPhrases: KeyPhrase[] = [];

        for (const results of resultsArray) {
          for (const result of results) {
            for (const newKeyPhrase of result.entities) {
              if (newKeyPhrase.category === "Skill") {
                const foundKeyPhraseIndex = updatedKeyPhrases.findIndex(
                  (keyPhrase) => keyPhrase.phrase === newKeyPhrase.text
                );
                if (foundKeyPhraseIndex !== -1) {
                  updatedKeyPhrases[foundKeyPhraseIndex].frequency += 1;
                } else {
                  updatedKeyPhrases.push({
                    phrase: newKeyPhrase.text,
                    frequency: 1,
                  });
                }
              }
            }
          }
        }
        setKeyPhrases(updatedKeyPhrases);
      }
    }
    fetchKeyPhrases();
  }, [articles]);

  useEffect(() => {
    const top25KeyPhrases = [...keyPhrases]
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 25);
    setTopKeyPhrases(top25KeyPhrases);
  }, [keyPhrases]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    async function fetchData() {
      setLoading(true);
      const result = await getArticles(profileName);
      setLoading(false);
      setArticles(result);
    }
    fetchData();
  };

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setProfileName(event.target.value);
  };

  const handleChangeSwitch = () => {
    setKeyPhrasesView(!keyPhrasesView);
  };

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        alignContent="center"
        justifyContent="center"
        style={{ marginTop: "32px", marginBottom: "5px" }}
      >
        <TopView
          handleChange={handleChange}
          handleChangeSwitch={handleChangeSwitch}
          handleSubmit={handleSubmit}
          profileName={profileName}
        />
        <br />
        <LogicView
          articles={articles}
          keyPhrasesView={keyPhrasesView}
          loading={loading}
          topKeyPhrases={topKeyPhrases}
        />
      </Grid>
    </>
  );
}

export default _ResearcherProfile;
