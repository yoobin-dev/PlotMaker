import { useEffect, useState } from "react";
import "../styles/toggleMenu.css";

// 정렬 토글 메뉴
export function SortingMenu({ toggleOn }) {
  const sortingArr = [
    {
      sort: "created",
      order: "asc",
      text: "작성일 최신 순 정렬",
    },
    {
      sort: "created",
      order: "desc",
      text: "작성일 오래된 순 정렬",
    },
    {
      sort: "view",
      order: "asc",
      text: "조회수 높은 순 정렬",
    },
    {
      sort: "view",
      order: "desc",
      text: "조회수 낮은 순 정렬",
    },
    {
      sort: "like",
      order: "asc",
      text: "좋아요 많은 순 정렬",
    },
    {
      sort: "like",
      order: "desc",
      text: "좋아요 낮은 순 정렬",
    },
  ];

  return (
    <div
      className={`toggleMenuBox shadow_black_10 ${toggleOn ? "" : "d-none"}`}
    >
      <div className="toggleMenuHeader heading_1 ft_gray_5">작품 정렬</div>
      <div className="toggleMenuBody w-100">
        {sortingArr.map((d) => (
          <div key={`${d.sort}_${d.order}`} className="d-flex toggleMenuItem">
            <div className="toggleIconBox">
              <img className="toggleIcon" src={`sort_${d.sort}.png`}></img>
            </div>
            <span className="body_1 ft_gray_5">{d.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
