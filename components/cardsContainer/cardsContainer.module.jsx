import React from "react";
import { CardComponent } from "../card/card.components";
import classes from "./cardsContainer.module.scss";

export const CardContainer = ({ blogs }) => {
  return (
    <div className={classes.container}>
      {blogs &&
        blogs.map(
          ({ coverPhoto, title, likes, creator, updatedAt, isPrivate, id }) => {
            return (
              <CardComponent
                key={id}
                id={id}
                coverPhoto={coverPhoto}
                title={title}
                likes={likes}
                creator={creator}
                updatedAt={updatedAt}
                isPrivate={isPrivate}
              />
            );
          }
        )}
    </div>
  );
};
