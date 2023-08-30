import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  userData: any;
  userOptions: any;
  subsData: any;
  subsOption: any;
  activeData:any
  activeOptions:any

  ngOnInit() {
    this.userReportGraph()
    this.subscriptionGraph()
    this.sellerReportGraph()
  }

  userReportGraph() {
    this.userData = {
      labels: ['Registered', 'Non Resgistered', 'Seller'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            '#7DA0FA',
            '#ED0049',
            '#57B657',
          ],
          hoverBackgroundColor: [
            '#7DA0FA',
            '#ED0049',
            '#57B657',
          ],
        },
      ],
    };

    this.userOptions = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: '#000',
          },
        },
      },
    };
  }

  subscriptionGraph() {
    this.subsData = {
      labels: ['STALL', 'BAZAAR', 'ELITE'],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [
            "#FFDB58",
           "#87CEEB",
            "#008000",
          ],
          hoverBackgroundColor: [
            "#FFDB58",
            "#87CEEB",
             "#008000",
          ],
        },
      ],
    };

    this.subsOption = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: "#000",
          },
        },
      },
    };
  }

  sellerReportGraph(){
    this.activeData = {
      labels: ['Active', 'Blocked'],
      datasets: [
        {
          data: [70,30],
          backgroundColor: [
            '#2196F3',
            '#9E9E9E',
          ],
          hoverBackgroundColor: [
            '#2196F3',
            '#9E9E9E',
          ],
        },
      ],
    };

    this.activeOptions = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: '#000',
          },
        },
      },
    };
  }
}
