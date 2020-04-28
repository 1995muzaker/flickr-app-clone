import React from "react";
import Chart from "react-google-charts";
import { VisualizationDiv } from "../../styles/Groups";
import NetworkLoader from "../../utilities/Loader";

class PieVisualizations extends React.Component {
  transformChartData = (photos) => {
    const result = [];

    const data = photos;

    data.map((obj, index) => {
      if (index === 0) {
        const columnKeys = Object.keys(obj);
        result.push(columnKeys.splice(5, 2));
      }

      const dataToAppend = [obj.name, parseInt(obj.pool_count)];

      return result.push(dataToAppend);
    });
    console.log(result);
    return result;
  };

  render() {
    if (this.props.photos && this.props.photos.length >= 1) {
      return (
        <VisualizationDiv>
          <h3>photo counts of the groups (Pie Chart)</h3>
          <Chart
            width={"100%"}
            height={"300px"}
            chartType="PieChart"
            loader={<NetworkLoader />}
            data={this.transformChartData(this.props.photos)}
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
  }
}

export default PieVisualizations;
