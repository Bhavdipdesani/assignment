import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import ApexCharts from 'react-apexcharts';
import { TopProducts } from './top-products/view';


import SimpleLineChart from './DeviceChart';

const Dashboard = () => {
    const [performanceDetails, setPerformanceDetails] = useState({
        purchases: 0,
        revenue: 0,
        refunds: 0,
        halfCircleData: 0,
        webSales: 0,
        offlineSales: 0,
        sentimentData: {}
    });


    useEffect(() => {
        const fetchPerformance = async () => {
            try {
                const response1 = await axios.get('http://3.227.101.169:8020/api/v1/sample_assignment_api_1/', {
                    auth: {
                        username: 'trial',
                        password: 'assignment123',
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data1 = response1.data;
                setPerformanceDetails(prevState => ({
                    ...prevState,
                    purchases: data1.purchases,
                    revenue: data1.revenue,
                    refunds: data1.refunds
                }));

                const response3 = await axios.get('http://3.227.101.169:8020/api/v1/sample_assignment_api_3/', {
                    auth: {
                        username: 'trial',
                        password: 'assignment123',
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data3 = response3.data;
                setPerformanceDetails(prevState => ({
                    ...prevState,
                    halfCircleData: data3?.score
                }));






                const response5 = await axios.get('http://3.227.101.169:8020/api/v1/sample_assignment_api_5/', {
                    auth: {
                        username: 'trial',
                        password: 'assignment123',
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data5 = response5.data;
                setPerformanceDetails(prevState => ({
                    ...prevState,
                    sentimentData: data5
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPerformance();
    }, []);


    const formatNumber = (number) => {
        if (number >= 5000) {
            return (number / 1000).toFixed(1) + 'k';
        }
        return number.toString();
    };

    const chartData = {
        options: {
            xaxis: {
                categories: [
                    '01/01/2003',
                    '02/01/2003',
                    '03/01/2003',
                    '04/01/2003',
                    '05/01/2003',
                    '06/01/2003',
                    '07/01/2003',
                ],
            },
            colors: ['#59dcf7', '#1420ff'],
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    padding: 3,
                    border: "none",
                    opacity: 0.9
                },
            },
            chart: {
                contextMenu: {
                    show: false
                }
            }
        },
        series: [{
            name: 'This Year',
            data: [23, 11, 22, 27, 13, 22, 37],
        },
        {
            name: 'Last Year',
            data: [44, 55, 41, 67, 22, 43, 21],
        }]
    };

    const halfCircleData = {
        options: {
            labels: [''],
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: 'horizontal',
                    shadeIntensity: 0.5,
                    gradientToColors: ['#ABE5A1'],
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100]
                },
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    hollow: {
                        margin: 5,
                        size: '70%',
                        background: 'transparent',
                        image: undefined,
                    },
                    track: {
                        background: '#fff',
                        strokeWidth: '67%',
                        margin: 5, // margin is in pixels
                        dropShadow: {
                            enabled: true,
                            top: 2,
                            left: 0,
                            color: '#999',
                            opacity: 1,
                            blur: 2
                        }
                    },
                    dataLabels: {
                        name: {
                            offsetY: -10,
                            show: false,
                            color: '#888',
                            fontSize: '17px'
                        },
                        value: {
                            offsetY: 10,
                            color: '#111',
                            fontSize: '36px',
                            show: true,
                        }
                    }
                }
            },
            responsive: [{
                breakpoint: undefined,
                options: {
                    chart: {
                        width: 200,
                        height: 200,
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
        series: [performanceDetails.halfCircleData]
    };





    const sentimentChartData = performanceDetails.sentimentData
        ? {
            options: {
                labels: ['Positive', 'Negative', 'Neutral'],
                colors: ['#59dcf7', '#ff5050', '#d6d6d6']
            },
            series: [performanceDetails.sentimentData.positive, performanceDetails.sentimentData.negative, performanceDetails.sentimentData.neutral]
        }
        : null;

    return (
        <Grid spacing={1} container mt={0.4} display={'flex'}>
            <Card sx={{ width: "100%", mx: 3, my: 1, display: "flex" }}>
                <Grid sm={2} md={2} xl={2} item>
                    <Sidebar />
                </Grid>
                <Card sx={{ height: "auto", width: "80%", my: 1 }}>
                    <Typography variant='h5' sx={{ m: 1 }}>Dashboard</Typography>
                    <Grid item sm={12} md={12} xl={12} p={1} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "60vw" }}>
                        <Card sx={{
                            width: "14rem",
                            height: "3.5rem",
                            p: 1,
                            borderRadius: "12px"
                        }}>
                            <Typography>Purchases</Typography>
                            <Typography variant='h6'>${formatNumber(performanceDetails.purchases)}</Typography>
                        </Card>
                        <Card sx={{
                            width: "14rem",
                            height: "3.5rem",
                            p: 1,
                            borderRadius: "12px"
                        }}>
                            <Typography>Revenue</Typography>
                            <Typography variant='h6'>${formatNumber(performanceDetails.revenue)}</Typography>
                        </Card>
                        <Card sx={{
                            width: "14rem",
                            height: "3.5rem",
                            p: 1,
                            borderRadius: "12px"
                        }}>
                            <Typography>Refunds</Typography>
                            <Typography variant='h6'>${formatNumber(performanceDetails.refunds)}</Typography>
                        </Card>
                    </Grid>
                    <Box p={2}>
                        <Typography variant='h5'>Comparison</Typography>
                        <ApexCharts options={chartData.options} series={chartData.series} type="bar" height={300} />
                    </Box>
                    <Box>
                        <TopProducts />
                    </Box>
                </Card>
                <Grid item sm={4} md={4} xl={4}>
                    <Card p={2} sx={{ width: "90%", ml: 2, mt: 1 }} >
                        {performanceDetails.halfCircleData && halfCircleData.options && halfCircleData.series &&
                            <ApexCharts options={halfCircleData.options} series={halfCircleData.series} type="radialBar" height={200} />
                        }
                        <Divider flexItem variant='middle' />
                        <Box sx={{ m: 2 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: "20px" }}>You are Good</Typography>
                            <Typography sx={{ fontSize: "16px" }}>Your  performance is better than others</Typography>
                            <Button sx={{ fontSize: "12px", borderRadius: "20px", textTransform: 'capitalize', mt: 1 }} variant='outlined' color='inherit'>Improve your score</Button>
                        </Box>
                    </Card>
                    <Card p={2} sx={{ width: "90%", height: "300px", ml: 2, mt: 1 }} >
                        <Box>
                            <Typography variant='h6'>Customer By  Device</Typography>
                            <Divider />
                        </Box>
                        <Box p={2}>


                            <SimpleLineChart />

                        </Box>
                    </Card>
                    <Card p={2} sx={{ width: "90%", ml: 2, my: 1 }} >
                        <Box>
                            <Typography variant='h6'>Community Feedback</Typography>
                            <Divider />
                        </Box>
                        <Box p={2}>
                            <ApexCharts options={sentimentChartData.options} series={sentimentChartData.series} type="donut" height={300} />
                        </Box>
                    </Card>
                </Grid>
            </Card>
        </Grid>
    );
};

export default Dashboard;
