import { Component, OnInit } from '@angular/core';
import { Package } from 'src/app/interfaces/package';
import { PackagesService } from 'src/app/services/packages.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
})
export class PackagesComponent implements OnInit {
  packages: Package[] = [];

  constructor(private packagesService: PackagesService) {}

  ngOnInit(): void {
    this.getPackages();
  }

  private getPackages(): void {
    this.packagesService
      .getPackages()
      .subscribe(data => (this.packages = data.items || []));
  }
}
