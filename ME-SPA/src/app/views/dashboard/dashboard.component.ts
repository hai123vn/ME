import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as Highcharts from 'highcharts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartMonthlyService } from '../../_core/_service/chart-monthly.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  monthPrevious: string;
  hightcharts = Highcharts;
  chartOptions: any;
  dataChart: any;
  titleX: string[];
  columnName: string[];

  public chartPieOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom'
    },
    plugins: {
      datalabels: {
        color: 'black',
        formatter: (value, ctx) => {
          let sum: 0;
          const dataArr = (ctx.chart.data.datasets[0].data);
          const label = (ctx.chart.data.labels[ctx.dataIndex]);
          dataArr.forEach(data => {
            sum += data;
          });
          const percentage = label + '\n' + (value * 100 / sum).toFixed(2) + '%';
          return percentage;
        },
        font: {
          weight: 'bold',
          size: 16,
        },
      },
    },
  };
  public chartPiePlugins = [pluginDataLabels];
  public chartPieLabels: string[] = ['Implemented', 'Ongoing', 'Not Feasible'];
  public chartPieLegend = true;
  public chartPieType = 'pie';
  public chartPieData: ChartDataSets[] = [{
    data: [],
    backgroundColor: [
      '#95b3d7',
      '#fac090',
      '#d99694'
    ],
  }];
  constructor(
    private chartService: ChartMonthlyService,
    // private improveProjectService: Im
  ) { }

  ngOnInit() {
  }

}
