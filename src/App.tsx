import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AddExercise } from "./AddExercise";
import { Exercises } from "./Exercises";
import Navbar from "./Navbar";
import { Exercise } from "./types";
import { getExercises } from "../src/api/exerciseApi";
import { ErrorBoundary } from "react-error-boundary";
import React from "react";

// Lazy load so these are only loaded in local development
const DevTools = React.lazy(() => import("./DevTools"));

export function App() {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const _exercises = await getExercises();
                setExercises(_exercises);
                setLoadingStatus(false);
            } catch (error) {
                setError(error);
            }
        }
        fetchData();
    }, []);

    if (error) throw error;

    return (
        <>
            {process.env.REACT_APP_SHOW_DEV_TOOLS === "Y" && <DevTools />}
            <Navbar />
            {loadingStatus ? (
                "page is loading..."
            ) : (
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ErrorBoundary
                                fallbackRender={() => {
                                    return <p> Sorry, exercises is currently down</p>;
                                }}
                            >
                                <Exercises exercises={exercises} setExercises={setExercises} />
                            </ErrorBoundary>
                        }
                    />
                    <Route path="/add" element={<AddExercise exercises={exercises} setExercises={setExercises} />} />
                    <Route path="*" element={<h1>Page not found</h1>} />
                </Routes>
            )}
        </>
    );
}
