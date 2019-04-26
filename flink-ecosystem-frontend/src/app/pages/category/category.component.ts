import { Component, OnInit, OnDestroy } from '@angular/core';
import { PackagesService } from 'src/app/services/packages.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Package } from 'src/app/interfaces/package';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  packages: Package[] = [];
  category: string = '';

  constructor(
    private packagesService: PackagesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ category }) => {
        this.getCategoryPackages(category);
        this.category = category;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getCategoryPackages(category: string): void {
    this.packagesService
      .getCategoryPackages(category)
      .subscribe(data => (this.packages = data.items || []));
  }
}
