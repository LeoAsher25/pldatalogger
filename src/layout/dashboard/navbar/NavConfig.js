// routes
import {
    PATH_DASHBOARD
} from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => < SvgIconStyle src = {
    `/icons/${name}.svg`
}
sx = {
    {
        width: 1,
        height: 1
    }
}
/>;

const ICONS = {
    blog: getIcon('ic_blog'),
    cart: getIcon('ic_cart'),
    chat: getIcon('ic_chat'),
    mail: getIcon('ic_mail'),
    user: getIcon('ic_user'),
    kanban: getIcon('ic_kanban'),
    banking: getIcon('ic_banking'),
    booking: getIcon('ic_booking'),
    invoice: getIcon('ic_invoice'),
    calendar: getIcon('ic_calendar'),
    ecommerce: getIcon('ic_ecommerce'),
    analytics: getIcon('ic_analytics'),
    dashboard: getIcon('ic_dashboard'),
    process: getIcon('ic_process'),
    now: getIcon('ic_now'),
    table: getIcon('ic_table'),
    setting: getIcon('ic_setting'),
    upgrade: getIcon('ic_upgrade'),
};

const navConfig = [
    // MANAGEMENT
    // ----------------------------------------------------------------------
    {
        subheader: 'Quản trị',
        items: [{
                title: 'Số liệu tức thời',
                path: PATH_DASHBOARD.general.realtime,
                icon: ICONS.now
            },
            {
                title: 'Số liệu',
                path: PATH_DASHBOARD.general.app,
                icon: ICONS.dashboard
            },
            {
                title: 'Đồ thị',
                path: PATH_DASHBOARD.general.charts,
                icon: ICONS.analytics
            },
            {
                title: 'Bảng số liệu',
                path: PATH_DASHBOARD.general.history,
                icon: ICONS.table
            },
            {
                title: 'Lấy mẫu',
                path: PATH_DASHBOARD.general.sample,
                icon: ICONS.process
            },
        ],
    },
    {
        subheader: 'Cài đặt',
        items: [
            // DEVICE
            {
                title: 'Cấu hình',
                path: PATH_DASHBOARD.configuration.root,
                icon: ICONS.setting,
                children: [{
                        title: 'Cảm biến',
                        path: PATH_DASHBOARD.configuration.sensors
                    },
                    {
                        title: 'Kết nối',
                        path: PATH_DASHBOARD.configuration.connections
                    },
                    {
                        title: 'Truyền Số liệu',
                        path: PATH_DASHBOARD.configuration.transfer
                    },
                    {
                        title: 'Máy lấy mẫu',
                        path: PATH_DASHBOARD.configuration.sampler
                    },
                ],
            },
            // DEVICE
            {
                title: 'Thiết bị',
                path: PATH_DASHBOARD.device.root,
                icon: ICONS.upgrade,
                children: [{
                        title: 'Chung',
                        path: PATH_DASHBOARD.device.general
                    },
                    {
                        title: 'Mạng kết nối',
                        path: PATH_DASHBOARD.device.network
                    },
                    {
                        title: 'Thời gian',
                        path: PATH_DASHBOARD.device.time
                    },
                    {
                        title: 'Cập nhật phần mềm',
                        path: PATH_DASHBOARD.device.ota
                    },
                ],
            },
        ]
    }

    // APP
    // ----------------------------------------------------------------------
    /*
    {
      subheader: 'app',
      items: [
        {
          title: 'mail',
          path: PATH_DASHBOARD.mail.root,
          icon: ICONS.mail,
          info: (
            <Label variant="outlined" color="error">
              +32
            </Label>
          ),
        },
        { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
        { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
        { title: 'kanban', path: PATH_DASHBOARD.kanban, icon: ICONS.kanban },
      ],
    },
    */
];

export default navConfig;