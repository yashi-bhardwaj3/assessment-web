import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {

  constructor(private httpClient: HttpClient) { }

  public getChartData() {
    return this.httpClient.get("http://localhost:3000/get-chart-data");
  }
  public postCharts() {
    let requestData = {
      chartType: 'bar',
      value: {
        label: '2019',
        productA: 23,
        productB: 45
      }
    };
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    return this.httpClient.post("http://localhost:3000/post-Chart-Data", requestData, options);
  }

  public getDataForBarChart() {
    return this.httpClient.get("http://localhost:3000/get-bar-chart-data");
  }

  public getDataForChartType(){
    return this.httpClient.get("http://localhost:3000/get-chartType");
  }


}
