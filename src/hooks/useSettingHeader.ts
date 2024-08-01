import { useEffect } from "react";
import { useAppDispatch } from "src/hooks/customReduxHook";
import { RootState } from "src/stores/rootReducer";
import { settingsActions } from "src/stores/settings/settingsSlice";

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
