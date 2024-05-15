import React, { useState } from 'react';
import style from "./filterTable.module.css";
import { Icons } from "../../assets/icons/icons";
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

const FilterTable = ({ filterOption, onFilterChange , bookings}) => {
    const [filterValues, setFilterValues] = useState({
        id: '',
        dateRange: [],
        status: ''
    });

    const handleFilter = () => {
        let filteredData = filterOption;

        // ID ni filtrlash
        if (filterValues.id !== '') {
            filteredData = bookings.filter(item => item.id === parseInt(filterValues.id));
        }

        // Data oraliqlarini filtrlash
        if (filterValues.dateRange.length > 0) {
            const [startDate, endDate] = filterValues.dateRange.map(date => date.toDate()); // Date objesine dönüştür
            filteredData = bookings.filter(item => {
                const itemStartDate = new Date(item.start_day);
                const itemEndDate = new Date(item.end_day);
                return itemStartDate >= startDate && itemEndDate <= endDate;
            });
        }

        // Statusni filtrlash
        if (filterValues.status !== '') {
            filteredData = bookings.filter(item => item.status === filterValues.status);
        }

        // Natijani "onFilterChange" orqali Bookings komponentiga uzatish
        onFilterChange(filteredData);
    };

    const handleIdChange = (e) => {
        setFilterValues({ ...filterValues, id: e.target.value });
    };

    const handleDateRangeChange = (dates) => {
        setFilterValues({ ...filterValues, dateRange: dates });
    };

    const handleStatusChange = (e) => {
        setFilterValues({ ...filterValues, status: e.target.value });
    };

    const handleClearFilter = () => {
        setFilterValues({
            id: '',
            dateRange: [],
            status: ''
        });
        onFilterChange(bookings);

    };

    return (
        <div className={style.filterBox}>
            <div className={style.filterBox_panel}>
                <div className={style.filterBox_item} onClick={handleFilter}>
                    <Icons.FilterIcon />
                </div>
                <div className={style.filterBox_item}>
                    <input type="number" placeholder={'ID'} value={filterValues.id} onChange={handleIdChange} />
                </div>
                <div className={style.filterBox_item}>
                    <RangePicker value={filterValues.dateRange} onChange={handleDateRangeChange} />
                </div>
                <div className={style.filterBox_item}>
                    <select value={filterValues.status} onChange={handleStatusChange}>
                        <option value="">Статус</option>
                        <option value="ongoing">Активен</option>
                        <option value="cancelled">Отменен</option>
                        <option value="deleted">удалено</option>
                        <option value="finished">Завершен</option>
                        <option value="awaiting">Ожидающий</option>
                        <option value="pre-finished">предварительно законченный</option>
                    </select>
                </div>
                <div className={style.filterBox_item} onClick={handleClearFilter}>
                    <Icons.Reload  />
                    Очистить
                </div>
            </div>
        </div>
    );
};

export default FilterTable;
