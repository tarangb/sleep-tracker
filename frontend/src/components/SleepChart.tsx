import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent, ToolboxComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { getSleepDataLast7Days } from '../services/api';
import { BarChartData } from '../interfaces';



echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, LegendComponent, ToolboxComponent, CanvasRenderer]);

interface BarChartProps {
  userName: string;
  userGender: string;
}

const BarChartComponent: React.FC<BarChartProps> = ({ userName, userGender }) => {
  const [data, setData] = useState<BarChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSleepDataLast7Days(userName, userGender); // Pass userName and gender to fetch data for specific user
        setData(result); // Assuming result is an array of BarChartDataItem
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userName, userGender]); // Fetch data whenever userName and userGender prop changes


  useEffect(() => {
    const chart = echarts.init(document.getElementById('chart') as HTMLDivElement);

    const dates = data.map(item => item.date);
    const sleepDurations = data.map(item => item.sleepDuration);

    const options = {
      title: [
        {
          text: 'Sleep Time in Last 7 Days',
          left: 'center'
        },
        {
          text: `{normal|Name:} ${userName}   {normal|Gender:} ${userGender}`,
          left: 'center',
          bottom: 0,
          textStyle: {
            fontSize: 14,
            color: '#000',
            rich: {
              normal: {
                fontWeight: 'normal'
              }
            }
          }
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: dates
      },
      yAxis: {
        type: 'value',
        name: 'Hours',
        min: 0,
        max: 24,
        interval: 2
      },
      series: [{
        data: sleepDurations,
        type: 'bar'
      }],
      grid: {
        bottom: 60 // Adjust this value to make space for the text
      }
    };

    chart.setOption(options);

    return () => {
      chart.dispose();
    };
  }, [data, userName, userGender]); // Add userName and userGender to the dependencies

  return <div id="chart" style={{ width: '100%', height: '400px' }} />;
};

export default BarChartComponent;
