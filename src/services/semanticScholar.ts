async function getSCProfileByName(profileName = <String>"") {
  const response = await fetch(
    `https://api.semanticscholar.org/graph/v1/author/search?query=${profileName}`
  );
  if (!response.ok) {
    return {
      total: 0,
      data: [],
    };
  }
  const responseJson = await response.json();
  return responseJson;
}

async function getSCProfileById(profileId = <String>"") {
  const response = await fetch(
    `https://api.semanticscholar.org/graph/v1/author/${profileId}?fields=url,name,affiliations,homepage,paperCount,papers.title,papers.abstract,papers.openAccessPdf,citationCount,externalIds`
  );
  if (!response.ok) {
    throw new Error("No!!!");
  }
  const responseJson = await response.json();
  return responseJson;
}

export { getSCProfileByName, getSCProfileById };
