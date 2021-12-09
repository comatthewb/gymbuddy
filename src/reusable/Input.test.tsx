import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { Input, inputType } from "./Input"
 
it('should call the onChange handler', ()=>{
    const onChange = jest.fn();
    render(
        <Input onChange = {onChange} value = "test" id="test" label = "Example label" type="text"/>
    );
    const input = screen.getByLabelText("Example label");
    userEvent.type(input, "Hello World!");
    expect(onChange).toHaveBeenCalledTimes(12);
});
it('should apply specified label and associate the label with the input', ()=>{
  const label = "Test label";
  render(<Input onChange = {()=>{}}value = "test" id="test" label = {label} type="text"/>);
  screen.getByLabelText("Test label");
});

describe("should render with each supported input type", ()=>{
    inputType.forEach((inputType)=>{
        it(inputType, ()=>{
            const { container } = render(
            <Input onChange = {()=>{}}value = "test" id="test" label = "Example" type={inputType}/>
            );
            expect(
                container.querySelector(`input[type="${inputType}"]`)
            ).toBeInTheDocument();
        });
    });
});

it('should apply provided value to the input',()=>{
 const value = "test"
 const {container} = render(<Input onChange = {()=>{}} id= "test" value={value} label = "Example" type="text"/>);
 expect(
     container.querySelector(`input[value="test"]`)).toBeInTheDocument;
});