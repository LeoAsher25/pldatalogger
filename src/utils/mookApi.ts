export async function mockApi<T>(data: T, duration = 1000): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), duration));
}

export async function mockLoginApi(
  data: SystemTypes.ILoginFormData
): Promise<SystemTypes.ILoginResponse> {
  return mockApi<SystemTypes.ILoginResponse>(
    {
      accessToken: `accessToken_${Date.now()}`,
      refreshToken: `refreshToken_${Date.now()}`,
    },
    1000
  );
}

export async function mockGetProfileApi(): Promise<UserTypes.IProfile> {
  return mockApi<UserTypes.IProfile>({
    email: "admin@gmail.com",
    fullName: "Adminitrator",
  });
}
