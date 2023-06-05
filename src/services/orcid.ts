const { parseStringPromise } = require("xml2js");

async function getORCIDProfileByName(profileName = <String>"") {
  const responseXML = await fetch(
    `https://pub.orcid.org/v3.0/search?q="${profileName}"&rows=10`
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  // Recommendation: handle errors
  if (!responseXML.ok) {
    throw new Error("No!!!");
  }
  const responseTrim = (await responseXML.text()).trim();
  const responseJson: {
    "search:search": {
      "search:result": [
        { "common:orcid-identifier": [{ "common:path": [string] }] }
      ];
    };
  } = await parseStringPromise(responseTrim);
  const result = responseJson["search:search"]["search:result"];
  const ids: string[] = [];
  if (!!result) {
    result.forEach((r) => {
      ids.push(r["common:orcid-identifier"][0]["common:path"][0]);
    });
  }

  return ids;
}

async function getORCIDProfileById(profileId = <String>"") {
  const responseXML = await fetch(
    `https://pub.orcid.org/v3.0/${profileId}/works`
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  // Recommendation: handle errors
  if (!responseXML.ok) {
    throw new Error("No!!!");
  }
  const responseTrim = (await responseXML.text()).trim();
  const responseJson: {
    "activities:works": {
      "activities:group": [
        {
          "work:work-summary": [
            { "work:title": [{ "common:title": [string] }] }
          ];
        }
      ];
    };
  } = await parseStringPromise(responseTrim);
  const articles = responseJson["activities:works"]["activities:group"];
  const articlesParsed: string[] = [];

  if (!!articles) {
    articles.forEach((article) => {
      articlesParsed.push(
        article["work:work-summary"][0]["work:title"][0]["common:title"][0]
      );
    });
  }

  return articlesParsed;
}

export { getORCIDProfileByName, getORCIDProfileById };
