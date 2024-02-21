import { ReactElement, cloneElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../../variables/constant";

function GoogleAuthComponent({
  onLogin,
  children,
}: {
  onLogin?: () => void;
  operation?: "login" | "signup";
  children: ReactElement;
}) {
  const clonedChildren = cloneElement(children, { onClick: handleAuth });
  const navigate = useNavigate();
  const [popup, setPopup] = useState<Window | null>(null);

  useEffect(() => {
    if (popup) {
      const closeCallback = (event: MessageEvent<any>) => {
        if (event.data === "closePopup") {
          popup.close();
          onLogin?.();
        }
      };
      window.addEventListener("message", closeCallback, false);
      return () => window.removeEventListener("message", closeCallback, false);
    }
  }, [popup, navigate]);

  function handleAuth() {
    setPopup(
      window.open(
        new URL("user/login/auth/", BASE_API_URL).toString(),
        "GoogleAuthPopup",
        "width=500,height=600"
      )
    );
  }
  return clonedChildren;
}

export default GoogleAuthComponent;
