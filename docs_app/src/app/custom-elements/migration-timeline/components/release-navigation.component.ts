import {ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {Release} from '../data-access';
import {State} from '../../../shared/state.service';

export interface MigrationTimelineNavigationItem {
  date: Date;
  versionNumber: number
  version: string;
  officialRelease: boolean
}

export interface MigrationTimelineNavigationComponentModel {
  releaseNavigationList: MigrationTimelineNavigationItem[];
  selectedMigrationReleaseUID: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rxjs-release-navigation',
  template: `
    <div class="flex-center group-buttons migration-timeline-navigation"
      *ngIf="baseModel$ | async as vm">
      <mat-chip-list>
        <span
          *ngFor="let option of vm.releaseNavigationList; trackBy:trackByVersion"
          (click)="selectedMigrationReleaseUIDChange.next(option.version);"
          class="mat-chip mat-primary mat-standard-chip navigation-item"
          [ngClass]="{
          selected:vm.selectedMigrationReleaseUID === option.version,
          'is-official': !option.officialRelease
          }">
          {{option.version}}
        </span>
      </mat-chip-list>
    </div>
  `,
  styles: [],
  providers: [State],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReleaseNavigationComponent {

  baseModel$ = this._baseModel.select();

  @Input()
  set selectedMigrationReleaseUID(selectedMigrationReleaseUID: string) {
    if (selectedMigrationReleaseUID) {
      this._baseModel.set({selectedMigrationReleaseUID});
    }
  }

  @Input()
  set releaseList(releaseList: Release[]) {
    if (releaseList) {
      const releaseNavigationList: MigrationTimelineNavigationItem[] = this.parseVmReleaseNavigation(releaseList);
      this._baseModel.set({releaseNavigationList});
    }
  }

  @Output()
  selectedMigrationReleaseUIDChange = new Subject<string>();

  constructor(private _baseModel: State<MigrationTimelineNavigationComponentModel>) {

  }

  trackByVersion(i: MigrationTimelineNavigationItem): number {
    return i.versionNumber;
  };

  private parseVmReleaseNavigation(releases: Release[]): MigrationTimelineNavigationItem[] {
    return releases.reduce((res, release): MigrationTimelineNavigationItem[] => {
      const {deprecations, breakingChanges, ...navigationItem} = release;
      return res.concat([navigationItem]);
    }, [] as MigrationTimelineNavigationItem[]);
  }

}
