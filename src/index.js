import Chart from "chart.js";
import { chartConfig, bindChartEvents } from "./utils";
import "./styles.css";

const chartSelector = "[data-results-chart]";
const chartTitleSelector = "[data-results-chart-title]";
const chartLegendSelector = "[data-results-chart-legends]";

let chartEl;
let chartTitleEl;
let chartLegendEL;
let myChart;

chartEl = document.querySelector(chartSelector);
chartTitleEl = document.querySelector(chartTitleSelector);
chartLegendEL = document.querySelector(chartLegendSelector);

const renderTitle = () => "Total value: ₹8977.12";

const renderChart = () => {
  chartTitleEl.textContent = renderTitle();

  const dataItems = ["6704.30", "84.70", "727.62", "1460.50"];
  const labels = ["FIEMIND", "GOLDBEES ", "NIFTYBEES", "YESBANK"];

  const ctx = chartEl.getContext("2d");
  myChart = new Chart(ctx, chartConfig({ dataItems, labels }));
  chartLegendEL.innerHTML = myChart.generateLegend();
  bindChartEvents(myChart, document);
};

renderChart();