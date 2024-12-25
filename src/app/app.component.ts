
import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, RouterModule } from '@angular/router';
import { PageLoaderComponent } from './layout/page-loader/page-loader.component';
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";

@Component({
    selector: 'app-root',
    imports: [
        RouterModule,
        PageLoaderComponent,
    ],
    providers: [],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUrl!: string;
  constructor(public _router: Router) {
    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.currentUrl = routerEvent.url.substring(
          routerEvent.url.lastIndexOf('/') + 1
        );
      }
      if (routerEvent instanceof NavigationEnd) {
        /* empty */
      }
      window.scrollTo(0, 0);
    });
  }


  ngOnInit() {
    console.log('app => ngOnInit');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCITBlRe5sU2ptQtU9NJ4A4clwn5JhOpQs",
  authDomain: "spending-report-846e3.firebaseapp.com",
  projectId: "spending-report-846e3",
  storageBucket: "spending-report-846e3.firebasestorage.app",
  messagingSenderId: "201700680565",
  appId: "1:201700680565:web:ef5d047ec4b2abbbd8693c",
  measurementId: "G-Q0R36B5E45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
  }

}
