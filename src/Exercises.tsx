import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deleteExercise, getExercises } from "./api/exerciseApi";
import { Exercise } from "./types";
import { useUserContext } from "./UserContext";

type ExerciseProps = {
    exercises: Exercise[];
    // setExercises: (exercises: Exercise[]) => void;
};

export default function Exercises() {
    const { user } = useUserContext();
    const queryClient = useQueryClient();
    const exerciseQuery = useQuery<Exercise[]>(["exercises", user.id], () => getExercises(user.id));

    const [error, setError] = useState<unknown>(null);
    const exerciseDelete = useMutation(deleteExercise, {
        onSuccess: async (data, exerciseId) => {
            const existingExercises = queryClient.getQueryData(["exercises", user.id]) as Exercise[];
            queryClient.setQueryData(
                ["exercises", user.id],
                existingExercises.filter((e) => e.id !== exerciseId)
            );
        },
    });

    if (exerciseQuery.isLoading || !exerciseQuery.data) return <p>page is loading...</p>;

    return (
        <>
            <h1> Gymrat</h1>
            <h2> Exercises </h2>
            {exerciseQuery.isRefetching && <p> Checking for fresh data (you're seeing cached data rn</p>}
            {exerciseQuery.data!.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>Exercise</th>
                            <th>Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exerciseQuery.data!.map((exercise) => {
                            return (
                                <tr key={exercise.id}>
                                    <td>{exercise.type} </td>
                                    <td>{exercise.weight}</td>
                                    <button
                                        onClick={async (e) => {
                                            try {
                                                // await deleteExercise(exercise.id);
                                                // setExercises(exercises.filter((e) => e.id !== exercise.id));
                                                exerciseDelete.mutate(exercise.id);
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
