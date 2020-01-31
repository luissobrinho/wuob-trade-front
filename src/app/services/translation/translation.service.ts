import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(public translate:TranslateService) {}

  configLang(langDefault:string = 'en-US'){
    this.translate.addLangs(['en-US','pt-BR','fr-FR','pt-PT'])
    this.translate.setDefaultLang(langDefault)
    const browserlang = this.translate.getBrowserLang();
    const browserCultureLang = this.translate.getBrowserCultureLang();
    const checkedBrowserCultureLang = browserCultureLang.match(/pt-BR/)? 'pt-PT' : browserCultureLang;
    this.translate.use(checkedBrowserCultureLang.match(/en-US|fr-FR|pt-PT/)? browserCultureLang:langDefault)  
  }

}
