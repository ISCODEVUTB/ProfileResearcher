async function getProfileByName(profileName = <String>"") {
  const resf = await fetch(`https://api.semanticscholar.org/graph/v1/author/search?query=${profileName}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  // Recommendation: handle errors
  if (!resf.ok) {
    return {
      total: 0,
      data: []
    }
  }
  const resj = await resf.json();
  return resj;
}

async function getProfileById(profileId = <String>"") {
  const resf = await fetch(`https://api.semanticscholar.org/graph/v1/author/${profileId}?fields=url,name,affiliations,homepage,paperCount,papers.title,papers.abstract,papers.openAccessPdf,citationCount,externalIds`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  // Recommendation: handle errors
  if (!resf.ok) {
    throw new Error('No!!!');
  }
  const resj = await resf.json();
  return resj;
}

export {
  getProfileByName,
  getProfileById
}