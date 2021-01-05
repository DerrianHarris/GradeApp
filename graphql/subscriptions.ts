/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateSemester = /* GraphQL */ `
  subscription OnCreateSemester {
    onCreateSemester {
      id
      userId
      name
      createdAt
      gpaScale
      updatedAt
    }
  }
`;
export const onUpdateSemester = /* GraphQL */ `
  subscription OnUpdateSemester {
    onUpdateSemester {
      id
      userId
      name
      createdAt
      gpaScale
      updatedAt
    }
  }
`;
export const onDeleteSemester = /* GraphQL */ `
  subscription OnDeleteSemester {
    onDeleteSemester {
      id
      userId
      name
      createdAt
      gpaScale
      updatedAt
    }
  }
`;
