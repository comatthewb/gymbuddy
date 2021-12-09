export function App(){
  return (<>
  <h1> Gymrat</h1>
  <form>
    <div> 
    <label htmlFor = "exercise">
    Exercise
    </label> 
    <br/> 
    <input type="text" id="exercise"/>
    </div>
    <div> 
    <label htmlFor = "weight">
    Weight
    </label>
    <br/> 
    <input type="text" id="weight"/>
   
    </div>
   
  </form>
  </>)
}