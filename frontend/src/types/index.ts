export interface Subject {
    id: string;
    code: string;
    name: string;
    department: string;
    createdAt: string;
    updatedAt: string;
}

export interface Mark {
    id: string;
    score: number;
    term: string;
    year: number;
    studentId: string;
    subjectId: string;
    createdAt: string;
    updatedAt: string;
    subject?: Subject;
}

export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    class: string;
    age: number;
    createdAt: string;
    updatedAt: string;
    marks?: Mark[];
}
