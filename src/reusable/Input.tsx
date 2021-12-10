import { ChangeEventHandler, FocusEventHandler } from "react";

export const inputType = ["text", "number", "email"] as const;

type inputType = typeof inputType[number]; // This creates a union type

type InputProps = {
    /** Validation error */
    error: string | undefined;
    /**Input label */

    label: string;

    /**Input type */
    type: inputType;

    /**Input ID */
    id: string;

    /** Input value */
    value: string;

    /** Function called on input change */
    onChange: ChangeEventHandler<HTMLInputElement>;

    /** Function called on input blur */
    onBlur: FocusEventHandler<HTMLInputElement>;
};

/** Reusable Input with Label */
export function Input(props: InputProps) {
    return (
        <>
            <div>
                <label htmlFor={props.id}>{props.label}</label>
                <br />
                <input
                    onBlur={props.onBlur}
                    value={props.value}
                    onChange={props.onChange}
                    type={props.type}
                    id={props.id}
                />
            </div>
            {props.error && <p style={{ color: "red" }}>{props.error}</p>}
        </>
    );
}
