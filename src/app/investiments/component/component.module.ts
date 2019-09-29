import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptocardComponent } from './cryptocard/cryptocard.component';



@NgModule({
  declarations: [CryptocardComponent],
  imports: [
    CommonModule
  ],
  exports: [CryptocardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentModule { }
