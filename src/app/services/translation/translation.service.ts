import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(public translate:TranslateService) {}

  configLang(langDefault:string = 'en'){
    this.translate.addLangs(['en','pt','fr'])
    this.translate.setDefaultLang(langDefault)
    const browserlang = this.translate.getBrowserLang()
    this.translate.use(browserlang.match(/en|fr/)? browserlang:langDefault)  
  }

}
