import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(public translate:TranslateService) {}

  configLang(langDefault:string = null){
    this.translate.addLangs(['en-US','pt-BR','fr-FR','pt-PT'])
    this.translate.setDefaultLang(langDefault)
    const browserCultureLang = this.translate.getBrowserCultureLang();
    let checkedBrowserCultureLang = ``;
    if(!langDefault) {
      checkedBrowserCultureLang = browserCultureLang.match(/pt-BR/) ? 'pt-PT' : browserCultureLang;
    }
    this.translate.use(checkedBrowserCultureLang.match(/en-US|fr-FR|pt-PT/) ? browserCultureLang : langDefault)  
  }

}
