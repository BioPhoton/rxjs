

export type TimeLineTypeDeprecation =  'deprecation';
export type TimeLineTypeBreakingChange =  'breakingChange';
export type TimeLineTypes =  TimeLineTypeDeprecation | TimeLineTypeBreakingChange

export interface Deprecation {
  // Link to line of code in GitHub in version it got introduced
  sourceLink: string;
  /*
  # LinkName
  Pattern: deprecation-<type>-<type-name>-<action-name>
  - type: class, interface, operator, static, constant, enum
  - type-name: TestScheduler, of, NEVER, switchMap
  - action-name: to-constant, to string-literal, internal
  Examples:
  - deprecation-class-TestScheduler-index-to-private
  - deprecation-operator-switchMap-resultSelector-to-map-operator
 */
  linkName: string;
  type: TimeLineTypeDeprecation;
  // semver n.n.n-s.n,
  breakingVersion: string;
  /*
  see Deprecation.linkName
  */
  breakingLink: string;
  headline: string;
  reason: string;
  implication: string;
  /*
  # exampleBefore
  Pattern:
  <imports>
  <code>
  Example:
  import {empty} from 'rxjs';
  empty();
  */
  exampleBefore: string;
  /*
  # exampleAfter
  Pattern:
  <imports>
  <code>
  Example:
  import {EMPTY} from 'rxjs';
  EMPTY;
  */
  exampleAfter: string;
}

export interface BreakingChange {
  /*
 # LinkName
 Pattern: breakingChange-<type>-<type-name>-<action-name>
 - type: class, interface, operator, static, constant, enum
 - type-name: TestScheduler, of, NEVER, switchMap
 - action-name: to-constant, to string-literal, internal
 Examples:
 - breakingChange-operator-last-resultSelector-removed
 - breakingChange-enum-NotificationKind-removed
*/
  linkName: string;
  type: TimeLineTypeBreakingChange;
  // semver n.n.n.s-n,
  deprecationVersion: string;
  /*
  see Deprecation.linkName
  */
  deprecationLink: string;
  headline: string;
}

export interface Release {
  // semver n.n.n.s-n,
  version: string,
  // YYYY-MM-DD
  date: string;
  deprecations: Deprecation[];
  breakingChanges: BreakingChange[];
}
