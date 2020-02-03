import { Injectable } from '@angular/core';
import *  as uuid from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class UuidService {
  constructor() {
    if (!this.checkExistUuid()) {
      this.generateUuid('v4')
    }
  }

  getUuid(): string {
    return sessionStorage.getItem('HashAppSecurytWeb')
  }

  generateUuid(version = 'v1') {
    let id = '';
    switch (version) {
      case 'v1':
        id = uuid.v1()
        break;
      case 'v2':
        id = uuid.v1()
        break;
      case 'v3':
        id = uuid.v3()
        break;
      case 'v4':
        id = uuid.v4()
        break;
      default:
        id = uuid.v5()
        break;
    }
    sessionStorage.setItem('HashAppSecurytWeb', id);
  }

  checkExistUuid() {
    if (!sessionStorage.getItem('HashAppSecurytWeb')) {
      return false;
    }
    return true;
  }
}
