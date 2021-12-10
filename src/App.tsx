import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AddExercise } from "./AddExercise";
import { Exercises } from "./Exercises";
import Navbar from "./Navbar";
import { Exercise } from "./types";

export function App() {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    return (
        <>
            <Navbar />
            <br />
            <Routes>
                <Route path="/" element={<Exercises exercises={exercises} />} />
                <Route path="/add" element={<AddExercise exercises={exercises} setExercises={setExercises} />} />
            </Routes>
        </>
    );
}
