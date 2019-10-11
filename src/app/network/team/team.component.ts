import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig, TreeItem } from 'ngx-treeview/src/';
import { NetworkService } from 'src/app/services/network/network.service';
import { UserNetwork, Networkdown } from 'src/app/models/Network';
import { Events } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 400,
  });
  items: TreeviewItem[] = [];

  constructor(private network: NetworkService,public events:Events,public ngxService:NgxUiLoaderService) { }

  ngOnInit() {
    this.network.getNetwork().then((res) => {      
         this.items.push(new TreeviewItem(this.mountNetwork(res)));
    }, err => {
       this.events.publish('toast', err, 'Erro', 5000, 'toast-error')
    })
  }

  mountNetwork(params: UserNetwork): TreeItem {
    let tree: TreeItem = {
        value: params.id,
        text: params.name,
        collapsed:true,
        disabled:true,
        children: []
    };

    if (params) {
      params.network_down.forEach((networkdown: Networkdown) => {
        let result = this.mountNetwork(networkdown.user);
        if (result) {
          tree.children.push(result);
        }
      })
    }
    return tree;
  }

}
