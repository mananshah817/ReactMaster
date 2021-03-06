export const chartConfig = ({ dataItems, labels }) => {
  return {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          data: dataItems,
          backgroundColor: ["#51E5FF", "#440381", "#EC368D", "#FFE66D"],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Zerodha Share Holding Stocks"
      },
      plugins: {
        zoom: {
            // Container for pan options
            pan: {
                // Boolean to enable panning
                enabled: true,
     
                // Panning directions. Remove the appropriate direction to disable
                // Eg. 'y' would only allow panning in the y direction
                // A function that is called as the user is panning and returns the
                // available directions can also be used:
                //   mode: function({ chart }) {
                //     return 'xy';
                //   },
                mode: 'xy',
                // On category scale, factor of pan velocity
                speed: 20,
     
                // Minimal pan distance required before actually applying pan
                threshold: 10,
            },
     
            // Container for zoom options
            zoom: {
                // Boolean to enable zooming
                enabled: true,
     
                // Enable drag-to-zoom behavior
                drag: true,
     
                // Drag-to-zoom effect can be customized
                // drag: {
                // 	 borderColor: 'rgba(225,225,225,0.3)'
                // 	 borderWidth: 5,
                // 	 backgroundColor: 'rgb(225,225,225)',
                // 	 animationDuration: 0
                // },
     
                // Zooming directions. Remove the appropriate direction to disable
                // Eg. 'y' would only allow zooming in the y direction
                // A function that is called as the user is zooming and returns the
                // available directions can also be used:
                //   mode: function({ chart }) {
                //     return 'xy';
                //   },
                mode: 'xy',
     
               
                speed: 0.1,
     
                // Minimal zoom distance required before actually applying zoom
                threshold: 2,
     
                // On category scale, minimal zoom level before actually applying zoom
                sensitivity: 3,
            }
        }
    } ,
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const label = data.labels[tooltipItem.index];
            const val =
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            return label + ": $" + val;
          }
        }
      },
      legend: {
        position: "bottom",
        display: false
      },
      legendCallback: (chart) => {
        const renderLabels = (chart) => {
          const { data } = chart;
          return data.datasets[0].data
            .map(
              (_, i) =>
                `<li>
                    <div id="legend-${i}-item" class="legend-item">
                      <span style="background-color:
                        ${data.datasets[0].backgroundColor[i]}">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                      ${
                        data.labels[i] &&
                        `<span class="label">${data.labels[i]}: ₹${data.datasets[0].data[i]}</span>`
                      }
                    </div>
                </li>
              `
            )
            .join("");
        };
        return `
          <ul class="chartjs-legend">
            ${renderLabels(chart)}
          </ul>`;
      },
      responsive: true
    }
  };
};

export const bindChartEvents = (myChart, containerElement) => {
  const legendItemSelector = ".legend-item";
  const labelSeletor = ".label";

  const legendItems = [
    ...containerElement.querySelectorAll(legendItemSelector)
  ];
  legendItems.forEach((item, i) => {
    item.addEventListener("click", (e) =>
      updateDataset(e.target.parentNode, i)
    );
  });

  const updateDataset = (currentEl, index) => {
    const meta = myChart.getDatasetMeta(0);
    const labelEl = currentEl.querySelector(labelSeletor);
    const result = meta.data[index].hidden === true ? false : true;
    if (result === true) {
      meta.data[index].hidden = true;
      labelEl.style.textDecoration = "line-through";
    } else {
      labelEl.style.textDecoration = "none";
      meta.data[index].hidden = false;
    }
    myChart.update();
  };
};
