import { Input } from "./reusable/Input";

export function App(){
  return (<>
  <h1> Gymrat</h1>
  <form>
   
<Input label = "Exercise" id = "exercise" type = "text"/>
<Input label = "Weight" id = "weight" type = "number"/>
   
  </form>
  </>)
}