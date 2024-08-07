import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
// components
import { useAppSelector } from "src/hooks/customReduxHook";
import Login from "src/pages/Login";
import { RootState } from "src/redux/rootReducer";

// ----------------------------------------------------------------------

export default function AuthGuard({ children }: any) {
  const { currentUser } = useAppSelector((state: RootState) => state.authState);
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  if (!currentUser) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <> {children} </>;
}
