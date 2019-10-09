import { Component, OnInit } from '@angular/core';
import { ChartServiceService } from '../../../service/chart-service.service'
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.css']
})
export class Chart1Component implements OnInit {

  public error: boolean = false;
  public message: string;

  constructor(public _chartService: ChartServiceService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    let self = this;
    self.spinner.show();
    self._chartService.getChartData().subscribe((result: any) => {
      self.spinner.hide();
      if(result.success){
        let data = result.data;
        data.forEach(chart => {
          if (chart.chartType === 'pie') {
            self.pieChartLabels.push(chart.value.label);
            self.pieChartData.push(chart.value.data);
          }
          else if (chart.chartType === 'doughnut') {
            self.doughnutChartLabels.push(chart.value.label);
          }
          else if (chart.chartType === 'polar area chart') {
            self.polarAreaChartLabels.push(chart.value.label);
            self.polarAreaChartData.push(chart.value.data);
          }
        });
      }
      else{
        self.error = true;
        self.message = " Server Error. Contact Server Team."
      }
    });
  }

  // Pie Chart 
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(134,25,0,0.3)', 'rgba(243,705,0,0.3)'],
    },
  ];

  // PolarArea
  public polarAreaChartLabels: Label[] = [];
  public polarAreaChartData: number[] = [];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  // Doughnut
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: number[][] = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70]
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(134,25,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(0,255,0,0.3)', 'rgba(243,705,0,0.3)'],
    }];

}
