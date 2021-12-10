import { ChangeEventHandler, FocusEventHandler, useState } from "react";

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

    /** Tracking status of submission */
    FormStatus?: "Idle" | "Submitted";
    /** Function called on input change */
    onChange: ChangeEventHandler<HTMLInputElement>;

    /** Function called on input blur */
    onBlur?: FocusEventHandler<HTMLInputElement>;
};

/** Reusable Input with Label */

export function Input(props: InputProps) {
    const [touched, setTouched] = useState(false);
    return (
        <>
            <div>
                <label htmlFor={props.id}>{props.label}</label>
                <br />
                <input
                    onBlur={(event) => {
                        setTouched(true);
                        if (props.onBlur) props.onBlur(event);
                    }}
                    value={props.value}
                    onChange={props.onChange}
                    type={props.type}
                    id={props.id}
                />
            </div>
            {props.error && (props.FormStatus === "Submitted" || touched) && (
                <p style={{ color: "red" }}>{props.error}</p>
            )}
        </>
    );
}
