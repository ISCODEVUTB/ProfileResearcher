import React, { useState } from "react";
import ArticleCard from "./_ArticleCard";
import { Article } from "@/interfaces/data";
import { List, ListItem, Pagination } from "@mui/material";

function ArticlesList(
  { articles }: { articles: Article[] } = { articles: [] }
) {
  const [currentPage, setCurrentPage] = useState(1);

  if (!articles) {
    return <></>;
  }

  const itemsPerPage = 10;
  const totalItems = articles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentItems = articles.slice(startIndex, endIndex);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Pagination
        sx={{
          backgroundColor: "#0022ff20",
          marginTop: "20px",
        }}
        count={totalPages}
        onChange={handlePageChange}
        page={currentPage}
        showFirstButton
        showLastButton
      />
      <List
        sx={{
          width: "100%",
          maxWidth: 1240,
          bgcolor: "#7CC8F1",
          borderColor: "#0015fff",
          border: "10px",
        }}
        component="nav"
        aria-label="mailbox folders"
      >
        {currentItems &&
          currentItems.map((item, i) => (
            <ListItem button key={i}>
              <ArticleCard article={item} />
            </ListItem>
          ))}
      </List>
    </>
  );
}

export default ArticlesList;
