import React from "react";
import BubbleChart from "@weknow/react-bubble-chart-d3";

import { KeyPhrase } from "@/interfaces/data";

function BubbleChartView(
  { topKeyPhrases }: { topKeyPhrases: KeyPhrase[] } = { topKeyPhrases: [] }
) {
  if (!topKeyPhrases) {
    return <></>;
  }
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1240,
        backgroundColor: "#00243790",
        borderColor: "#0015fff",
        border: "10px",
        marginTop: "20px",
      }}
    >
      <BubbleChart
        graph={{
          zoom: 0.6,
          offsetX: 0.15,
          offsetY: 0,
        }}
        width={1240}
        height={640}
        padding={1} // optional value, number that set the padding between bubbles
        showLegend={true} // optional value, pass false to disable the legend.
        legendPercentage={20} // number that represent the % of with that legend going to use.
        legendFont={{
          family: "Arial",
          size: 14,
          color: "#000",
          weight: "bold",
        }}
        valueFont={{
          family: "Arial",
          size: 10,
          color: "#fff",
          weight: "bold",
        }}
        labelFont={{
          family: "Arial",
          size: 12,
          color: "#fff",
          weight: "bold",
        }}
        //Custom bubble/legend click functions such as searching using the label, redirecting to other page
        data={topKeyPhrases.map((keyPhrase) => {
          return {
            label: keyPhrase.phrase,
            value: keyPhrase.frequency,
          };
        })}
      />
    </div>
  );
}

export default BubbleChartView;
