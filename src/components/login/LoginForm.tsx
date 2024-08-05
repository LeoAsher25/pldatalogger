import { useEffect, useState } from "react";
import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
// @mui
import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, Stack } from "@mui/material";

// components
import { useRequest } from "ahooks";
import { useNavigate } from "react-router";
import { RHFCheckbox } from "src/components/hook-form/RHFCheckbox";
import RHFTextField from "src/components/hook-form/RHFTextField";
import { useAppDispatch, useAppSelector } from "src/hooks/customReduxHook";
import authApi from "src/services/authApi";
import { authActions } from "src/stores/auth/authSlice";
import { RootState } from "src/stores/rootReducer";
import { SystemTypes } from "src/types";
import ERoutePath from "src/types/routes.enum";
import Iconify from "../Iconify";

const defaultValues: SystemTypes.ILoginFormData = {
  username: "administrator",
  password: "123456aA@",
  remember: true,
};

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  remember: Yup.boolean(),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { accessToken } = useAppSelector((state: RootState) => state.authState);

  const navigate = useNavigate();

  const { loading, runAsync: runLogin } = useRequest(authApi.login, {
    manual: true,
  });

  const dispatch = useAppDispatch();
  const formInstance = useForm<SystemTypes.ILoginFormData>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = formInstance;

  const onSubmit = async (data: SystemTypes.ILoginFormData) => {
    try {
      const response = await runLogin(data);

      dispatch(
        authActions.setItem({
          accessToken: response.data.data.accessToken,
          refreshToken: response.data.data.refreshToken,
          currentUser: response.data.user,
        })
      );
      // await dispatch(getProfileMethod());
    } catch (error: any) {
      console.error(error);
      reset();
    }
  };

  useEffect(() => {
    console.log("currentUser: ", accessToken);
    if (accessToken) {
      navigate(ERoutePath.HOME_PAGE);
    }
  }, [accessToken, navigate]);

  return (
    <FormProvider {...formInstance}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <RHFTextField name="username" label="Username" />
          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            inputProps={{
              endadornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end">
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            my: 2,
          }}>
          <RHFCheckbox name="remember" label="Ghi nhớ" />
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={loading || isSubmitting}>
          Đăng nhập
        </LoadingButton>
      </form>
    </FormProvider>
  );
}
