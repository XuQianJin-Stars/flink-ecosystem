import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Package } from 'src/app/interfaces/package';
import { PackagesService } from 'src/app/services/packages.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
})
export class PackagesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  packages: Package[] = [];
  title = 'Most Popular Packages';

  constructor(
    private packagesService: PackagesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.route.params
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(({ category }) => {
    //     ;
    //     this.title = !!category
    //       ? `Packages tagged with "${category}"`
    //       : this.defaultTitle;
    //   });
    this.getPackages();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getPackages(): void {
    this.packagesService
      .getPackages()
      .subscribe(data => (this.packages = data.items || []));
  }
}
