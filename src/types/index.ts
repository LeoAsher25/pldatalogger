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

declare namespace SystemUI {
  // Define types for navigation items
  interface NavItem {
    title: string;
    path: string;
    icon?: React.ReactNode;
    children?: NavItem[];
    info?: React.ReactNode;
  }

  interface NavGroup {
    subheader: string;
    items: NavItem[];
  }

  interface NavItemProps {
    item: NavItem;
    active?: boolean;
    open?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  }

  interface NavItemContentProps {
    icon?: React.ReactNode;
    title: string;
    children?: NavItem[];
    subItem?: boolean;
  }

  // Define the component props type
  interface NavSectionVerticalProps {
    navConfig: NavGroup[];
    isCollapse?: boolean;
    [key: string]: any; // For additional props
  }
}
