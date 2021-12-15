import { useState } from "react";
import { Input } from "./reusable/Input";
import { Exercise, FormStatus } from "./types";
import { NewExercise } from "./types";
import { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import { addExercise } from "../src/api/exerciseApi";
import { toast } from "react-toastify";

type Errors = Partial<NewExercise>;

type AddExerciseProps = {
    exercises: Exercise[];
    setExercises: (exercises: Exercise[]) => void;
};

export const newExercise: NewExercise = {
    type: "",
    weight: "",
    userId: 1, // hardcoded
};

export function AddExercise({ exercises, setExercises }: AddExerciseProps) {
    const [exercise, setExercise] = useState(newExercise);
    const [status, setStatus] = useState<FormStatus>("Idle");
    const navigate = useNavigate();

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
        const savedExercise = await addExercise({
            type: exercise.type,
            weight: exercise.weight,
            userId: 1 /**  hardcoded */,
        });
        setExercises([...exercises, savedExercise]);
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
