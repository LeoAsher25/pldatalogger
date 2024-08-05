export async function mockApi<T>(data: T, duration = 1000): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), duration));
}

export async function mockGetProfileApi(): Promise<UserTypes.IProfile> {
  return mockApi<UserTypes.IProfile>({
    avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
    active: true,
    name: "Adminitrator",
    roles: 15,
    username: "Adminitrator",
  });
}
