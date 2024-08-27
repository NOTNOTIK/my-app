import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './TableWithChart.css'; // Для стилизации таблицы
const data = [
  { indicator: 'Выручка руб', currentDay: 500521, yesterday: 480521, thisWeek: 4805121 },
  { indicator: 'Наличные', currentDay: 300000, yesterday: 300000, thisWeek: 300000 },
  { indicator: 'Безналичный расчет', currentDay: 100000, yesterday: 100000, thisWeek: 100000 },
  { indicator: 'Кредитные карты', currentDay: 100521, yesterday: 100521, thisWeek: 100521 },
  { indicator: 'Средний чек руб', currentDay: 1300, yesterday: 900, thisWeek: 900 },
  { indicator: 'Средний гость руб', currentDay: 1200, yesterday: 800, thisWeek: 800 },
  { indicator: 'Удаление из чека(после оплаты) руб', currentDay: 1000, yesterday: 1100, thisWeek: 900 },
  { indicator: 'Удаление из чека(до оплаты) руб', currentDay: 1300, yesterday: 1300, thisWeek: 900 },
  { indicator: 'Количество чеков', currentDay: 34, yesterday: 36, thisWeek: 34 },
  { indicator: 'Количество гостей', currentDay: 34, yesterday: 36, thisWeek: 32 },
];

const TableWithChart = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const calculateChange = (current, previous) => {
    return ((current - previous) / previous) * 100;
  };

  const chartOptions = {
    title: {
      text: 'График данных'
    },
    xAxis: {
      categories: ['Текущий день', 'Вчера', 'Этот день недели']
    },
    yAxis: {
      title: {
        text: 'Значение'
      }
    },
    series: [
      {
        name: 'Данные',
        data: selectedRow ? [selectedRow.currentDay, selectedRow.yesterday, selectedRow.thisWeek] : [0, 0, 0]
      }
    ]
  };

  return (
    <div>
      <table border="1" className="styled-table">
        <thead>
          <tr>
            <th>Показатель</th>
            <th>Текущий день</th>
            <th>Вчера</th>
            <th>Этот день недели</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            const change = calculateChange(row.currentDay, row.yesterday);
            const yesterdayColor = row.yesterday < row.currentDay ? 'green' : row.yesterday > row.currentDay ? 'red' : '#f4f4f4';
            const changeText = row.yesterday < row.currentDay ? `+${change.toFixed(2)}%` : `-${change.toFixed(2)}%`;

            return (
              <React.Fragment key={index}>
                <tr onClick={() => handleRowClick(row)} className="data-row">
                  <td>{row.indicator}</td>
                  <td className="current-day">{row.currentDay}</td>
                  <td style={{ backgroundColor: yesterdayColor }}>{row.yesterday} <span className="percentage-change">{changeText}</span></td>
                  <td>{row.thisWeek}</td>
                </tr>
                {selectedRow === row && (
                  <tr>
                    <td colSpan="4" className="chart-container">
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithChart;