import { Input } from "./reusable/Input";
import { ChangeEvent, FormEvent, useState } from "react";

type NewExercise = {
    type: string;
    weight: string;
};

type Exercise = {
    id: number;
    exercise: string;
    weight: string;
};

type Errors = {
    type?: string;
    weight?: string;
};

const newExercise: NewExercise = {
    type: "",
    weight: "",
};

export function App() {
    const [exercise, setExercise] = useState(newExercise);
    const [exercises, setExercises] = useState<Exercise[]>([]);

    //Derived state
    const errors = validate();
    const formIsValid = Object.keys(errors).length === 0;

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        setExercise({
            ...exercise,
            [event.target.id]: event.target.value,
        });
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setExercises([
            ...exercises,
            {
                exercise: exercise.type,
                weight: exercise.weight,
                id: 1, //hardcoded until DB added
            },
        ]);
        setExercise(newExercise);
    }

    function validate() {
        const errors: Errors = {};
        if (!exercise.type) errors.type = "Please enter a name for the exercise.";
        if (!exercise.weight) errors.weight = "Please enter a weight for the exercise.";
        return errors;
    }

    return (
        <>
            <h1> Gymrat</h1>
            <form
                onSubmit={(event) => {
                    handleSubmit(event);
                }}
            >
                <Input value={exercise.type} onChange={onChange} label="Exercise" id="type" type="text" />
                <Input value={exercise.weight} onChange={onChange} label="Weight" id="weight" type="number" />
                <input type="submit" value="Save Exercise" />
            </form>
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
                            <tr key={exercise.exercise}>
                                <td>{exercise.exercise} </td>
                                <td>{exercise.weight}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
