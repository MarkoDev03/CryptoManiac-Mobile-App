import React from 'react'
import { LineChart } from 'react-native-wagmi-charts';

export default function ChartCanvas({ size, data, color }) {
  return (
    <LineChart.Provider data={data} >
           <LineChart width={size - 30}>
            <LineChart.Path color={color} width={1.3} />
            <LineChart.CursorCrosshair color={color} />
          </LineChart>
     </LineChart.Provider>
  )
}