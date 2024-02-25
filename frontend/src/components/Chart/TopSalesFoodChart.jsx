import ReactApexChart from "react-apexcharts";

export default function TopSalesFoodChart({ products }) {
    const donutChartOptions = {
        chart: {
            type: "donut",
        },
        labels: products?.reduce((result, product) => {
            result.push(product.name);
            return result;
        }, []) ?? [],
        legend: {
            position: "bottom",
        },
    };
    const series = products?.reduce((result, product) => {
        result.push(product.soldQuantity);
        return result;
    }, []) ?? [];

    return (
        <div id="chart">
            <ReactApexChart
                options={donutChartOptions}
                series={series}
                type="donut"
            />
        </div>
    );
}
