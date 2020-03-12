import {Component, OnDestroy} from '@angular/core';
// @ts-ignore
import {Observable, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
// @ts-ignore
// @ts-ignore
// @ts-ignore
import Any = jasmine.Any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnDestroy {
  title = 'Gif Searcher';
  displayedColumns = ['Image'];
  dataSource = [];
  displaySpinner = true;
  baseUrl = 'https://api.giphy.com/v1/gifs/search?api_key=3eFQvabDx69SMoOemSPiYfh9FY0nzO9x';

  // default values for search key and output limit parameters
  searchTerm = 'Smile';

  // @ts-ignore
  constructor(private httpclient: HttpClient) {
  }

  // On search key up function
  getKey(key) { // without type info
    this.searchTerm = key;
    const url = this.baseUrl + '&q=' + this.searchTerm;
    this.getGifs(url).subscribe(data => {
      this.dataSource = data.data;
      this.displaySpinner = false;
    });
  }

  // On get output limit keyup function
  getLimit(limit) {
    const searchLimit = limit;
    const url = this.baseUrl + '&q=' + this.searchTerm + '&limit=' + searchLimit;
    this.getGifs(url).subscribe(data => {
      this.dataSource = data.data;
      this.displaySpinner = false;
    });
  }


  // Giphy api call
  getGifs(url): Observable<Any> {
    // tslint:disable-next-line:max-line-length
    return this.httpclient.get(url);
  }



  // On page load
  // tslint:disable-next-line:use-lifecycle-interface
  // @ts-ignore
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): Observable<Any> {
    const url = this.baseUrl + '&q=' + this.searchTerm;
    this.getGifs(url).subscribe(data => {
      this.dataSource = data.data;
      this.displaySpinner = false;
    });

  }

  ngOnDestroy(): void {
  }

}
