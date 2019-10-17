import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NetworkService } from 'src/app/services/network/network.service';
import { UserNetwork, Networkdown } from 'src/app/models/Network';
import { Events } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  ColumnMode = ColumnMode;
  rows: UserNetwork[] = [];

  constructor(
    private network: NetworkService,
    public events: Events,
    public ngxService: NgxUiLoaderService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
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
        console.log(this.rows);

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

}
