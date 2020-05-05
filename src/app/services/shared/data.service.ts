import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private data: any;
  private name: any;
  private id: number;

  setData(data: any) {
    this.data = data;
  }

  setName(name: any) {
    this.name = name;
  }

  getName() {
    const temp = this.name;
    this.clearData();
    return temp;
  }

  setId(id: number) {
    this.id = id;
  }

  getId(){
    const temp = this.id
    this.clearData();
    return temp;
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