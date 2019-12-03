/*
@Interface SemVerObj
description: semver as object
  type: string
*/
  export interface SemVerObj {
  major: number,
  minor: number,
  patch: number,
  subVersionName?: string,
  subVersion?: number
}

/*
@type semVerString
description: Any valid semver string from only major [n] to very specific [n.n.n.s-n]. What version is effected?
type: string
Examples:
     - 1
     - 1.1
     - 1.1.1
     - 1.1.1-alpha.1
*/
export type semVerString = string;

/*
@Interface MigrationReleaseUIDFields

@field version
description: semver string of release version
type: semVerString
*/
export interface MigrationReleaseUIDFields {
  version: semVerString;
}

/*
@enum ApiSymbols
description: string specifying a specific piece of typescript code
This information is a subset from the information from the [API explorer](https://rxjs.dev/api)
*/
export enum ApiSymbols {
  all = 'all',
  argument = 'argument',
  class = 'class',
  interface = 'interface',
  function = 'function',
  enum = 'enum',
  const = 'enum',
  let = 'let',
  var = 'var',
  typeAlias = 'type-alias',
}

/*
@type TimeLineTypeDeprecation
*/
export type MigrationTimeTypeDeprecation = 'deprecation';
/*
@type TimeLineTypeBreakingChange
*/
export type MigrationTimeTypeBreakingChange = 'breakingChange';
/*
@type TimeLineTypes
*/
export type MigrationTimeTypes = MigrationTimeTypeDeprecation | MigrationTimeTypeBreakingChange

/*
@Interface MigrationItemUIDFields

@field itemType
description: type of MigrationItem
type: TimeLineTypes

@field subject
description: subject of migration. What piece is effected?
type: string
Examples:
- TestScheduler
- of
- NEVER
- switchMap

@field subjectApiSymbol
description: type of ApiSymbols
type: ApiSymbols

@field subjectAction
description: action on subject.
dash "-" separated string
- What happened to the subject?
- What attribute of the piece is effected?
type: string
Examples for deprecations:
- deprecated
- argument-resultSelector
- property-frameTimeFactor
- property-access-specifier-(private|public|readonly)-changed
- multiple-arguments
Examples for breakingChanges:
- removed
- moved
- to-private
- argument-resultSelector-removed
- property-frameTimeFactor-moved
- property-hotObservables-to-private
*/
export interface MigrationItemSubjectUIDFields {
  itemType: MigrationTimeTypes;
  subject: string;
  subjectApiSymbol: ApiSymbols;
  subjectAction: string;
}

/*
MigrationItemUIDFields
description: Summarizes all information needed to generate the UID for a `MigrationItem`
*/
export interface MigrationItemUIDFields extends MigrationReleaseUIDFields, MigrationItemSubjectUIDFields {
}

/*
@type MigrationItem
*/
export type MigrationItem = Deprecation | BreakingChange;

/*
@Interface Deprecation

@field itemType
description: Override of `MigrationItemUIDFields` property `itemType` to MigrationTimeTypeDeprecation
type: TimeLineTypeDeprecation
Example:
- deprecation

@field sourceLink
description: Link to line of code in GitHub in version it got introduced.
The link should target the tag where the deprecation got introduced and point to the exact line of code.
type: string
Example:
https://github.com/ReactiveX/rxjs/blob/6.0.0-tactical-rc.1/src/internal/Scheduler.ts#L20

@field breakingVersion
description: semver string of breaking version
type: semVerString

@field breakingSubjectAction
description: subjectAction of related `BreakingChange` item
type: string
Example:

@field deprecationMsgCode
description: The <HumanReadableShortMessage> part from the code placed next to `@deprecated` section without the link.
The Pattern for the text in the source code is: <HumanReadableShortMessage> - see <LinkToDeprecationPage>
type: string

@field reason
description: Reason of the deprecation
type: string

@field implication
description: This section is an explanation that accompanies the 'before deprecation' and 'after deprecation' snippets.
It explains the different between the two versions to the user
in a detailed way to help the user to spot the differences in code.
type: string

@field exampleBefore
description: Code example showing the situation before the deprecation
type: string
Pattern:
  <imports>
  <code>
Example:
  import {empty} from 'rxjs';
  empty();

@field exampleAfter
description: Code example showing the situation before the deprecation
type: string
Pattern:
  <imports>
  <code>
Example:
  import {EMPTY} from 'rxjs';
  EMPTY;
*/
export interface Deprecation extends MigrationItemSubjectUIDFields {
  itemType: MigrationTimeTypeDeprecation;
  sourceLink: string;
  breakingVersion: semVerString;
  breakingSubjectAction: string;
  deprecationMsgCode: string;
  reason: string;
  implication: string;
  // @TODO How to handle dependencies to other libs in stackblitz?
  exampleBefore: string;
  // @TODO How to handle dependencies to other libs in stackblitz?
  exampleAfter: string;
}

/*
@Interface BreakingChange

@field itemType
description: Override of `MigrationItemUIDFields` property `itemType` to MigrationTimeTypeBreakingChange
type: MigrationTimeTypeBreakingChange
Example:
- breakingChange

@field deprecationVersion
description: semver string of release where deprecation got introduced
type: semVerString

@field deprecationSubjectAction
description: subjectAction of related `Deprecation` item
type: string

@field: breakingChangeMsg
description: A message that explains what exactly is breaking
type: string
Example: Class `TestScheduler` changed property `coldObservables` to private
 */
export interface BreakingChange extends MigrationItemSubjectUIDFields {
  itemType: MigrationTimeTypeBreakingChange;
  deprecationVersion: semVerString;
  deprecationSubjectAction: string;
  breakingChangeMsg: string;
}

/*
@Interface MigrationRelease

@field date
description: Any valid UTC string.
- When did the releases happen?
- When will the release most probably happen?
type: string
Examples:
- YYYY
- YYYY-MM
- YYYY-MM-DD

@field deprecations
description: A list of Deprecation items
type: Deprecation[]

@field breakingChanges
type: BreakingChange[]
description: A list of BreakingChange items
*/
export interface MigrationReleaseItem extends MigrationReleaseUIDFields {
  date: string;
  deprecations: Deprecation[];
  breakingChanges: BreakingChange[];
}
