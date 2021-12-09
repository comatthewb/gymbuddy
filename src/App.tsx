import { Input } from "./reusable/Input";
import { useState } from "react";

type NewExercise ={
  exercise: string, 
  weight: string
};

const newExercise: NewExercise = {
  exercise: "", 
  weight: ""
};

export function App(){
  const [ exercise, setExercise ] = useState(newExercise);

  return (
  <>
    <h1> Gymrat</h1>
    <form>
      <Input value = {exercise.exercise} label = "Exercise" id = "exercise" type = "text"/>
      <Input value = {exercise.weight} label = "Weight" id = "weight" type = "number"/>
      <input type= "submit" value="Save Exercise"/>
    </form>
  </>
  );
};