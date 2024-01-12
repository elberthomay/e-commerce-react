import { ReactElement, cloneElement } from "react";
import { useNavigate } from "react-router-dom";

function GoogleAuthComponent({
  operation = "login",
  children,
}: {
  operation?: "login" | "signup";
  children: ReactElement;
}) {
  const clonedChildren = cloneElement(children, { onClick: handleAuth });
  const navigate = useNavigate();
  function handleAuth() {
    const popup = window.open(
      "http://localhost:3000/api/user/login/auth/",
      "GoogleAuthPopup",
      "width=500,height=600"
    );
    if (popup) {
      window.addEventListener(
        "message",
        (event) => {
          console.log("event");
          if (event.data === "closePopup") {
            popup.close();
            navigate("/");
          }
        },
        false
      );
    }
  }
  return clonedChildren;
}

export default GoogleAuthComponent;
