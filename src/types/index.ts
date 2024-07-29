/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace SystemTypes {
  interface ILoginFormData {
    email: string;
    password: string;
    remember?: boolean;
  }

  interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
  }
}

declare namespace UserTypes {
  interface IProfile {
    email: string;
    fullName: string;
  }
}
