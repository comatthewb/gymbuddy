import { useState } from "react";

import { toast } from "react-toastify";
import { deleteExercise } from "./api/exerciseApi";
import { Exercise } from "./types";

type ExerciseProps = {
    exercises: Exercise[];
    setExercises: (exercises: Exercise[]) => void;
};

export function Exercises({ exercises, setExercises }: ExerciseProps) {
    const [error, setError] = useState<unknown>(null);
    return (
        <>
            <h1> Gymrat</h1>
            <h2> Exercises </h2>
            {exercises.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>Exercise</th>
                            <th>Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exercises.map((exercise) => {
                            return (
                                <tr key={exercise.id}>
                                    <td>{exercise.type} </td>
                                    <td>{exercise.weight}</td>
                                    <button
                                        onClick={async () => {
                                            try {
                                                await deleteExercise(exercise.id);
                                                setExercises(exercises.filter((e) => e.id !== exercise.id));
                                                toast.success("Exercise deleted.");
                                            } catch (error) {
                                                setError(error);
                                            }
                                        }}
                                        aria-label={`Delete ${exercise.type} with weight of ${exercise.weight}`}
                                    >
                                        Delete
                                    </button>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>No exercises exist.</p>
            )}
        </>
    );
}
