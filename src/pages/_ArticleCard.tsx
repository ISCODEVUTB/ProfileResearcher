import React from "react";

import { Article } from "@/interfaces/data";
import { Avatar, ListItemAvatar, ListItemText } from "@mui/material";
import Image from "next/image";

function _ArticleCard({ article }: { article: Article }) {
  return article ? (
    <>
      {article.orcid ? (
        <ListItemAvatar>
          <Avatar>
            <Image src="/orcid.png" alt="orcid" width={48} height={48} />
          </Avatar>
        </ListItemAvatar>
      ) : (
        <></>
      )}
      {article.semanticScholar ? (
        <ListItemAvatar>
          <Avatar>
            <Image
              src="/semanticscholar.png"
              alt="semanticscholar"
              width={48}
              height={48}
            />
          </Avatar>
        </ListItemAvatar>
      ) : (
        <></>
      )}

      <ListItemText primary={article.title} />
    </>
  ) : (
    <></>
  );
}

export default _ArticleCard;
