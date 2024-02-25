import { useEffect, useState } from "react";

import { useTheme } from "@mui/material/styles";

import ReactApexChart from "react-apexcharts";

const columnChartOptions = {
    chart: {
        type: "bar",
        height: 430,
        toolbar: {
            show: false,
        },
    },
    plotOptions: {
        bar: {
            columnWidth: "30%",
            borderRadius: 4,
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        show: true,
        width: 8,
        colors: ["transparent"],
    },
    yaxis: {
        title: {
            text: "$ (thousands)",
        },
    },
    fill: {
        opacity: 1,
    },
    tooltip: {
        y: {
            formatter(val) {
                return `$${val}`;
            },
        },
    },
    legend: {
        show: true,
        fontFamily: `'Public Sans', sans-serif`,
        offsetX: 10,
        offsetY: 10,
        labels: {
            useSeriesColors: false,
        },
        markers: {
            width: 16,
            height: 16,
            radius: "50%",
            offsexX: 2,
            offsexY: 2,
        },
        itemMargin: {
            horizontal: 15,
            vertical: 50,
        },
    },
    responsive: [
        {
            breakpoint: 600,
            options: {
                yaxis: {
                    show: false,
                },
            },
        },
    ],
};

// ==============================|| SALES COLUMN CHART ||============================== //

const SalesColumnChart = ({ revenue, profit }) => {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const warning = theme.palette.warning.main;
    const primaryMain = theme.palette.primary.main;
    const successDark = theme.palette.success.dark;

    const series = [
        {
            name: "Net Profit",
            data: profit?.map((e) => Object.values(e))?.flat() ?? [],
        },
        {
            name: "Revenue",
            data: revenue?.map((e) => Object.values(e))?.flat() ?? [],
        },
    ];

    const [options, setOptions] = useState(columnChartOptions);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [warning, primaryMain],
            xaxis: {
                labels: {
                    style: {
                        colors: [
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                            secondary,
                        ],
                    },
                },
                categories: revenue?.map((e) => Object.keys(e))?.flat() ?? [],
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
            legend: {
                position: "top",
                horizontalAlign: "right",
                labels: {
                    colors: "grey.500",
                },
            },
        }));
    }, [primary, secondary, line, warning, primaryMain, successDark, revenue]);

    return (
        <div id="chart">
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={430}
            />
        </div>
    );
};

export default SalesColumnChart;
