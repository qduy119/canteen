import { useEffect, useState } from "react";

import { useTheme } from "@mui/material/styles";

import ReactApexChart from "react-apexcharts";

const barChartOptions = {
    chart: {
        type: "bar",
        height: 365,
        toolbar: {
            show: false,
        },
    },
    plotOptions: {
        bar: {
            columnWidth: "45%",
            borderRadius: 4,
        },
    },
    dataLabels: {
        enabled: false,
    },
    yaxis: {
        show: false,
    },
    grid: {
        show: false,
    },
};

// ==============================|| REVENUE BAR CHART ||============================== //

const RevenueBarChart = ({ revenue }) => {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const info = theme.palette.info.light;
    const series = [
        {
            name: "Total Revenue",
            data: revenue?.map((e) => Object.values(e))?.flat() ?? [],
        },
    ];

    const [options, setOptions] = useState(barChartOptions);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [info],
            xaxis: {
                categories: revenue?.map((e) => Object.keys(e))?.flat() ?? [],
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: [
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                        ],
                    },
                },
            },
            tooltip: {
                theme: "light",
            },
        }));
    }, [primary, info, secondary, revenue]);

    return (
        <div id="chart">
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={365}
            />
        </div>
    );
};

export default RevenueBarChart;
