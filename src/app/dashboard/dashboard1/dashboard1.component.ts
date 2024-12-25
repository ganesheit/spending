import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexFill,
  ApexMarkers,
  ApexGrid,
  ApexTitleSubtitle,
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
  labels: string[];
  markers: ApexMarkers;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
};
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgScrollbar } from 'ngx-scrollbar';
import { FeatherIconsComponent } from '../../shared/components/feather-icons/feather-icons.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { InfoBox2Component } from '@shared/components/info-box2/info-box2.component';
import { MatCardModule } from '@angular/material/card';
import {
  Transaction,
  TransactionsWidgetComponent,
} from '@shared/components/transactions-widget/transactions-widget.component';
import { TableCardComponent } from '@shared/components/table-card/table-card.component';
import {
  Project,
  ProjectStatusComponent,
} from '@shared/components/project-status/project-status.component';
import { TodoWidgetComponent } from '@shared/components/todo-widget/todo-widget.component';
import { DocumentListComponent } from '@shared/components/document-list/document-list.component';

interface Todo {
  title: string;
  done: boolean;
  priority: 'Low' | 'Normal' | 'High';
}

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss'],
  imports: [
    BreadcrumbComponent,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    FeatherIconsComponent,
    NgApexchartsModule,
    NgScrollbar,
    MatCardModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatTooltipModule,
    InfoBox2Component,
    TransactionsWidgetComponent,
    TableCardComponent,
    ProjectStatusComponent,
    TodoWidgetComponent,
    DocumentListComponent,
  ],
})
export class Dashboard1Component implements OnInit {
  public areaChartOptions!: Partial<ChartOptions>;
  public barChartOptions!: Partial<ChartOptions>;
  public earningOptions!: Partial<ChartOptions>;
  public performanceRateChartOptions!: Partial<ChartOptions>;

  constructor() {
    //constructor
  }
  ngOnInit() {
    this.chart1();
    this.chart3();
    this.chart2();
    this.chart4();
  }

