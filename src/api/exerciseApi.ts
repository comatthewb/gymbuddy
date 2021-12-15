import { Exercise, NewExercise } from "../types";

export async function addExercise(exercise: NewExercise) {
    const resp = await fetch("http://localhost:3001/exercises", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(exercise),
    });
    if (!resp.ok) throw resp;
    const savedExercise = (await resp.json()) as Exercise;
    return savedExercise;
}

export async function deleteExercise(id: Number) {
    const resp = await fetch("http://localhost:3001/exercises/" + id, {
        method: "DELETE",
    });
    if (!resp.ok) throw resp;
    return true;
}

export async function getExercises(userId: number) {
    const resp = await fetch(`http://localhost:3001/exercises?userId=${userId}`);
    if (!resp.ok) throw resp;
    const savedExercises = (await resp.json()) as Exercise[];
    return savedExercises;
}
