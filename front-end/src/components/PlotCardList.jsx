import { useState, useRef, useEffect, useContext } from "react";
import "../styles/plotCardList.css";
import PlotTag from "./PlotTag";
import { PlotCardTitleToggle } from "./ToggleMenu";
import LocaleContext from "../context/LocaleContext"; // LocaleContext import
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function PlotCardList() {
  const { plotList, setPlotList } = useContext(LocaleContext);
  const [toggleOn, setToggleOn] = useState(false);
  const navigate = useNavigate();

  // 태그박스 스크롤 기능
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

  // 상세로 이동하기
  const goToDetail = () => {
    navigate("/plotDetail");
  };

  // 작성으로 이동하기
  const goToWrite = () => {
    navigate("/prompt");
  };

  // plotList가 업데이트 될 때마다 드래그 기능 적용
  useEffect(() => {
    PlotCardTagBoxScroll();
  }, [plotList]);

  return (
    <>
      {plotList.map((d, i) => (
        <PlotCard
          key={i}
          info={d}
          id={d.plotSeq}
          title={d.title}
          contents={d.plotContent}
          toggleOn={toggleOn}
          setToggleOn={setToggleOn}
          goToDetail={goToDetail}
        ></PlotCard>
      ))}
      <PlotCardAdd goToWrite={goToWrite}></PlotCardAdd>
    </>
  );
}

function PlotCard({
  info,
  id,
  title,
  contents,
  toggleOn,
  setToggleOn,
  goToDetail,
}) {
  const tags = [
    {
      color: "gray",
      name: info.type,
    },
    {
      color: "blue",
      name: info.genre,
    },
    {
      color: "yellow",
      name: info.timeframe,
    },
    {
      color: "red",
      name: info.theme,
    },
    {
      color: "green",
      name: info.event,
    },
    {
      color: "mustard",
      name: info.tellType,
    },
    {
      color: "mint",
      name: info.custom,
    },
  ];

  return (
    <div id={`card_${info.plotSeq}`} className="plotCard">
      <div className="plotCardTitle">
        <div className="title heading_1 ft_gray_4" onClick={goToDetail}>
          {info.title}
        </div>
        <PlotCardTitleToggle
          id={`burger_${info.plotSeq}`}
          title={info.title}
        ></PlotCardTitleToggle>
      </div>
      <div className="plotCardContents body_1 ft_gray_2" onClick={goToDetail}>
        {contents}
      </div>

      <PlotCardTagBox tags={tags}></PlotCardTagBox>

      <PlotCardFooter
        view={info.view * 1}
        like={info.like * 1}
        comment={info.comment * 1}
        createAt={info.createAt}
      ></PlotCardFooter>
    </div>
  );
}

function PlotCardTagBox({ tags }) {
  return (
    <div className="plotCardTagBox no_scroll">
      {tags.map((d, i) => (
        <PlotTag key={i} name={d.name} color={d.color}></PlotTag>
      ))}
    </div>
  );
}

function PlotCardAdd({ goToWrite }) {
  return (
    <div className="plotCardAdd bg_gray_5 shadow_gray_30" onClick={goToWrite}>
      <img src="plus_square.svg"></img>
    </div>
  );
}

function PlotCardFooter({ view, like, comment, createAt }) {
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
        <div>{createAt}</div>
      </div>
    </div>
  );
}

export default PlotCardList;
