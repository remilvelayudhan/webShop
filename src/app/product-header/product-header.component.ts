import { Component, EventEmitter, Output } from '@angular/core';
import { itemCount, sortBy } from '../helper/helper.enum';

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.scss']
})
export class ProductHeaderComponent {

   sort =sortBy;
   count=itemCount;
   currentSortOrder:sortBy = sortBy.asc;
   currentItemCount:itemCount=itemCount.count12;
   currentColumnCount:number=1;

   @Output() columnsCountChange = new EventEmitter<number>();
   @Output() itemsCountChange = new EventEmitter<number>();
   @Output() sortChange = new EventEmitter<sortBy>();

  onSortBy(sort:sortBy):void {
    this.currentSortOrder = sort;
    this.sortChange.emit(this.currentSortOrder);
  }

  onItemsCountUpdated(count: itemCount) {
    this.currentItemCount = count;
    this.itemsCountChange.emit(this.currentItemCount);  
    }

    onColumnsUpdated(count: number) {
      this.currentColumnCount=count;
      this.columnsCountChange.emit(this.currentColumnCount);
      }
      
}
