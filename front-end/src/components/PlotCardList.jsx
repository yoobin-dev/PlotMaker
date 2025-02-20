import { useState, useRef, useEffect } from "react";
import "../styles/plotCardList.css";
import PlotTag from "./PlotTag";
import { PlotCardTitleToggle } from "./ToggleMenu";
import plotApi from "../api/plotApi";

function PlotCardList() {
  const [plotList, setPlotList] = useState([]);
  const [toggleOn, setToggleOn] = useState(false);

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

  const PlotCardTagBoxScroll = () => {
    const tagBoxs = document.querySelectorAll(".plotCardTagBox");

    tagBoxs.forEach((tagBox) => {
      let isDown = false;
      let startX;
      let scrollLeft;

      tagBox.addEventListener("mousedown", (e) => {
        isDown = true;
        tagBox.classList.add("active");
        startX = e.pageX - tagBox.offsetLeft;
        scrollLeft = tagBox.scrollLeft;
        tagBox.style.cursor = "grabbing";
      });

      tagBox.addEventListener("mouseleave", () => {
        isDown = false;
        tagBox.style.cursor = "grab";
      });

      tagBox.addEventListener("mouseup", () => {
        isDown = false;
        tagBox.style.cursor = "grab";
      });

      tagBox.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - tagBox.offsetLeft;
        const walk = (x - startX) * 1; // 속도 조절
        tagBox.scrollLeft = scrollLeft - walk;
      });
    });
  };

  useEffect(() => {
    PlotCardTagBoxScroll();
  }, []);

  return (
    <>
      {Array.from({ length: 32 }).map((d, i) => (
        <PlotCard
          key={i}
          id={i}
          title="제목입니다."
          contents="내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다..."
          tags={tagArr}
          toggleOn={toggleOn}
          setToggleOn={setToggleOn}
        ></PlotCard>
      ))}
      <PlotCardAdd></PlotCardAdd>
    </>
  );
}

function PlotCard({ id, title, contents, tags, toggleOn, setToggleOn }) {
  return (
    <div className="plotCard">
      <div className="plotCardTitle">
        <div className="heading_1 ft_gray_4">{title}</div>
        <PlotCardTitleToggle
          id={id}
          title={title}
          toggleOn={toggleOn}
          setToggleOn={setToggleOn}
        ></PlotCardTitleToggle>
      </div>
      <div className="plotCardContents body_1 ft_gray_2">{contents}</div>

      <PlotCardTagBox tags={tags}></PlotCardTagBox>

      <PlotCardFooter
        view="12"
        like="34"
        comment="56"
        createdDt=" 90분 전"
      ></PlotCardFooter>
    </div>
  );
}

function PlotCardTagBox({ tags }) {
  return (
    <div className="plotCardTagBox no_scroll">
      {tags.map((d) => (
        <PlotTag key={d.id} name={d.name} color={d.color}></PlotTag>
      ))}
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
