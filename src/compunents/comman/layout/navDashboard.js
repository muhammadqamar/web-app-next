import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../service/firebase/firebase";
import Router from "next/router";

const Navbar = () => {
  const [user, setUser] = useAuthState(auth);

  useEffect(() => {
    console.log(setUser);
    if (!setUser && !user) {
      Router.push("/");
    }
  }, [setUser, user]);
  return (
    <div className="nav-dashboard">
      <div className="nav_inner_dashboard">
        <div className="logo-section">
          <img
            onClick={() => {
              Router.push("/");
            }}
            src="/Frames.png"
            alt="logo"
          />
          {user && <p>Welcome {user.displayName}</p>}
        </div>
        {user && (
          <button
            className="web-btn web btn btn-primary"
            onClick={() => auth.signOut()}
          >
            logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
