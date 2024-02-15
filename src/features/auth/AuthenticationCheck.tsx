import { useEffect } from "react";
import useGetCurrentUser from "../../hooks/user/useGetCurrentUser";

function AuthenticationCheck() {
  const { isLoading, currentUser } = useGetCurrentUser();
  useEffect(() => {
    if (!isLoading) {
      console.log("use effect");
      window.opener.parent.postMessage("closePopup", "*");
    }
  }, [isLoading]);
  return <div>{currentUser && <p>Authenticated</p>}</div>;
}

export default AuthenticationCheck;
