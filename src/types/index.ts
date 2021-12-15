export type FormStatus = "Idle" | "Submitted";

export type Exercise = NewExercise & {
    id: number;
};

export type NewExercise = {
    type: string;
    weight: string;
    userId: number;
};

export type User = {
    id: number;
    email: string;
    password: string;
};
