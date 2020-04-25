import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private data: any;
  private name:any;

  setData(data: any) {
    this.data = data;
  }

  setName(name: any) {
    this.name = name;
  }

  getName(){
    const temp = this.name;
    this.clearData();
    return temp ;
  }
  getData() {
    const temp = this.data;
    this.clearData();
    return temp;
  }

  clearData() {
    this.data = undefined;
  }
}