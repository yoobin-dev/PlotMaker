import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const NaverCallbackPage = () => {
  const [ searchParam ] = useSearchParams();
  const code = searchParam.get("code");
  const state = searchParam.get("state");

  useEffect(() => {
    if(code){
      console.log('success, code: ', code);
      console.log('state: ', state);
    }
  }, [code, state]);

  return (
    <>이걸해야하나..</>
  )
}

export default NaverCallbackPage;