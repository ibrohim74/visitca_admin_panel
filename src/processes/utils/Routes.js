import Layouts from "../../pages/layout/layouts";
import {
    ADMIN_ANNOUNCEMENT,
    ADMIN_BOOKINGS,
    ADMIN_HOME, ADMIN_OPEN_BOOKINGS,
    ADMIN_REQUESTS,
    ADMIN_SELLER,
    CABINET, MODERATE_ANNOUNCEMENT, MODERATE_BOOKINGS,
    MODERATE_HOME, MODERATE_REQUESTS
} from "./consts";
import AdminHome from "../../pages/Admin/admin_home/adminHome";
import Announcement from "../../pages/Admin/announcement/announcement";
import Bookings from "../../pages/Admin/bookings/bookings";
import Requests from "../../pages/Admin/requests/requests";
import Seller from "../../pages/Admin/seller/seller";
import ModerateHome from "../../pages/Moderate/ModerateHome";
import BookingsPage from "../../pages/Admin/bookings/bookings_page";


export const Layout = [
    {
        path: CABINET,
        Component: <Layouts/>
    },
]

export const Admin = [
    {
        path: ADMIN_HOME,
        Component: <AdminHome/>,
        title:'Главная'
    },
    {
        path: ADMIN_ANNOUNCEMENT,
        Component: <Announcement/>,
        title: 'Обьявления'
    },
    {
        path: ADMIN_BOOKINGS,
        Component: <Bookings/>,
        title: 'Бронирования'
    },
    {
        path: ADMIN_OPEN_BOOKINGS,
        Component: <BookingsPage />,
        title: 'bookingPage'
    },
    {
        path: ADMIN_REQUESTS,
        Component: <Requests/>,
        title: 'Заявления'
    },
    {
        path: ADMIN_SELLER,
        Component: <Seller/>,
        title: 'Продавцы'
    },
]
export const Moderate = [
    {
        path: MODERATE_HOME,
        Component: <ModerateHome/>,
        title:'Главная'

    },
    {
        path: MODERATE_ANNOUNCEMENT,
        Component: <Announcement/>,
        title: 'Обьявления'

    },
    {
        path: MODERATE_BOOKINGS,
        Component: <Bookings/>,
        title: 'Бронирования'

    },
    {
        path: MODERATE_REQUESTS,
        Component: <Requests/>,
        title: 'Заявления'
    },

]