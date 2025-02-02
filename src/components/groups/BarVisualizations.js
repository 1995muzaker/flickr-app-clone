import React from "react";
import Chart from "react-google-charts";
import { VisualizationDiv } from "../../styles/Groups";
import NetworkLoader from "../../utilities/Loader";

const BarVisualizations = ({photos}) => {
  const transformChartData = (photos) => {
    const result = [];

    const data = photos;

    data.map((obj, index) => {
      if (index === 0) {
        const columnKeys = Object.keys(obj);
        result.push(columnKeys.splice(4, 2));
      }

      const dataToAppend = [obj.name, parseInt(obj.pool_count)];

      return result.push(dataToAppend);
    });
    return result;
  };
  if (photos && photos.length >= 1) {
    return (
      <VisualizationDiv>
        <h3>photo counts of the groups (Bar Chart)</h3>
        <Chart
          width={"100%"}
          height={"400px"}
          chartType="ComboChart"
          loader={<NetworkLoader />}
          data={transformChartData(photos)}
          options={{
            // Material design options
            legend: { position: "none" },
            fontName: "Montserrat",
            colors: ["#327ff6"],
            useObjectBoundingBoxUnits: false,
            chartArea: {
              left: 50,
              right: 0,
              top: 10,
              bottom: 45,
            },
            seriesType: "bars",
            vAxis: {
              minValue: 0,
              format: "short",
              titleTextStyle: {
                y: "0",
                color: "#000",
                fontName: "Montserrat",
                fontSize: 11,
                bold: true,
                italic: false,
              },
            },
            hAxis: {
              format: "short",
            },
            pieSliceText: "percentage",
            tooltip: {
              isHtml: true,
              pointerEvents: "none",
            },
          }}
          rootProps={{ "data-testid": "2" }}
          legendToggle
        />
      </VisualizationDiv>
    );
  } else {
    return null;
  }
};

export default BarVisualizations;
