
type InputProps = {
    /**Input label */
    label: string; 
    /**Input type */
    type: "text" | "number" |"email";
    /**Input ID */
    id: string;
}

/** Reusable Input with Label */
export function Input(props: InputProps){
    return(
    <div> 
        <label htmlFor = {props.id}>{props.label}</label> 
        <br/> 
        <input type={props.type} id={props.id}/>
    </div>
 );
}