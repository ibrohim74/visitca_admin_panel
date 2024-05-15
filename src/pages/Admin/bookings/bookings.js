import React, { useState, useEffect } from 'react';
import { GetAccommodationByID, GetAllBookingsAPI, GetUserById } from "./API/bookingsAPI";
import style from './bookings.module.css';
import FilterTable from "../../../component/filterTable/filterTable";
import { Link } from "react-router-dom";
import { ADMIN_OPEN_BOOKINGS, CABINET } from "../../../processes/utils/consts";
import { Icons } from "../../../assets/icons/icons";
import {Spin} from "antd";
import BreadCrumb from "../../../component/breadCrumb";

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [filterOption, setFilterOption] = useState([]);
    const [users, setUsers] = useState([]);
    const [accData, setAccData] = useState([]);
    const [loading, setLoading] = useState(false);

    const filterDate = (date) => {
        return new Date(date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Ma'lumotlar yuklanmoqda
            try {
                const response = await GetAllBookingsAPI({ page: 1 });
                if (response?.status === 200) {
                    setBookings(response.data);
                    setFilterOption(response.data);
                }
            } catch (error) {
                console.error('Error fetching bookings data:', error);
            } finally {
                setLoading(false); // Ma'lumotlar yuklandi
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (bookings.length > 0) {
                setLoading(true)
                try {
                    const userIds = bookings.map(booking => booking.customer_id);
                    const userResponses = await Promise.all(userIds.map(userId => GetUserById(userId)));
                    const userData = userResponses.map(response => response.data);
                    setUsers(userData);

                    const accIds = bookings.map(booking => booking.accommodation_id);
                    const accResponses = await Promise.all(accIds.map(accID => GetAccommodationByID(accID)));
                    const accData = accResponses.map(response => response.data);
                    setAccData(accData);
                } catch (error) {
                    console.error('Error fetching user or accommodation data:', error);
                } finally {
                    setLoading(false)
                }
            }
        };

        fetchData();
    }, [bookings]);

    const handleFilterChange = (filteredData) => {
        setFilterOption(filteredData);
    };

    return (
        <div className={style.bookingsTable}>
            <BreadCrumb user={'admin'}/>
            <FilterTable filterOption={filterOption} onFilterChange={handleFilterChange} bookings={bookings} />
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>ФИО</th>
                    <th>Название</th>
                    <th>Дата</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                {loading ? (
                    <div className={style.bookingsTableNoData}>
                        <Spin size="large" />
                    </div>
                ) : filterOption.length > 0 ? (
                    filterOption.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{users.find(user => user.id === item.customer_id)?.firstName || ''} {users.find(user => user.id === item.customer_id)?.lastName || ''}</td>
                            <td>{accData.find(acc => acc.id === item.accommodation_id)?.title || ''}</td>
                            <td>{filterDate(item.start_day)} - {filterDate(item.end_day)}</td>
                            <td>
                                {item?.status === 'ongoing' && (
                                    <Link to={CABINET + ADMIN_OPEN_BOOKINGS.replace(":id", item.id)} style={{ background: "#EAF7FF", color: '#40A2E3' }}>
                                        Активен
                                    </Link>
                                )}
                                {item?.status === 'cancelled' && (
                                    <Link to={CABINET + ADMIN_OPEN_BOOKINGS.replace(":id", item.id)} style={{ background: "#FFE5E5", color: '#FF4141' }}>
                                        Отменен
                                    </Link>
                                )}
                                {item?.status === 'deleted' && (
                                    <Link to={CABINET + ADMIN_OPEN_BOOKINGS.replace(":id", item.id)} style={{ background: "#f65e5e", color: 'white' }}>
                                        удалено
                                    </Link>
                                )}
                                {item?.status === 'finished' && (
                                    <Link to={CABINET + ADMIN_OPEN_BOOKINGS.replace(":id", item.id)} style={{ background: "#E8F9E9", color: '#15CC69' }}>
                                        Завершен
                                    </Link>
                                )}
                                {item?.status === 'awaiting' && (
                                    <Link to={CABINET + ADMIN_OPEN_BOOKINGS.replace(":id", item.id)} style={{ background: "#909193", color: '#ffffff' }}>
                                        Ожидающий
                                    </Link>
                                )}
                            </td>
                        </tr>
                    ))
                ) : (

                            <div className={style.bookingsTableNoData}>
                                <Icons.NoData />
                            </div>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Bookings;
