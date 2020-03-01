import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./auth";
import app from "./firebase";

const AdminRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  let userID = null;
  if (currentUser !== null) {
    userID = currentUser.uid;
    console.log(userID);
  }
  let getAdmin = null;
  let adminPage=null;
  if (userID != null) {
    var databaseRef = app.database().ref("users/" + userID + "/isadmin");
    databaseRef.on("value", function(snapshot) {
      getAdmin = snapshot.val();
      console.log(getAdmin);
      adminPage=(<Route
      {...rest}
      render={routeProps =>
        getAdmin === true ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/noperms"} />
        )
      }
    />)
    });
  }

  return adminPage;
};

export default AdminRoute;