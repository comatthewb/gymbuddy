import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AddExercise } from "./AddExercise";
import { Exercises } from "./Exercises";
import Navbar from "./Navbar";
import { Exercise } from "./types";
import { getExercises } from "../src/api/exerciseApi";

export function App() {
    const [exercises, setExercises] = useState<Exercise[]>([]);

    useEffect(() => {
        async function fetchData() {
            const _exercises = await getExercises();
            setExercises(_exercises);
        }
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <br />
            <Routes>
                <Route path="/" element={<Exercises exercises={exercises} />} />
                <Route path="/add" element={<AddExercise exercises={exercises} setExercises={setExercises} />} />
                <Route path="*" element={<h1>Page not found</h1>} />
            </Routes>
        </>
    );
}
