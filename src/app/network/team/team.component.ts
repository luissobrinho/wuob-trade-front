import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NetworkService } from 'src/app/services/network/network.service';
import { UserNetwork, Networkdown } from 'src/app/models/Network';
import { Events } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { environment } from 'src/environments/environment';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  ColumnMode = ColumnMode;
  rows: UserNetwork[] = [];
  user: any;
  linkReference: string;

  constructor(
    private network: NetworkService,
    public events: Events,
    public ngxService: NgxUiLoaderService,
    private cd: ChangeDetectorRef,
    private translateService: TranslationService,
    private route: ActivatedRoute,private titleService: Title
  ) { }

  ngOnInit() {

    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.linkReference = `${environment.urlAngular}/${this.user.meta.referencia}`;

    this.translateService.translate.get(["ROUTES.NETWORK"]).subscribe(
      (text) => {
        this.titleService.setTitle(text['ROUTES.NETWORK']["TEAM"]);
      }
    )

    this.network.getNetwork()
      .then((res: UserNetwork) => {

        this.rows = [{
          created_at: res.created_at,
          email: res.email,
          email_verified_at: res.email_verified_at,
          id: res.id,
          name: res.name,
          updated_at: res.updated_at,
          username: res.username,
          parentId: null,
          treeStatus: 'collapsed'
        }]
        this.rows = this.mountNetwork(res.network_down);
        this.cd.detectChanges();
        // console.log(this.rows);

      }, err => {
        this.events.publish('toast', err, 'Erro', 5000, 'toast-error')
      })
  }

  mountNetwork(network_down: Networkdown[]): UserNetwork[] {
    network_down.map((d: Networkdown) => {
      let user = d.user;
      if (typeof user.network_down !== 'undefined') {
        user.treeStatus = (user.network_down.length > 0) ? 'collapsed' : 'disabled';
      } else {
        user.treeStatus = 'disabled';
      }
      user.parentId = d.referencia_id;
      if (typeof user.network_down !== 'undefined') {
        if (user.network_down.length > 0) {
          this.mountNetwork(user.network_down)
        }
      }
      delete user.network_down;
      this.rows.push(user)
      return user;
    });

    return this.rows;
  }

  onTreeAction(event: any) {
    const index = event.rowIndex;
    const row = event.row;
    if (row.treeStatus === 'collapsed') {
      row.treeStatus = 'loading';
      row.treeStatus = 'expanded';
      let data: any[] = [];
      this.rows = [...this.rows, ...data];
      this.cd.detectChanges();
    } else {
      row.treeStatus = 'collapsed';
      this.rows = [...this.rows];
      this.cd.detectChanges();
    }
  }

  copyLink(text) {
    this.translateService.translate.get(["NETWORK.TEAM"]).subscribe(
      (text) => {
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = text;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this.events.publish('toast', text["NETWORK.TEAM"]["COPYLINK"]["MESSAGE"], null, null, null)
      }
    )
    
  }

}
