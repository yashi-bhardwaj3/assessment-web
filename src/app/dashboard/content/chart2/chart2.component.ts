import { Component, OnInit } from '@angular/core';
import { ChartServiceService } from '../../../service/chart-service.service'
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.css']
})
export class Chart2Component implements OnInit {

  constructor(public _chartService: ChartServiceService,
              private spinner: NgxSpinnerService) { }

  public responseData: any;
  public error: boolean = false;
  public message: string;

  ngOnInit() {
    var self = this;
    self.spinner.show();
    self._chartService.getDataForChartType().
    subscribe((result: any) => {
      console.log(result);
      result.data.forEach(chart => {
          self.pieChartLabels.push(chart._id.toUpperCase());
          self.pieChartData.push(chart.count);
      });
    });
    self._chartService.getDataForBarChart().
      subscribe((res: any) => {
        self.spinner.hide();
        if(res.success){
        self.responseData = res;
        res.data.forEach((data: any) => {
          self.barChartLabels.push(data.value.label);
          self.barChartData[0].data.push(data.value.productA);
          self.barChartData[1].data.push(data.value.productB);
        });
      }
      else{
        self.error = true;
        self.message = " Server Error. Contact Server Team."
      }
      });

  }

  // Pie Chart for aggrreate query result
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

//bar chart with sorting and re structuring
  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Product A' },
    { data: [], label: 'Product B' }
  ];
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public sort(val: string): void {
    let self = this;
    self.barChartLabels.length = 0;
    self.barChartData[0].data.length = 0;
    self.barChartData[1].data.length = 0;
    let sortedResponse:any;
    if (val === 'productA') {
      sortedResponse = this.responseData.data.sort((obj1: any, obj2: any) => {
        return obj1.value.productA - obj2.value.productA;
      });
    }
    else if (val === 'productB') {
      sortedResponse = this.responseData.data.sort((obj1: any, obj2: any) => {
        return obj1.value.productB - obj2.value.productB;
      });
    }
    sortedResponse.forEach((data: any) => {
      self.barChartLabels.push(data.value.label);
      self.barChartData[0].data.push(data.value.productA);
      self.barChartData[1].data.push(data.value.productB);
    });
  }
  public reStructureChart(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

}
