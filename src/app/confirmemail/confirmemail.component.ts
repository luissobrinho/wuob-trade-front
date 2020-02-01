import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../services/translation/translation.service';

@Component({
  selector: 'app-confirmemail',
  templateUrl: './confirmemail.component.html',
  styleUrls: ['./confirmemail.component.css']
})
export class ConfirmemailComponent implements OnInit {

  constructor(private translateService: TranslationService) { }

  ngOnInit() {
  }

}