  private chart1() {
    this.areaChartOptions = {
      series: [
        {
          name: 'New Clients',
          data: [31, 40, 28, 51, 42, 85, 77],
        },
        {
          name: 'Old Clients',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#4FC3F7', '#7460EE'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19',
          '2018-09-20',
          '2018-09-21',
          '2018-09-22',
          '2018-09-23',
          '2018-09-24',
          '2018-09-25',
        ],
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 0,
        offsetY: 0,
      },

      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
  private chart2() {
    this.barChartOptions = {
      series: [
        {
          name: 'New Errors',
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: 'Bugs',
          data: [13, 23, 20, 8, 13, 27],
        },
        {
          name: 'Development',
          data: [11, 17, 15, 15, 21, 14],
        },
        {
          name: 'Payment',
          data: [21, 7, 25, 13, 22, 8],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        foreColor: '#9aa0ac',
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'category',
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      },
      legend: {
        show: false,
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      fill: {
        opacity: 0.8,
        colors: ['#E82742', '#2F3149', '#929DB0', '#CED6D3'],
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
  private chart3() {
    this.earningOptions = {
      series: [
        {
          name: '2019',
          data: [15, 48, 36, 20, 40, 60, 35, 20, 16, 31, 22, 11],
        },
        {
          name: '2018',
          data: [8, 22, 60, 35, 17, 24, 48, 37, 56, 22, 32, 38],
        },
      ],
      chart: {
        height: 320,
        type: 'line',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 3,
        curve: 'smooth',
        dashArray: [0, 8],
      },
      colors: ['#8793ea', '#4caf50'],
      fill: {
        opacity: [1, 0.5],
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        labels: {
          style: {
            colors: '#8e8da4',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#8e8da4',
          },
        },
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      tooltip: {
        theme: 'dark',
      },
    };
  }

  private chart4() {
    this.performanceRateChartOptions = {
      series: [
        {
          name: 'Bill Amount',
          data: [113, 120, 130, 120, 125, 119, 126],
        },
      ],
      chart: {
        height: 360,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        foreColor: '#9aa0ac',
        toolbar: {
          show: false,
        },
      },
      colors: ['#6777EF'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth',
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        title: {
          text: 'Weekday',
        },
      },
      yaxis: {
        title: {
          text: 'Bill Amount($)',
        },
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
  // transactions

  transactions: Transaction[] = [
    {
      type: 'Bank Transfer',
      category: 'Bank Transfer',
      description: 'Send money',
      amount: 100.65,
      icon: 'account_balance',
      iconColor: 'green',
      textColor: 'orange',
    },
    {
      type: 'Wallet',
      category: 'Wallet',
      description: 'Wallet recharge',
      amount: 2000,
      icon: 'account_balance_wallet',
      iconColor: 'orange',
      textColor: 'green',
    },
    {
      type: 'Credit Card',
      category: 'Credit Card',
      description: 'Ordered Food',
      amount: 25.69,
      icon: 'credit_card',
      iconColor: 'purple',
      textColor: 'orange',
    },
    {
      type: 'Cash Payment',
      category: 'Cash Payment',
      description: 'Sell Stationery',
      amount: 148.47,
      icon: 'attach_money',
      iconColor: 'blue',
      textColor: 'green',
    },
    {
      type: 'Debit Card',
      category: 'Debit Card',
      description: 'ATM Withdraw',
      amount: 100.65,
      icon: 'credit_card',
      iconColor: 'red',
      textColor: 'orange',
    },
    {
      type: 'Bank Transfer',
      category: 'Bank Transfer',
      description: 'Send money',
      amount: 100.65,
      icon: 'account_balance',
      iconColor: 'green',
      textColor: 'orange',
    },
  ];

  // invoice data

  invoiceData = [
    {
      invoiceNo: '#IN7865',
      clientName: 'John Doe',
      dueDate: '12/05/2016',
      status: 'Paid',
      total: '$500',
      img: 'assets/images/user/user1.jpg',
      invoiceLink: '#/admin/accounts/invoice',
    },
    {
      invoiceNo: '#IN2301',
      clientName: 'Sarah Smith',
      dueDate: '03/31/2016',
      status: 'Not Paid',
      total: '$372',
      img: 'assets/images/user/user2.jpg',
      invoiceLink: '#/admin/accounts/invoice',
    },
    {
      invoiceNo: '#IN7239',
      clientName: 'Airi Satou',
      dueDate: '04/14/2017',
      status: 'Partially Paid',
      total: '$1038',
      img: 'assets/images/user/user3.jpg',
      invoiceLink: '#/admin/accounts/invoice',
    },
    {
      invoiceNo: '#IN1482',
      clientName: 'Angelica Ramos',
      dueDate: '08/11/2017',
      status: 'Paid',
      total: '$872',
      img: 'assets/images/user/user4.jpg',
      invoiceLink: '#/admin/accounts/invoice',
    },
    {
      invoiceNo: '#IN8526',
      clientName: 'Ashton Cox',
      dueDate: '02/15/2018',
      status: 'Not Paid',
      total: '$2398',
      img: 'assets/images/user/user5.jpg',
      invoiceLink: '#/admin/accounts/invoice',
    },
    {
      invoiceNo: '#IN2473',
      clientName: 'Cara Stevens',
      dueDate: '01/28/2017',
      status: 'Paid',
      total: '$834',
      img: 'assets/images/user/user6.jpg',
      invoiceLink: '#/admin/accounts/invoice',
    },
    {
      invoiceNo: '#IN7366',
      clientName: 'Jacob Ryan',
      dueDate: '03/11/2017',
      status: 'Partially Paid',
      total: '$147',
      img: 'assets/images/user/user7.jpg',
      invoiceLink: '#/admin/accounts/invoice',
    },
    {
      invoiceNo: '#IN5642',
      clientName: 'Emily Walker',
      dueDate: '09/12/2018',
      status: 'Paid',
      total: '$650',
      img: 'assets/images/user/user8.jpg',
      invoiceLink: '#/admin/accounts/invoice',
    },
    {
      invoiceNo: '#IN1457',
      clientName: 'Michael Brown',
      dueDate: '04/20/2019',
      status: 'Not Paid',
      total: '$1220',
      img: 'assets/images/user/user9.jpg',
      invoiceLink: '#/admin/accounts/invoice',
    },
    {
      invoiceNo: '#IN9083',
      clientName: 'Olivia Green',
      dueDate: '10/03/2020',
      status: 'Partially Paid',
      total: '$850',
      img: 'assets/images/user/user10.jpg',
      invoiceLink: '#/admin/accounts/invoice',
    },
    {
      invoiceNo: '#IN3379',
      clientName: 'David Lee',
      dueDate: '06/25/2021',
      status: 'Paid',
      total: '$1295',
      img: 'assets/images/user/user11.jpg',
      invoiceLink: '#/admin/accounts/invoice',
    },
    {
      invoiceNo: '#IN9874',
      clientName: 'Sophia Johnson',
      dueDate: '01/18/2022',
      status: 'Not Paid',
      total: '$320',
      img: 'assets/images/user/user2.jpg',
      invoiceLink: '#/admin/accounts/invoice',
    },
  ];

  invoiceColumnDefinitions = [
    { def: 'invoiceNo', label: 'Invoice No', type: 'text' },
    { def: 'clientName', label: 'Client Name', type: 'text' },
    { def: 'dueDate', label: 'Due Date', type: 'date' },
    { def: 'status', label: 'Status', type: 'badge' },
    { def: 'total', label: 'Total', type: 'currency' },
    { def: 'actions', label: 'Actions', type: 'actionBtn' },
  ];

  // project status

  projects: Project[] = [
    {
      name: 'Angular App',
      progress: 90,
      progressColor: 'green-progress',
    },
    {
      name: 'Java Software',
      progress: 54,
      progressColor: 'red-progress',
    },
    {
      name: 'Html Website',
      progress: 68,
      progressColor: 'sky-progress',
    },
    {
      name: 'IOS App',
      progress: 40,
      progressColor: 'orange-progress',
    },
    {
      name: 'Python Project',
      progress: 28,
      progressColor: 'green-progress',
    },
    {
      name: 'Reactjs App',
      progress: 89,
      progressColor: 'sky-progress',
    },
    {
      name: 'Node.js API',
      progress: 75,
      progressColor: 'green-progress',
    },
    {
      name: 'Flutter App',
      progress: 56,
      progressColor: 'orange-progress',
    },
    {
      name: 'C# Application',
      progress: 63,
      progressColor: 'red-progress',
    },
    {
      name: 'JavaScript Tutorial',
      progress: 80,
      progressColor: 'sky-progress',
    },
    {
      name: 'Vue.js Project',
      progress: 45,
      progressColor: 'green-progress',
    },
  ];

  // TODO start
  tasks: Todo[] = [
    { title: 'Buy groceries', done: false, priority: 'Normal' },
    { title: 'Finish project report', done: false, priority: 'High' },
    { title: 'Clean the house', done: true, priority: 'Low' },
    { title: 'Call the bank', done: false, priority: 'Normal' },
    { title: 'Read a book', done: false, priority: 'Low' },
    { title: 'Schedule doctor appointment', done: false, priority: 'High' },
    { title: 'Prepare for presentation', done: false, priority: 'Normal' },
    { title: 'Exercise for 30 minutes', done: false, priority: 'Normal' },
    { title: 'Finish laundry', done: true, priority: 'Low' },
    { title: 'Write blog post', done: false, priority: 'High' },
    { title: 'Organize workspace', done: false, priority: 'Normal' },
    { title: 'Plan weekend trip', done: false, priority: 'High' },
    { title: 'Buy gifts for friends', done: false, priority: 'Low' },
  ];

  onTodoToggled(todo: any) {
    console.log('Todo toggled:', todo);
  }

  onTodosUpdated(updatedTodos: any[]) {
    console.log('Todos updated:', updatedTodos);
  }
  // TODO end

  // document list

  documentList = [
    {
      title: 'Java Programming',
      type: '.doc',
      size: 4.3,
      icon: 'far fa-file-word',
      iconClass: 'primary-rgba text-primary',
      textClass: '',
    },
    {
      title: 'Angular Theory',
      type: '.xls',
      size: 2.5,
      icon: 'far fa-file-excel',
      iconClass: 'success-rgba text-success',
      textClass: '',
    },
    {
      title: 'Maths Sums Solution',
      type: '.pdf',
      size: 10.5,
      icon: 'far fa-file-pdf',
      iconClass: 'danger-rgba text-danger',
      textClass: '',
    },
    {
      title: 'Submit Science Journal',
      type: '.zip',
      size: 53.2,
      icon: 'far fa-file-archive',
      iconClass: 'info-rgba text-info',
      textClass: '',
    },
    {
      title: 'Marketing Instructions',
      type: '.doc',
      size: 5.3,
      icon: 'far fa-file-word',
      iconClass: 'primary-rgba text-primary',
      textClass: '',
    },
  ];

  // projects

  projectData = [
    {
      projectName: 'Project A',
      employeesTeam: [
        { name: 'John Doe', avatar: 'user1.jpg' },
        { name: 'Jane Smith', avatar: 'user2.jpg' },
        { name: 'Bob Johnson', avatar: 'user3.jpg' },
        { name: 'Alice Williams', avatar: 'user4.jpg' },
      ],
      teamLeader: 'John Doe',
      priority: 'Medium',
      openTask: 19,
      completedTask: 10,
      status: 'Pending',
      documents: 'Contract.pdf',
      actions: 'Edit, Delete',
    },
    {
      projectName: 'Project B',
      employeesTeam: [
        { name: 'Sarah Smith', avatar: 'user7.jpg' },
        { name: 'Michael Johnson', avatar: 'user2.jpg' },
        { name: 'Emily Davis', avatar: 'user8.jpg' },
      ],
      teamLeader: 'Sarah Smith',
      priority: 'Low',
      openTask: 25,
      completedTask: 18,
      status: 'In Progress',
      documents: 'Proposal.pdf',
      actions: 'Edit, Delete',
    },
    {
      projectName: 'Project C',
      employeesTeam: [
        { name: 'Olivia Brown', avatar: 'user9.jpg' },
        { name: 'James Lee', avatar: 'user10.jpg' },
        { name: 'Sophia Wilson', avatar: 'user11.jpg' },
      ],
      teamLeader: 'Olivia Brown',
      priority: 'High',
      openTask: 30,
      completedTask: 25,
      status: 'Completed',
      documents: 'Final_Report.pdf',
      actions: 'Edit, Delete',
    },
    {
      projectName: 'Project D',
      employeesTeam: [
        { name: 'David Martinez', avatar: 'user2.jpg' },
        { name: 'Isabella Taylor', avatar: 'user8.jpg' },
        { name: 'Lucas White', avatar: 'user7.jpg' },
      ],
      teamLeader: 'David Martinez',
      priority: 'Low',
      openTask: 15,
      completedTask: 10,
      status: 'Pending',
      documents: 'Initial_Design.pdf',
      actions: 'Edit, Delete',
    },
    {
      projectName: 'Project E',
      employeesTeam: [
        { name: 'Ethan Green', avatar: 'user5.jpg' },
        { name: 'Mia Clark', avatar: 'user6.jpg' },
        { name: 'Daniel Harris', avatar: 'user9.jpg' },
        { name: 'Charlotte Lewis', avatar: 'user8.jpg' },
      ],
      teamLeader: 'Ethan Green',
      priority: 'Medium',
      openTask: 40,
      completedTask: 30,
      status: 'Completed',
      documents: 'Budget_Sheet.xlsx',
      actions: 'Edit, Delete',
    },
    {
      projectName: 'Project F',
      employeesTeam: [
        { name: 'Jack Robinson', avatar: 'user2.jpg' },
        { name: 'Lily Walker', avatar: 'user1.jpg' },
        { name: 'Henry Adams', avatar: 'user4.jpg' },
      ],
      teamLeader: 'Jack Robinson',
      priority: 'High',
      openTask: 12,
      completedTask: 10,
      status: 'In Progress',
      documents: 'Timeline_GanttChart.xlsx',
      actions: 'Edit, Delete',
    },
    {
      projectName: 'Project G',
      employeesTeam: [
        { name: 'Ava Scott', avatar: 'user2.jpg' },
        { name: 'David Moore', avatar: 'user5.jpg' },
        { name: 'Emma Taylor', avatar: 'user4.jpg' },
        { name: 'Lucas White', avatar: 'user7.jpg' },
        { name: 'Pankaj Patel', avatar: 'user3.jpg' },
      ],
      teamLeader: 'Ava Scott',
      priority: 'Low',
      openTask: 22,
      completedTask: 14,
      status: 'Completed',
      documents: 'Research_Notes.pdf',
      actions: 'Edit, Delete',
    },
    {
      projectName: 'Project H',
      employeesTeam: [
        { name: 'Sophia Miller', avatar: 'user10.jpg' },
        { name: 'Jackson Harris', avatar: 'user11.jpg' },
        { name: 'Ella Clark', avatar: 'user2.jpg' },
      ],
      teamLeader: 'Sophia Miller',
      priority: 'High',
      openTask: 17,
      completedTask: 16,
      status: 'Completed',
      documents: 'User_Guide.pdf',
      actions: 'Edit, Delete',
    },
  ];

  projectColumnDefinitions = [
    { def: 'projectName', label: 'Project Name', type: 'text' },
    { def: 'employeesTeam', label: 'Employee Team', type: 'team' },
    { def: 'teamLeader', label: 'Team Leaders', type: 'text' },
    { def: 'priority', label: 'Priority', type: 'priority' },
    { def: 'openTask', label: 'Open Task', type: 'text' },
    { def: 'completedTask', label: 'Completed Task', type: 'text' },
    { def: 'status', label: 'Status', type: 'text' },
    { def: 'documents', label: 'Documents', type: 'file' },
    { def: 'actions', label: 'Actions', type: 'actionBtn' },
  ];
}
