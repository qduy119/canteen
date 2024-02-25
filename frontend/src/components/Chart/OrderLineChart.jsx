import { useState, useEffect } from "react";

import { useTheme } from "@mui/material/styles";

import ReactApexChart from "react-apexcharts";

const lineChartOptions = {
    chart: {
        height: 450,
        type: "line",
        toolbar: {
            show: false,
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
        width: 2,
    },
    grid: {
        strokeDashArray: 0,
    },
};

// ==============================|| ORDER LINE CHART ||============================== //

const OrderLineChart = ({ order }) => {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const [options, setOptions] = useState(lineChartOptions);
    const series = [
        {
            name: "Total Order",
            data: order?.map((e) => Object.values(e))?.flat() ?? [],
        },
    ];

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [theme.palette.primary.main, theme.palette.primary[700]],
            xaxis: {
                categories: order?.map((e) => Object.keys(e))?.flat() ?? [],
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
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                        ],
                    },
                },
                axisBorder: {
                    show: true,
                    color: line,
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [secondary],
                    },
                },
            },
            grid: {
                borderColor: line,
            },
            tooltip: {
                theme: "light",
            },
        }));
    }, [primary, secondary, line, theme, order]);

    return (
        <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={450}
        />
    );
};

export default OrderLineChart;
