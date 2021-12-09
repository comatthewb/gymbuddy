import { ChangeEventHandler } from "react";

export const inputType = ["text", "number", "email"] as const;

type inputType = typeof inputType[number]; // This creates a union type

type InputProps = {
    /**Input label */
    label: string;

    /**Input type */
    type: inputType;

    /**Input ID */
    id: string;

    /** Input value */
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
};

/** Reusable Input with Label */
export function Input(props: InputProps) {
    return (
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            <br />
            <input onChange={props.onChange} type={props.type} id={props.id} />
        </div>
    );
}
