import {Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';
import {ClientBreakingChange} from '../../data-access/migration-timeline.interface';
import {LocalState} from '../../utils/local-state.service';

interface VMBreakingChangeDescriptionTable {
  breakingChange: ClientBreakingChange;
}

@Component({
  selector: `breaking-change-description-table`,
  template: `
    <table *ngIf="vm$ | async as vm">
      <thead>
      <tr>
        <th class="subject">
          <span class="symbol" [ngClass]="vm.breakingChange.subjectApiSymbol"></span>
          <code>{{vm.breakingChange.subject}}</code>
        </th>
        <th>
          Deprecated in version
          <a class="release-link"
            (click)="migrationItemUidSelectRequest.next(vm.breakingChange.opponentMigrationItemUID)">
            v{{vm.breakingChange.deprecationVersion}}
          </a>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <b>Refactoring</b>
        </td>
        <td>
          <p>
            For refactoring suggestions please visit the version of deprecation:
            (click)="migrationItemUidSelectRequest.next(vm.breakingChange.opponentMigrationItemUID)
            <a class="release-link">v{{vm.breakingChange.deprecationVersion}}</a>
          </p>
        </td>
      </tr>
      </tbody>
    </table>
  `
})
export class BreakingChangeDescriptionTableComponent extends LocalState<VMBreakingChangeDescriptionTable> {
  vm$ = this.select();

  migrationItemUidSelectRequest = new Subject<string>();
  @Output()
  selectedMigrationItemUidChange = this.migrationItemUidSelectRequest
    .pipe(distinctUntilChanged());

  @Input()
  set breakingChange(breakingChange: ClientBreakingChange) {
    if (breakingChange) {
      this.setSlice({breakingChange});
    }
  }

}


