import { getORCIDProfileById, getORCIDProfileByName } from "./orcid";
import { getSCProfileById, getSCProfileByName } from "./semanticScholar";

async function getArticles(profileName = <String>"") {
  let articles: {
    title: string;
    abstract: string | null;
    semanticScholar: boolean;
    orcid: boolean;
  }[] = [];
  const profiles: { data: { authorId: string }[] } = await getSCProfileByName(
    profileName
  );

  for (const profile of profiles.data) {
    const papersI: {
      paperId: string;
      title: string;
      abstract: string;
      openAccessPdf: string;
    }[] = (await getSCProfileById(profile.authorId)).papers;
    for (const paper of papersI) {
      let hasDuplicate = false;
      articles.forEach((article) => {
        if (article.title === paper.title) {
          hasDuplicate = true;
        }
      });
      if (!hasDuplicate) {
        articles.push({
          title: paper.title,
          abstract: paper.abstract,
          semanticScholar: true,
          orcid: false,
        });
      }
    }
  }

  const orcidIds: string[] = await getORCIDProfileByName(profileName);
  if (!!orcidIds && orcidIds.length > 0) {
    for (const orcidId of orcidIds) {
      const papersI: string[] = await getORCIDProfileById(orcidId);
      for (const paperI of papersI) {
        let hasDuplicate = false;
        articles.forEach((article, i) => {
          if (article.title === paperI) {
            hasDuplicate = true;
            articles[i].orcid = true;
          }
        });
        if (!hasDuplicate) {
          articles.push({
            title: paperI,
            abstract: null,
            semanticScholar: false,
            orcid: true,
          });
        }
      }
    }
  }

  return articles;
}

export { getArticles };
