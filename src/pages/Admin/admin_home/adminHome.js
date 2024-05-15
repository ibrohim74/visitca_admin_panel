import React, {useEffect, useState} from 'react';
import ChartGrowth from "./chart/chart_growth";
import EarningCard from "./chart/EarningCard";
import TotalOrderLineChartCard from "./chart/TotalOrderLineChartCard";
import style from './adminHome.module.css'
import PopularCard from "./chart/PopularCard";
import {GetStatAPI} from "./API/adminHomeAPI";

const AdminHome = () => {
    const [stat , setStat] = useState()

    useEffect(()=>{
        GetStatAPI().then(r => {
            if (r?.status === 200){
                setStat(r.data)
            }
        })
    },[])
    console.log(stat)
    return (
        <div className={style['dashboard']}>
            <div className={style['chart']}>
                <div className={style['dashboardTopCards']}>
                    <EarningCard/>
                    <TotalOrderLineChartCard/>
                </div>
                <div className={style['dashboardBottomCard']}>
                    <ChartGrowth/>
                </div>

            </div>
            <div className={style['dashboardRequests']}>
                <PopularCard data={stat}/>
            </div>
        </div>
    );
};

export default AdminHome;