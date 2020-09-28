import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { TreeviewComponent, TreeviewConfig, TreeviewHelper, TreeviewItem } from 'ngx-treeview';
import { remove } from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: TreeviewItem[] = [];
  Items;
  selectedItem;
  deleteEvent = false;
  editChamp = false;

  @Input() config: TreeviewConfig;
  @ViewChild(TreeviewComponent) treeviewComponent: TreeviewComponent;

  constructor() {
    this.config = TreeviewConfig.create({
      hasAllCheckBox: false,
      hasCollapseExpand: false,
      hasFilter: true,
      maxHeight: 500
    });
  }

  ngOnInit() {
    this.items = this.getProducts();
  }

  getProducts(): TreeviewItem[] {
    this.Items = new TreeviewItem({
      text: 'Item One', value: 0, children: [
        {
          text: 'Item Two', value: 1
        }
      ]
    });
    this.selectedItem = this.Items.text;
    return [this.Items];
  }

  removeItem(item: TreeviewItem): void {
    for (const tmpItem of this.items) {
      if (tmpItem === item) {
        remove(this.items, item);
      } else {
        if (TreeviewHelper.removeItem(tmpItem, item)) {
          break;
        }
      }
    }

    this.treeviewComponent.raiseSelectedChange();
    this.deleteEvent = false;
  }

  onSelect(item) {
    this.selectedItem = item.text;

    if (item.value === 0) {
      this.deleteEvent = false;
      this.editChamp = true;
    } else if (item.value === 1) {
      this.deleteEvent = true;
      this.editChamp = false;
    }
  }

}
