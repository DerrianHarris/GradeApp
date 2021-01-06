/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      email
      semesters {
        items {
          id
          userId
          name
          createdAt
          gpaScale
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      email
      semesters {
        items {
          id
          userId
          name
          createdAt
          gpaScale
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      email
      semesters {
        items {
          id
          userId
          name
          createdAt
          gpaScale
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createSemester = /* GraphQL */ `
  mutation CreateSemester(
    $input: CreateSemesterInput!
    $condition: ModelSemesterConditionInput
  ) {
    createSemester(input: $input, condition: $condition) {
      id
      userId
      name
      createdAt
      gpaScale
      classes {
        items {
          id
          userId
          semesterId
          name
          createdAt
          gradingScale
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const updateSemester = /* GraphQL */ `
  mutation UpdateSemester(
    $input: UpdateSemesterInput!
    $condition: ModelSemesterConditionInput
  ) {
    updateSemester(input: $input, condition: $condition) {
      id
      userId
      name
      createdAt
      gpaScale
      classes {
        items {
          id
          userId
          semesterId
          name
          createdAt
          gradingScale
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const deleteSemester = /* GraphQL */ `
  mutation DeleteSemester(
    $input: DeleteSemesterInput!
    $condition: ModelSemesterConditionInput
  ) {
    deleteSemester(input: $input, condition: $condition) {
      id
      userId
      name
      createdAt
      gpaScale
      classes {
        items {
          id
          userId
          semesterId
          name
          createdAt
          gradingScale
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const createClass = /* GraphQL */ `
  mutation CreateClass(
    $input: CreateClassInput!
    $condition: ModelClassConditionInput
  ) {
    createClass(input: $input, condition: $condition) {
      id
      userId
      semesterId
      name
      createdAt
      gradingScale
      updatedAt
    }
  }
`;
export const updateClass = /* GraphQL */ `
  mutation UpdateClass(
    $input: UpdateClassInput!
    $condition: ModelClassConditionInput
  ) {
    updateClass(input: $input, condition: $condition) {
      id
      userId
      semesterId
      name
      createdAt
      gradingScale
      updatedAt
    }
  }
`;
export const deleteClass = /* GraphQL */ `
  mutation DeleteClass(
    $input: DeleteClassInput!
    $condition: ModelClassConditionInput
  ) {
    deleteClass(input: $input, condition: $condition) {
      id
      userId
      semesterId
      name
      createdAt
      gradingScale
      updatedAt
    }
  }
`;
