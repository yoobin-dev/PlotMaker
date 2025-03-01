import { useEffect, useState } from "react";
import "../styles/toggleMenu.css";
import { replace } from "../../node_modules/stylis/src/Utility";

// 플롯 카드 리스트 햄버거
export function PlotCardTitleToggle({ id, title }) {
  const [toggleOn, setToggleOn] = useState(false);
  const [shareToggleOn, setShareToggleOn] = useState(false);
  const [nameToggleOn, setNameToggleOn] = useState(false);

  const menuArr = [
    {
      id: "share",
      icon: "view",
      text: "공개 설정",
    },
    // {
    //   id: "folder",
    //   icon: "folder",
    //   text: "폴더에 저장",
    // },
    {
      id: "name",
      icon: "edit_name",
      text: "이름 바꾸기",
    },
    {
      id: "delete",
      icon: "delete",
      text: "삭제",
    },
  ];

  // 토글 이벤트
  const toggleButtonClick = () => {
    const toggles = document.getElementsByClassName("toggleMenuBox");
    for (let t of toggles) {
      t.classList.add("d-none");
    }
    setToggleOn((prev) => !prev);
  };

  // titleToggle 메뉴 클릭 시
  const clickToggleItem = (e, id) => {
    const titleTg = document.getElementsByClassName("titleToggle");

    // titleToggle 숨기기
    for (let t of titleTg) {
      t.classList.add("d-none");
    }

    if (id === "share") {
      setShareToggleOn(true);
    } else if (id === "name") {
      setNameToggleOn(true);
    } else if (id === "delete") {
      alert("삭제됨");
      // 삭제하는 API
    }
  };

  useEffect(() => {
    // 메뉴 외부 클릭 시 메뉴 닫기
    const handleClickOutside = (event) => {
      if (
        !event.target.classList.contains("toggleMenuBox") &&
        !event.target.classList.contains("toggleMenuItem") &&
        !event.target.classList.contains("toggleElement")
      ) {
        setToggleOn(false);
      }
    };
    if (toggleOn) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleOn]);

  return (
    <div className="toggleBackground">
      <div className="plotCardTitleToggle" onClick={() => toggleButtonClick()}>
        <img className="toggleElement" src="/burger.png"></img>
      </div>
      <div
        id={id}
        className={`titleToggle toggleMenuBox shadow_black_10 ${
          toggleOn ? "" : "d-none"
        }`}
      >
        <div className="toggleMenuHeader d-flex ft_gray_5">
          <div className="toggleElement headline_1">{title}</div>
          <div className="toggleElement body_1">선택</div>
        </div>
        <div className="toggleMenuBody w-100">
          {menuArr.map((d, i) => (
            <div
              key={i}
              id={d.id}
              className="d-flex toggleMenuItem"
              onClick={(e) => clickToggleItem(e, d.id)}
            >
              <div className="toggleElement toggleIconBox">
                <img
                  className="toggleElement toggleIcon"
                  src={`${d.icon}.png`}
                ></img>
              </div>
              <span className="toggleElement body_1 ft_gray_5">{d.text}</span>
            </div>
          ))}
        </div>
      </div>
      <PlotCardShareToggle
        id={id}
        shareToggleOn={shareToggleOn}
        setShareToggleOn={setShareToggleOn}
      ></PlotCardShareToggle>
      <PlotCardNameToggle
        id={id}
        nameToggleOn={nameToggleOn}
        setNameToggleOn={setNameToggleOn}
      ></PlotCardNameToggle>
    </div>
  );
}

// 플롯 카드 공개 비공개
export function PlotCardShareToggle({ id, shareToggleOn, setShareToggleOn }) {
  const menuArr = [
    {
      id: "share",
      text: "공개",
    },
    {
      id: "unShare",
      text: "비공개",
    },
  ];
  const handleSharePlot = (isShare) => {
    const promptSeq = id.replace("burger_", "");

    if (isShare === "share") {
      // 공개로 변경하는 API
      updatePlotPublic(promptSeq);
    } else {
      // 비공개로 변경하는 API
      alert("비공개됨");
    }
    setShareToggleOn(false);
  };

  useEffect(() => {
    // 메뉴 외부 클릭 시 메뉴 닫기
    const handleSubOutside = (event) => {
      if (
        !event.target.classList.contains("toggleMenuBox") &&
        !event.target.classList.contains("toggleMenuItem") &&
        !event.target.classList.contains("toggleElement")
      ) {
        setShareToggleOn(false);
      }
    };
    if (shareToggleOn) {
      document.addEventListener("mousedown", handleSubOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleSubOutside);
    };
  }, [shareToggleOn]);

  return (
    <div>
      <div
        id={`${id}_share`}
        className={`toggleMenuBox shadow_black_10 ${
          shareToggleOn ? "" : "d-none"
        }`}
      >
        <div className="subMenuHeader d-flex ft_gray_5">
          <div className="toggleElement heading_1">공개 설정</div>
        </div>
        <div className="toggleMenuBody w-100">
          {menuArr.map((d) => (
            <div
              key={d.id}
              className="d-flex toggleMenuItem"
              onClick={() => handleSharePlot(d.id)}
            >
              <span className="toggleElement body_1 ft_gray_5">{d.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 플롯 카드 이름 바꾸기
export function PlotCardNameToggle({ id, nameToggleOn, setNameToggleOn }) {
  const [nameLength, setNameLength] = useState(0);
  const [newName, setNewName] = useState("");

  const handleNamePlot = () => {
    const promptSeq = id.replace("burger_", "");
    console.log(promptSeq);
    // 이름 변경하는 API
    alert("변경됨");
    setNameToggleOn(false);
  };

  // 새로운 이름 입력 시
  const handleNewName = (e) => {
    setNewName(e.target.value);
    setNameLength(e.target.value.length);
  };

  useEffect(() => {
    // 메뉴 외부 클릭 시 메뉴 닫기
    const handleSubOutside = (event) => {
      if (
        !event.target.classList.contains("toggleMenuBox") &&
        !event.target.classList.contains("toggleMenuItem") &&
        !event.target.classList.contains("toggleElement")
      ) {
        setNameToggleOn(false);
      }
    };
    if (nameToggleOn) {
      document.addEventListener("mousedown", handleSubOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleSubOutside);
    };
  }, [nameToggleOn]);

  return (
    <div>
      <div
        id={`${id}_name`}
        className={`toggleMenuBox shadow_black_10 ${
          nameToggleOn ? "" : "d-none"
        }`}
      >
        <div className="subMenuHeader d-flex ft_gray_5">
          <div className="toggleElement heading_1">이름 바꾸기</div>
        </div>
        <div className="toggleMenuBody w-100">
          <div className="w-100 d-flex toggleElement">
            <div className=" w-100 toggleElement">
              <div className="toggleElement nameToggleBody">
                <input
                  value={newName}
                  className="nameToggleInput toggleElement label_1 ft_black"
                  onChange={(e) => handleNewName(e)}
                  maxLength="50"
                ></input>
              </div>
              <div className="nameToggleFooter toggleElement">
                <span className="toggleElement caption_1 ft_gray_94">
                  <span className="nameToggleLength">{nameLength}</span>/50
                </span>
                <button
                  className="nameToggleButton toggleElement caption_1"
                  onClick={handleNamePlot}
                >
                  변경
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
