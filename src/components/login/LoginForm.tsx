import { useState } from "react";
import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
// @mui
import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, Stack } from "@mui/material";

// components
import { RHFCheckbox } from "src/components/hook-form/RHFCheckbox";
import RHFTextField from "src/components/hook-form/RHFTextField";
import { useAppDispatch } from "src/hooks/customReduxHook";
import {
  getProfileMethod,
  loginMethod,
} from "src/stores/auth/authThunkActions";
import Iconify from "../Iconify";

const defaultValues: SystemTypes.ILoginFormData = {
  email: "",
  password: "",
  remember: true,
};

const LoginSchema = Yup.object().shape({
  email: Yup.string() /*.email('Email must be a valid email address')*/
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  remember: Yup.boolean(),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const methods = useForm<SystemTypes.ILoginFormData>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: SystemTypes.ILoginFormData) => {
    try {
      const response = await dispatch(loginMethod(data));
      await dispatch(getProfileMethod());
      console.log("response: ", response);
    } catch (error: any) {
      console.error(error);
      reset();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <RHFTextField name="email" label="Username" />
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
          loading={isSubmitting}>
          Đăng nhập
        </LoadingButton>
      </form>
    </FormProvider>
  );
}
