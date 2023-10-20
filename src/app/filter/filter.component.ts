import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent  implements OnInit{

  @Output()category =new EventEmitter<String>();
  private storeServices =inject(StoreService);

categories$:Observable<string[]> | undefined;

ngOnInit(): void {
 
  this.categories$ = this.storeServices.getAllCategories();
}

onShowCategorey(category: string) {
  this.category.emit(category);
  }

}
