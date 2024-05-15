import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from './chart_component/TotalGrowthBarChart';
import MainCard from './chart_component/MainCard';

// chart data
import chartData from './chart_component/total-growth-bar-chart';

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const ChartGrowth = ({ isLoading }) => {
    const theme = useTheme();
    const { primary, grey } = theme.palette;
    const darkLight = theme.palette.dark && theme.palette.dark.light;
    const tabBG_Color = '#40A2E3';

    useEffect(() => {
        const newChartData = {
            ...chartData.options,
            colors: [tabBG_Color],
            xaxis: {
                labels: {
                    style: {
                        colors: [primary.main]
                    }
                }
            },
            series: [
                {
                    ...chartData.series[0], // Birinchi qatorning ma'lumotlari
                    // Barlar uchun yangi ranglar
                    colors: ['#40A2E3', '#40A2E3', '#EEEFF5', '#EEEFF5', '#EEEFF5']
                }
            ],
            grid: {
                borderColor: 'none'
            },
            legend: {
                labels: {
                    colors: '#40A2E3'
                }
            }

        };

        // do not load chart when loading
        if (!isLoading) {
            ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
        }
    }, [primary.main, darkLight, isLoading, grey, tabBG_Color]);

    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard sx={{border: 'none'}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Бронирования</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h3">$2,324.00</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Chart {...chartData} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

ChartGrowth.propTypes = {
    isLoading: PropTypes.bool
};

export default ChartGrowth;
