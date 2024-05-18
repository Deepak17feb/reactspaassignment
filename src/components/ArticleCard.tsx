import React from "react";
import { Article } from "../types/types";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const initURL = "https://dev-storm-rest-api.pantheonsite.io/";
  return (
    <div className="article-card" key={article.id}>
      <div className="article-top">
        <div className="article-image">
          <img src={initURL + article.image} alt={article.title} />
        </div>
        <div className="article-title">
          <div className="article-date-source">
            <p className="article-date">{article.date}</p>
            <p className="article-source">{article.source}</p>
          </div>
          <h2 className="article-heading">{article.title}</h2>
        </div>
      </div>
      <div className="article-bottom">
        <p
          className="article-description"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        <p className="article-author">{article.author}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
