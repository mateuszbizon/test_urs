"use client"
import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import './Results.css'
import { AiFillEdit } from 'react-icons/ai'
import CaloriePopup from '@/components/ResultPopup/Calorie/CaloriePopup';


const page = () => {
    const color = '#03c9bf'

    const chartsParametrs = { height: 300};

    const [dataS1, setDataS1] = React.useState<any>(null)
    const getDataForS1 = async () => {

        let temp = [
            {
                date: 'Fri Dec 01 2023 19:27:10 GMT+0100 (czas środkowoeuropejski standardowy)',
                value: 2000,
                unit: 'kcal'
            },
            {
                date: 'Thu Nov 30 2023 19:27:10 GMT+0100 (czas środkowoeuropejski standardowy)',
                value: 2500,
                unit: 'kcal'
            },
            {
                date: 'Wed Nov 29 2023 19:27:10 GMT+0100 (czas środkowoeuropejski standardowy)',
                value: 2700,
                unit: 'kcal'
            },
            {
                date: 'Tue Nov 28 2023 19:27:10 GMT+0100 (czas środkowoeuropejski standardowy)',
                value: 3000,
                unit: 'kcal'
            },
            {
                date: 'Mon Nov 27 2023 19:27:10 GMT+0100 (czas środkowoeuropejski standardowy)',
                value: 2000,
                unit: 'kcal'
            },
            {
                date: 'Sun Nov 26 2023 19:27:10 GMT+0100 (czas środkowoeuropejski standardowy)',
                value: 2300,
                unit: 'kcal'
            },
            {
                date: 'Sat Nov 25 2023 19:27:10 GMT+0100 (czas środkowoeuropejski standardowy)',
                value: 2500,
                unit: 'kcal'
            },
            {
                date: 'Fri Nov 24 2023 19:27:10 GMT+0100 (czas środkowoeuropejski standardowy)',
                value: 2700,
                unit: 'kcal'
            },
        ]

        let dataForLineChart = temp.map((item: any) => {
            let val = JSON.stringify(item.value)
            return val
        })

        let dataForXAxis = temp.map((item: any) => {
            let val = new Date(item.date)
            return val
        })

        console.log({
            data: dataForLineChart,
            title: '1 Day Calorie',
            color: color,
            xAxis: {
                data: dataForXAxis,
                label: 'Last 10 Days',
                scaleType: 'time'
            }
        })

        setDataS1({
            data: dataForLineChart,
            title: '1 Day Calorie',
            color: color,
            xAxis: {
                data: dataForXAxis,
                label: 'Last 10 Days',
                scaleType: 'time'
            }
        })
    }

    React.useEffect(() => {
        getDataForS1()
    }, [])

    const [showCaloriePopup, setShowCaloriePopup] = React.useState<boolean>(false)

    return (
        <div className='results'>
            <div className='s1'>
                {
                    dataS1 &&
                    <LineChart
                        xAxis={[{ id: 'Day',
                        data: dataS1.xAxis.data,
                        scaleType: dataS1.xAxis.scaleType,
                        label: dataS1.xAxis.label,
                        valueFormatter: (date: any) => {
                            if (date instanceof Date) {
                                return String(date.getDate()); // Convert the number to a string
                            } else {
                                console.error('Invalid date format:', date);
                                return ''; // Return an empty string or handle other cases accordingly
                            }
                        }
                         
                    }]}
                        series={[
                            {
                                data: dataS1.data,
                                label: dataS1.title,
                                color: dataS1.color,
                            },
                        ]}
                        {...chartsParametrs}
                        />
                }
            </div>
            <div className='s2'>
                {
                    dataS1 &&
                    <LineChart
                        xAxis={[{ id: 'Day',
                        data: dataS1.xAxis.data,
                        scaleType: dataS1.xAxis.scaleType,
                        label: dataS1.xAxis.label,
                        valueFormatter: (date: any) => {
                            if (date instanceof Date) {
                                return String(date.getDate()); // Convert the number to a string
                            } else {
                                console.error('Invalid date format:', date);
                                return ''; // Return an empty string or handle other cases accordingly
                            }
                        }
                         
                    }]}
                        series={[
                            {
                                data: dataS1.data,
                                label: dataS1.title,
                                color: dataS1.color,
                            },
                        ]}
                        {...chartsParametrs}
                        />
                }
            </div>
            <div className='s3'>
                {
                    dataS1 &&
                    <LineChart
                        xAxis={[{ id: 'Day',
                        data: dataS1.xAxis.data,
                        scaleType: dataS1.xAxis.scaleType,
                        label: dataS1.xAxis.label,
                        valueFormatter: (date: any) => {
                            if (date instanceof Date) {
                                return String(date.getDate()); // Convert the number to a string
                            } else {
                                console.error('Invalid date format:', date);
                                return ''; // Return an empty string or handle other cases accordingly
                            }
                        }
                         
                    }]}
                        series={[
                            {
                                data: dataS1.data,
                                label: dataS1.title,
                                color: dataS1.color,
                            },
                        ]}
                        {...chartsParametrs}
                        />
                }
            </div>
            <div className='s4'>
                {
                    dataS1 &&
                    <LineChart
                        xAxis={[{ id: 'Day',
                        data: dataS1.xAxis.data,
                        scaleType: dataS1.xAxis.scaleType,
                        label: dataS1.xAxis.label,
                        valueFormatter: (date: any) => {
                            if (date instanceof Date) {
                                return String(date.getDate()); // Convert the number to a string
                            } else {
                                console.error('Invalid date format:', date);
                                return ''; // Return an empty string or handle other cases accordingly
                            }
                        }
                         
                    }]}
                        series={[
                            {
                                data: dataS1.data,
                                label: dataS1.title,
                                color: dataS1.color,
                            },
                        ]}
                        {...chartsParametrs}
                        />
                }
                <button className='editbutton' onClick={() => {
                    setShowCaloriePopup(true)
                }}>
                <AiFillEdit />
                </button>

                {
                showCaloriePopup &&

                <CaloriePopup setShowCaloriePopup={setShowCaloriePopup} />

                }

            </div>
        </div>
    )
}

export default page


