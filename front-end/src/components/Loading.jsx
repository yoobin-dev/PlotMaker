function Loading() {
  return (
    <>
      <div
        id="loadingBackground"
        className="h-100"
        style={{
          width: "100%",
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
