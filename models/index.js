// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Assignments, Classes, Semester, User } = initSchema(schema);

export {
  Assignments,
  Classes,
  Semester,
  User
};