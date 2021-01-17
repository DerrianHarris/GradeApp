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
      createdAt
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
      createdAt
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
      createdAt
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
      sections {
        items {
          id
          userId
          classId
          name
          createdAt
          gradeScale
          updatedAt
        }
        nextToken
      }
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
      sections {
        items {
          id
          userId
          classId
          name
          createdAt
          gradeScale
          updatedAt
        }
        nextToken
      }
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
      sections {
        items {
          id
          userId
          classId
          name
          createdAt
          gradeScale
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const createSection = /* GraphQL */ `
  mutation CreateSection(
    $input: CreateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    createSection(input: $input, condition: $condition) {
      id
      userId
      classId
      name
      createdAt
      gradeScale
      assignments {
        items {
          id
          userId
          sectionId
          name
          createdAt
          gainedPoints
          possiblePoints
          completed
          dueDate
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const updateSection = /* GraphQL */ `
  mutation UpdateSection(
    $input: UpdateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    updateSection(input: $input, condition: $condition) {
      id
      userId
      classId
      name
      createdAt
      gradeScale
      assignments {
        items {
          id
          userId
          sectionId
          name
          createdAt
          gainedPoints
          possiblePoints
          completed
          dueDate
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const deleteSection = /* GraphQL */ `
  mutation DeleteSection(
    $input: DeleteSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    deleteSection(input: $input, condition: $condition) {
      id
      userId
      classId
      name
      createdAt
      gradeScale
      assignments {
        items {
          id
          userId
          sectionId
          name
          createdAt
          gainedPoints
          possiblePoints
          completed
          dueDate
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const createAssignment = /* GraphQL */ `
  mutation CreateAssignment(
    $input: CreateAssignmentInput!
    $condition: ModelAssignmentConditionInput
  ) {
    createAssignment(input: $input, condition: $condition) {
      id
      userId
      sectionId
      name
      createdAt
      gainedPoints
      possiblePoints
      completed
      dueDate
      updatedAt
    }
  }
`;
export const updateAssignment = /* GraphQL */ `
  mutation UpdateAssignment(
    $input: UpdateAssignmentInput!
    $condition: ModelAssignmentConditionInput
  ) {
    updateAssignment(input: $input, condition: $condition) {
      id
      userId
      sectionId
      name
      createdAt
      gainedPoints
      possiblePoints
      completed
      dueDate
      updatedAt
    }
  }
`;
export const deleteAssignment = /* GraphQL */ `
  mutation DeleteAssignment(
    $input: DeleteAssignmentInput!
    $condition: ModelAssignmentConditionInput
  ) {
    deleteAssignment(input: $input, condition: $condition) {
      id
      userId
      sectionId
      name
      createdAt
      gainedPoints
      possiblePoints
      completed
      dueDate
      updatedAt
    }
  }
`;
