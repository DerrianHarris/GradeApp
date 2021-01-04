import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Assignments {
  readonly id: string;
  readonly Name?: string;
  readonly Grade?: number;
  readonly Date?: string;
  readonly classesID: string;
  constructor(init: ModelInit<Assignments>);
  static copyOf(source: Assignments, mutator: (draft: MutableModel<Assignments>) => MutableModel<Assignments> | void): Assignments;
}

export declare class Classes {
  readonly id: string;
  readonly Name?: string;
  readonly Grade?: string;
  readonly semesterID: string;
  readonly Assignments?: (Assignments | null)[];
  constructor(init: ModelInit<Classes>);
  static copyOf(source: Classes, mutator: (draft: MutableModel<Classes>) => MutableModel<Classes> | void): Classes;
}

export declare class Semester {
  readonly id: string;
  readonly Name?: string;
  readonly StartDate?: string;
  readonly userID: string;
  readonly Classes?: (Classes | null)[];
  constructor(init: ModelInit<Semester>);
  static copyOf(source: Semester, mutator: (draft: MutableModel<Semester>) => MutableModel<Semester> | void): Semester;
}

export declare class User {
  readonly id: string;
  readonly Semesters?: (Semester | null)[];
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}