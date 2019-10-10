import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig, TreeItem } from 'ngx-treeview/src/';
import { NetworkService } from 'src/app/services/network/network.service';
import { UserNetwork, Networkdown } from 'src/app/models/Network';

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
    maxHeight: 400
  });
  items: TreeviewItem[] = [];

  constructor(private network: NetworkService) { }

  ngOnInit() {
    this.network.getNetwork().then((res) => {
      console.log(this.mountNetwork(res));
      
      this.items.push(new TreeviewItem(this.mountNetwork(res)));
    }, err => {
      console.log(err);

    })
  }

  mountNetwork(params: UserNetwork): TreeItem {
    let tree: TreeItem = {
        value: params.id,
        text: params.name,
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
