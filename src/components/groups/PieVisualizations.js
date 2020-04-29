import React from "react";
import Chart from "react-google-charts";
import { VisualizationDiv } from "../../styles/Groups";
import NetworkLoader from "../../utilities/Loader";

const PieVisualizations = ({ photos }) => {
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
    console.log(result);
    return result;
  };
  if (photos && photos.length >= 1) {
    return (
      <VisualizationDiv>
        <h3>photo counts of the groups (Pie Chart)</h3>
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="PieChart"
          loader={<NetworkLoader />}
          data={transformChartData(photos)}
          options={{
            fontName: "Montserrat",
            fontSize: 14,
            bold: true,
            legend: {
              position: "labeled",
              alignment: "center",
              textStyle: {
                fontName: "Montserrat",
                fontSize: 10,
                bold: true,
                italic: false,
              },
            },
            is3D: true,
            pieSliceText: "percentage",
            colors: ["#757999", "#424561", "#ff7335", "#4390dd"],
          }}
          rootProps={{ "data-testid": "2" }}
        />
      </VisualizationDiv>
    );
  } else {
    return null;
  }
};

export default PieVisualizations;
