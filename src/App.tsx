import { Input } from "./reusable/Input";
import { ChangeEvent, FormEvent, useState, FocusEvent } from "react";

type NewExercise = {
    type: string;
    weight: string;
};

const newExercise: NewExercise = {
    type: "",
    weight: "",
};

type Exercise = NewExercise & {
    id: number;
};

type Errors = Partial<NewExercise>;

type Touched = {
    type?: boolean;
    weight?: boolean;
};

type Status = "Idle" | "Submitted";

export function App() {
    const [exercise, setExercise] = useState(newExercise);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [status, setStatus] = useState<Status>("Idle");
    const [touched, setTouched] = useState<Touched>({});

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
        setStatus("Submitted");
        if (!formIsValid) return;
        setExercises([
            ...exercises,
            {
                type: exercise.type,
                weight: exercise.weight,
                id: 1, //hardcoded until DB added
            },
        ]);
        setExercise(newExercise);
    }

    function validate() {
        const errors: Errors = {};
        if (!exercise.type && (touched.type || status === "Submitted")) {
            errors.type = "Please enter a name for the exercise.";
        }
        if (!exercise.weight && (touched.weight || status === "Submitted")) {
            errors.weight = "Please enter a weight for the exercise.";
        }
        return errors;
    }

    function onBlur(event: FocusEvent<HTMLInputElement>) {
        setTouched({ ...touched, [event.target.id]: true });
    }

    return (
        <>
            <h1> Gymrat</h1>
            <form
                onSubmit={(event) => {
                    handleSubmit(event);
                }}
            >
                <Input
                    onBlur={onBlur}
                    error={errors.type}
                    value={exercise.type}
                    onChange={onChange}
                    label="Exercise"
                    id="type"
                    type="text"
                />

                <Input
                    onBlur={onBlur}
                    error={errors.weight}
                    value={exercise.weight}
                    onChange={onChange}
                    label="Weight"
                    id="weight"
                    type="number"
                />
                <input type="submit" value="Save Exercise" />
            </form>
            <h2> Exercises </h2>
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
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
