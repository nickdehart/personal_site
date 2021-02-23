import React, { PureComponent } from "react";
import data from "./gme_history";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.reverse()}>
          <XAxis dataKey="Date" />
          <YAxis domain={[0, 500]} />
          <Tooltip />
          {/* <Legend /> */}
          <Line
            isAnimationActive={false}
            type="monotone"
            dot={false}
            dataKey="High"
            stroke="#8884d8"
            strokeWidth={3}
          />
          {/* <Line
            isAnimationActive={false}
            type="monotone"
            dot={false}
            dataKey="Open"
            stroke="#82ca9d"
            strokeWidth={3}
          />
          <Line
            isAnimationActive={false}
            type="monotone"
            dot={false}
            dataKey="Low"
            stroke="#ffc658"
            strokeWidth={3}
          /> */}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
