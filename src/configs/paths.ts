// ----------------------------------------------------------------------

function path(root: string, sublink: string): string {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  loginUnprotected: path(ROOTS_AUTH, "/login-unprotected"),
  registerUnprotected: path(ROOTS_AUTH, "/register-unprotected"),
  verify: path(ROOTS_AUTH, "/verify"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
};

export const PATH_PAGE = {
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  pricing: "/pricing",
  payment: "/payment",
  about: "/about-us",
  contact: "/contact-us",
  faqs: "/faqs",
  page404: "/404",
  page500: "/500",
  components: "/components",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, "/app"),
    realtime: path(ROOTS_DASHBOARD, "/realtime"),
    history: path(ROOTS_DASHBOARD, "/history"),
    charts: path(ROOTS_DASHBOARD, "/charts"),
    sample: path(ROOTS_DASHBOARD, "/sample"),
  },
  user: {
    root: path(ROOTS_DASHBOARD, "/user"),
    new: path(ROOTS_DASHBOARD, "/user/new"),
    list: path(ROOTS_DASHBOARD, "/user/list"),
    profile: path(ROOTS_DASHBOARD, "/user/profile"),
    account: path(ROOTS_DASHBOARD, "/user/account"),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  configuration: {
    root: path(ROOTS_DASHBOARD, "/configuration"),
    sensors: path(ROOTS_DASHBOARD, "/configuration/sensors"),
    connections: path(ROOTS_DASHBOARD, "/configuration/connections"),
    transfer: path(ROOTS_DASHBOARD, "/configuration/transfer"),
    sample: path(ROOTS_DASHBOARD, "/configuration/sample"),
    sampler: path(ROOTS_DASHBOARD, "/configuration/sampler"),
  },
  device: {
    root: path(ROOTS_DASHBOARD, "/device"),
    general: path(ROOTS_DASHBOARD, "/device/general"),
    network: path(ROOTS_DASHBOARD, "/device/network"),
    time: path(ROOTS_DASHBOARD, "/device/time"),
    ota: path(ROOTS_DASHBOARD, "/device/ota"),
  },
};

export const PATH_DOCS = "https://docs-minimals.vercel.app/introduction";
