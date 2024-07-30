import PropTypes from 'prop-types';
// @mui
import {
    styled
} from '@mui/material/styles';
import {
    Box,
    Stack,
    AppBar,
    Toolbar,
    Typography,
    Breadcrumbs
} from '@mui/material';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import {
    HEADER,
    NAVBAR
} from '../../../config';
// components
import Logo from '../../../components/Logo';
import Iconify from '../../../components/Iconify';
import {
    IconButtonAnimate
} from '../../../components/animate';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import ContactsPopover from './ContactsPopover';
import NotificationsPopover from './NotificationsPopover';
import {
    useTheme
} from '@emotion/react';
import {
    NavigateNext
} from '@mui/icons-material';
import {
    useSelector
} from 'src/redux/store';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})(({
    isCollapse,
    isOffset,
    verticalLayout,
    theme
}) => ({
    ...cssStyles(theme).bgBlur(),
    boxShadow: 'none',
    height: HEADER.MOBILE_HEIGHT,
    zIndex: theme.zIndex.appBar + 1,
    transition: theme.transitions.create(['width', 'height'], {
        duration: theme.transitions.duration.shorter,
    }),
    [theme.breakpoints.up('lg')]: {
        height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
        width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
        ...(isCollapse && {
            width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
        }),
        ...(isOffset && {
            height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
        }),
        ...(verticalLayout && {
            width: '100%',
            height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
            backgroundColor: theme.palette.background.default,
        }),
    },
}));

// ----------------------------------------------------------------------

DashboardHeader.propTypes = {
    onOpenSidebar: PropTypes.func,
    isCollapse: PropTypes.bool,
    verticalLayout: PropTypes.bool,
};

export default function DashboardHeader({
    onOpenSidebar,
    isCollapse = false,
    verticalLayout = false
}) {
    const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

    const isDesktop = useResponsive('up', 'lg');

    const {
        breadcrumbs
    } = useSelector((state) => state.settings);
    const {
        webServer
    } = useSelector((state) => state.configuration);

    const theme = useTheme();

    return ( <
            RootStyle isCollapse = {
                isCollapse
            }
            isOffset = {
                isOffset
            }
            verticalLayout = {
                verticalLayout
            } >
            <
            Toolbar sx = {
                {
                    minHeight: '100% !important',
                    px: {
                        lg: 5
                    },
                }
            } >
            {
                isDesktop && verticalLayout && < Logo sx = {
                    {
                        mr: 2.5
                    }
                }
                />}

                {
                    !isDesktop && ( <
                        IconButtonAnimate onClick = {
                            onOpenSidebar
                        }
                        sx = {
                            {
                                mr: 1,
                                color: 'text.primary'
                            }
                        } >
                        <
                        Iconify icon = "eva:menu-2-fill" / >
                        <
                        /IconButtonAnimate>
                    )
                }

                { /* <Searchbar /> */ } {
                    breadcrumbs.length > 0 && < Stack direction = 'column'
                    justifyContent = 'center'
                    alignItems = 'flex-start'
                    sx = {
                        {
                            mt: 0.5
                        }
                    }
                    spacing = {
                            0.5
                        } >
                        <
                        Typography variant = {
                            isDesktop ? 'h5' : 'h6'
                        }
                    sx = {
                            {
                                color: 'text.primary'
                            }
                        } > {
                            breadcrumbs[breadcrumbs.length - 1]
                        } <
                        /Typography> {
                            isDesktop && < Breadcrumbs
                            separator = { < NavigateNext fontSize = "small" / >
                            }
                            aria - label = "breadcrumb" >
                                {
                                    breadcrumbs.map((link, index) => < Typography key = {
                                            index
                                        }
                                        variant = 'body2'
                                        color = "text.primary" > {
                                            link
                                        } < /Typography>)} <
                                        /Breadcrumbs>} <
                                        /Stack>}


                                        {
                                            isDesktop && < Stack
                                            direction = "row"
                                            justifyContent = "center"
                                            alignItems = "center"
                                            spacing = {
                                                2
                                            }
                                            sx = {
                                                    {
                                                        flexGrow: 1
                                                    }
                                                } >
                                                <
                                                Typography variant = {
                                                    isDesktop ? 'h5' : 'h6'
                                                }
                                            sx = {
                                                    {
                                                        color: 'text.primary'
                                                    }
                                                } > {
                                                    webServer ? .title || ''
                                                } < /Typography> <
                                                /Stack>}


                                            {
                                                !isDesktop && < Box sx = {
                                                    {
                                                        flexGrow: 1
                                                    }
                                                }
                                                />}

                                                <
                                                Stack direction = "row"
                                                alignItems = "center"
                                                spacing = {
                                                        {
                                                            xs: 0.5,
                                                            sm: 1.5
                                                        }
                                                    } >
                                                    <
                                                    LanguagePopover / > { /* <NotificationsPopover /> */ } { /* <ContactsPopover /> */ } <
                                                    AccountPopover / >
                                                    <
                                                    /Stack> <
                                                    /Toolbar> <
                                                    /RootStyle>
                                            );
                                        }