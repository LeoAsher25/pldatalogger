import { useEffect } from "react";
import { useAppDispatch } from "src/hooks/customReduxHook";
import { RootState } from "src/redux/rootReducer";
import { settingsActions } from "src/redux/settings";

const useSettingHeader = ({
  pageTitle,
  breadcrumbs,
}: RootState["settingsState"]) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      settingsActions.setItem({
        pageTitle,
        breadcrumbs,
      })
    );
  }, [dispatch, pageTitle, breadcrumbs]);
  return {};
};

export default useSettingHeader;
