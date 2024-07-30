import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
// components
import { useAppSelector } from "src/hooks/customReduxHook";
import Login from "src/pages/Login";
import { RootState } from "src/stores/rootReducer";

// ----------------------------------------------------------------------

export default function AuthGuard({ children }: any) {
  const { currentUser } = useAppSelector((state: RootState) => state.authState);
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  console.log("requestedLocation: ", currentUser, requestedLocation, pathname);

  if (!currentUser) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    console.log(
      "requestedLocation: 1",
      currentUser,
      requestedLocation,
      pathname
    );
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <> {children} </>;
}
