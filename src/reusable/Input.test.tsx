import { render, screen } from "@testing-library/react"
import { Input } from "./Input"

it('should apply specified label and associate the label with the input', ()=>{
  const label = "Test label"
  render(<Input id="test" label = {label} type="text"/>)
  screen.getByLabelText("Test label");
})