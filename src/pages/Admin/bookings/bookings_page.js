import React, { useEffect, useState } from 'react';
import { Breadcrumb, Select } from "antd"; // Ant Design Select component
import { HomeOutlined } from "@ant-design/icons";
import { ADMIN_BOOKINGS, ADMIN_OPEN_BOOKINGS, CABINET } from "../../../processes/utils/consts";
import { useParams } from "react-router-dom";
import style from './bookings.module.css'
import { Icons } from "../../../assets/icons/icons";
import BookingCalendar from "./calendar/bookingCalendar";
import { GetBookingById, GetUserById } from "./API/bookingsAPI";

const { Option } = Select; // Destructure Option from Select

const BookingsPage = () => {
    const [booking, setBooking] = useState();
    const [user, setUser] = useState();
    const [initialState , setInitialState] = useState({
        status:''
    })
    const [status , setStatus] = useState('');
    const { id } = useParams();


    const calculateDays = (start, end) => {
        const startDate = new Date(start); // Boshlang'ich sanani oling
        const endDate = new Date(end); // Oxirgi sanani oling
        const differenceInTime = endDate.getTime() - startDate.getTime(); // Farqni milliseconds holatida oling
        const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Farqni kunlarga aylantiring
        return Math.round(differenceInDays); // Farqni butun son qilib qaytarish
    };
    const formatDate = (inputDate) => {
        const date = new Date(inputDate); // Kiruvchi sana obyektini yaratish
        const options = { // Formatlash parametrlarini aniqlash
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };
        return date.toLocaleString('ru-RU', options); // Formatlangan sana
    };
    useEffect(() => {
        GetBookingById(parseInt(id)).then(r => {
            if (r?.status === 200) {
                setBooking(r.data);
                setInitialState({...initialState , status: r?.data?.status})
            }
        });
    }, [id]); // Add id to dependency array
    useEffect(() => {
        if (booking?.customer_id) {
            GetUserById(booking?.customer_id).then(r => {
                if (r?.status === 200) {
                    setUser(r.data);
                }
            });
        }
    }, [booking]); // Add booking to dependency array

    const sendData = () => {
      
    }
    return (
        <div className={'container'}>
            <Breadcrumb separator=">" items={[
                {
                    key: 'home',
                    href: CABINET,
                    title: <HomeOutlined/>,
                },
                {
                    key: 'user',
                    href: CABINET + ADMIN_BOOKINGS,
                    title: (
                        <>
                            <span>Бронирования</span>
                        </>
                    ),
                },
                {
                    key: 'next',
                    href: CABINET + ADMIN_OPEN_BOOKINGS.replace(':id', id),
                    title: (
                        <>
                            <span>№{id}</span>
                        </>
                    ),
                },
            ]}/>

            <div className={style.bookingsBox}>
                <div className={style.bookingsBox_left}>
                    <div className={style.bookingsBox_left_top}>
                        <h2>Данные о покупателе</h2>
                        <div className={style.bookingsBox_left_user}>
                            <Icons.UserIcon/>
                            <div className={style.bookingsBox_left_userInfo}>
                                <p>{user?.firstName} {user?.lastName}</p>
                                <h1>{booking?.contacts}</h1>
                            </div>
                        </div>
                    </div>

                    <div className={style.bookingsBox_left_body}>
                        <div className={style.bookingsBox_left_body_item}>
                            <div className={style.bookingsBox_left_body_item_icon}>
                                <Icons.Moon/>
                            </div>
                            <div className={style.bookingsBox_left_body_item_info}>
                                <h2>Длительность</h2>
                                <h1>{calculateDays(booking?.start_day , booking?.end_day)} день</h1>
                            </div>
                        </div>
                        <div className={style.bookingsBox_left_body_item}>
                            <div className={style.bookingsBox_left_body_item_icon}>
                                <Icons.UserIcon/>
                            </div>
                            <div className={style.bookingsBox_left_body_item_info}>
                                <h2>Гости</h2>
                                <h1>{booking?.adults} взрослых , {booking?.children} ребенок</h1>
                            </div>
                        </div>
                        <div className={style.bookingsBox_left_body_item}>
                            <div className={style.bookingsBox_left_body_item_icon}>
                                <Icons.Clock/>
                            </div>
                            <div className={style.bookingsBox_left_body_item_info}>
                                <h2>Время заезда</h2>
                                <h1>{formatDate(booking?.start_day)}</h1>
                            </div>
                        </div>
                        <div className={style.bookingsBox_left_body_item}>
                            <div className={style.bookingsBox_left_body_item_icon}>
                                <Icons.Clock/>
                            </div>
                            <div className={style.bookingsBox_left_body_item_info}>
                                <h2>Время выезда</h2>
                                <h1>{formatDate(booking?.end_day)}</h1>
                            </div>
                        </div>
                        <div className={`${style.bookingsBox_left_body_item} ${style.bookingsBox_left_body_item_end}`}>
                            <Icons.Success/> <span>Возможность досрочного выезда</span>
                        </div>
                    </div>

                    <div className={style.bookingsBox_left_body_footer}>
                        <h1>Статус</h1>
                        <Select value={initialState?.status} onChange={e=>setInitialState({...initialState , status: e})} style={{ width: 300 }}>
                            <Option value="ongoing">Активен</Option>
                            <Option value="cancelled">Отменен</Option>
                            <Option value="deleted">Удалено</Option>
                            <Option value="finished">Завершен</Option>
                            <Option value="awaiting">Ожидающий</Option>
                        </Select>
                    </div>
                    <div className={style.bookingsBox_left_body_end}>
                        <div className={style.bookingsBox_left_body_end_box}>
                            <button onClick={sendData}>Сохранить</button>
                            <div className={style.bookingsBox_left_body_end_box_deleteBtn}>
                                <Icons.Delete/>
                            </div>

                        </div>
                    </div>
                </div>
                <div className={style.bookingsBox_right}>
                    <BookingCalendar bookingData={booking}/>
                </div>
            </div>
        </div>
    );
};

export default BookingsPage;
