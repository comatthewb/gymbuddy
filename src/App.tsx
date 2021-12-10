import { Input } from "./reusable/Input";
import { ChangeEvent, useState } from "react";

type NewExercise = {
    type: string;
    weight: string;
};

type Exercise = {
    id: number;
    type: string;
    weight: string;
};

const newExercise: NewExercise = {
    type: "",
    weight: "",
};

export function App() {
    const [exercise, setExercise] = useState(newExercise);
    const [exercises, setExercises] = useState<Exercise[]>([]);

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        setExercise({
            ...exercise,
            [event.target.id]: event.target.value,
        });
    }

    return (
        <>
            <h1> Gymrat</h1>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    setExercises([
                        ...exercises,
                        {
                            type: exercise.type,
                            weight: exercise.weight,
                            id: 1, //hardcoded until DB added
                        },
                    ]);
                }}
            >
                <Input value={exercise.type} onChange={onChange} label="Exercise" id="exercise" type="text" />
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
                            <tr key={exercise.type}>
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
