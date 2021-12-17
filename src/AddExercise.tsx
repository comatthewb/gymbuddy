import { useState } from "react";
import { Input } from "./reusable/Input";
import { Exercise, FormStatus, NewExercise } from "./types";
import { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import { addExercise } from "../src/api/exerciseApi";
import { toast } from "react-toastify";
import { useUserContext } from "./UserContext";
import { useMutation, useQueryClient } from "react-query";

type Errors = Partial<NewExercise>;

type AddExerciseProps = {
    // setExercises: (exercises: Exercise[]) => void;
};

function getNewExercise(userId: number) {
    const newExercise: NewExercise = {
        type: "",
        weight: "",
        userId: userId, // hardcoded
    };
    return newExercise;
}

export default function AddExercise() {
    const queryClient = useQueryClient();
    const { user } = useUserContext();
    const [status, setStatus] = useState<FormStatus>("Idle");
    const [exercise, setExercise] = useState(getNewExercise(user.id));
    const navigate = useNavigate();
    const exerciseMutation = useMutation(addExercise, {
        onSuccess: async (newExercise) => {
            const existingExercises = queryClient.getQueryData(["exercises", user.id]) as Exercise[];
            queryClient.setQueryData(["exercises", user.id], [...existingExercises, newExercise]);
        },
    });

    function validate() {
        const errors: Errors = {};
        if (!exercise.type) {
            errors.type = "Please enter a name for the exercise.";
        }
        if (!exercise.weight) {
            errors.weight = "Please enter a weight for the exercise.";
        }
        return errors;
    }

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        setExercise({
            ...exercise,
            [event.target.id]: event.target.value,
        });
    }
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus("Submitted");
        if (!formIsValid) return;
        exerciseMutation.mutate(exercise);
        toast.success("Exercise added.");
        navigate("/");
    }

    const errors = validate();
    const formIsValid = Object.keys(errors).length === 0;

    return (
        <form
            onSubmit={(event) => {
                handleSubmit(event);
            }}
        >
            <Input
                error={errors.type}
                value={exercise.type}
                onChange={onChange}
                label="Exercise"
                id="type"
                type="text"
                FormStatus={status}
            />

            <Input
                error={errors.weight}
                value={exercise.weight}
                onChange={onChange}
                label="Weight"
                id="weight"
                type="number"
                FormStatus={status}
            />
            <input type="submit" value="Save Exercise" />
        </form>
    );
}
