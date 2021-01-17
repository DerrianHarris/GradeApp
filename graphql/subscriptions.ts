/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateSemester = /* GraphQL */ `
  subscription OnCreateSemester {
    onCreateSemester {
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
export const onUpdateSemester = /* GraphQL */ `
  subscription OnUpdateSemester {
    onUpdateSemester {
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
export const onDeleteSemester = /* GraphQL */ `
  subscription OnDeleteSemester {
    onDeleteSemester {
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
export const onCreateClass = /* GraphQL */ `
  subscription OnCreateClass {
    onCreateClass {
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
export const onUpdateClass = /* GraphQL */ `
  subscription OnUpdateClass {
    onUpdateClass {
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
export const onDeleteClass = /* GraphQL */ `
  subscription OnDeleteClass {
    onDeleteClass {
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
export const onCreateSection = /* GraphQL */ `
  subscription OnCreateSection {
    onCreateSection {
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
export const onUpdateSection = /* GraphQL */ `
  subscription OnUpdateSection {
    onUpdateSection {
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
export const onDeleteSection = /* GraphQL */ `
  subscription OnDeleteSection {
    onDeleteSection {
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
export const onCreateAssignment = /* GraphQL */ `
  subscription OnCreateAssignment {
    onCreateAssignment {
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
export const onUpdateAssignment = /* GraphQL */ `
  subscription OnUpdateAssignment {
    onUpdateAssignment {
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
export const onDeleteAssignment = /* GraphQL */ `
  subscription OnDeleteAssignment {
    onDeleteAssignment {
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
