import { useState, useRef } from "react";
import "../styles/plotCardList.css";
import PlotTag from "./PlotTag";

function PlotCardList() {
  const tagArr = [
    {
      id: 1,
      color: "blue",
      name: "극본",
    },
    {
      id: 2,
      color: "yellow",
      name: "판타지",
    },
    {
      id: 3,
      color: "green",
      name: "회귀물",
    },
    {
      id: 4,
      color: "red",
      name: "분량, 전개",
    },
    {
      id: 5,
      color: "purple",
      name: "등장인물",
    },
    {
      id: 6,
      color: "mint",
      name: "허겁지겁",
    },
  ];

  return (
    <>
      {Array.from({ length: 32 }).map((_, i) => (
        <PlotCard
          key={i}
          title="제목입니다."
          contents="내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다..."
          tags={tagArr}
        ></PlotCard>
      ))}
      <PlotCardAdd></PlotCardAdd>
    </>
  );
}

function PlotCard({ title, contents, tags }) {
  return (
    <div className="plotCard">
      <div className="plotCardTitle">
        <div className="heading_1 ft_gray_4">{title}</div>
        <div className="plotCardTitleImg">
          <img src="/burger.png"></img>
        </div>
      </div>
      <div className="plotCardContents body_1 ft_gray_2">{contents}</div>
      <div className="plotCardTagBox no_scroll">
        {tags.map((d) => (
          <PlotTag key={d.id} name={d.name} color={d.color}></PlotTag>
        ))}
      </div>
      <PlotCardFooter
        view="12"
        like="34"
        comment="56"
        createdDt=" 90분 전"
      ></PlotCardFooter>
    </div>
  );
}

function PlotCardAdd() {
  return (
    <div className="plotCardAdd bg_gray_5 shadow_gray_30">
      <img src="plus_square.svg"></img>
    </div>
  );
}

function PlotCardFooter({ view, like, comment, createdDt }) {
  return (
    <div className="plotCardFooter caption_2 ft_gray_94">
      <div className="plotCardFooterCount">
        <div>
          <img src="view.png"></img>
          <span>{view}</span>
        </div>
        <div>
          <img src="like.png"></img>
          <span>{like}</span>
        </div>
        <div>
          <img src="comment.png"></img>
          <span>{comment}</span>
        </div>
      </div>
      <div className="plotCardFooterTime">
        <div>{createdDt}</div>
      </div>
    </div>
  );
}

export default PlotCardList;
