function Loading() {
  return (
    <>
      <div
        id="loadingBackground"
        className="h-100"
        style={{
          width: "calc(100% - 370px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="/loading_basic.gif"></img>
      </div>
    </>
  );
}

export default Loading;
