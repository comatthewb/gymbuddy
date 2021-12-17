import { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AddExercise } from "./AddExercise";
import { Exercises } from "./Exercises";
import Navbar from "./Navbar";
import { Exercise, User } from "./types";
import { getExercises } from "../src/api/exerciseApi";
import { ErrorBoundary } from "react-error-boundary";
import React from "react";
import { UserContextProvider } from "./UserContext";
import { useQuery } from "react-query";

// Lazy load so these are only loaded in local development
const DevTools = React.lazy(() => import("./DevTools"));

const defaultUser: User = {
    id: 1,
    email: "2-exercises@gmail.com",
    password: "1",
};

export function App() {
    const [user, setUser] = useState<User>(defaultUser);

    // const [exercises, setExercises] = useState<Exercise[]>([]);
    // const [loadingStatus, setLoadingStatus] = useState(true);
    // const [error, setError] = useState<unknown>(null);

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             if (!user?.id) return; // If no user is logged in, don't fetch exercises
    //             const _exercises = await getExercises(user.id);
    //             setExercises(_exercises);
    //             setLoadingStatus(false);
    //         } catch (error) {
    //             setError(error);
    //         }
    //     }
    //     fetchData();
    // }, [user?.id]);

    return (
        <UserContextProvider user={user} setUser={setUser}>
            {process.env.REACT_APP_SHOW_DEV_TOOLS === "Y" && (
                <Suspense fallback={<></>}>
                    <DevTools />
                </Suspense>
            )}
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <ErrorBoundary
                            fallbackRender={() => {
                                return <p> Sorry, exercises is currently down</p>;
                            }}
                        >
                            <Exercises />
                        </ErrorBoundary>
                    }
                />
                <Route path="/add" element={<AddExercise />} />
                <Route path="*" element={<h1>Page not found</h1>} />
            </Routes>
        </UserContextProvider>
    );
}
