import styles from "./DevTools.module.css";

export default function DevTools() {
    return (
        <section className={styles.root}>
            <label htmlFor="devtools-user"> User </label>
            <br />
            <select id="devtools-user">
                <option value="1">c@h.com</option>
                <option value="2">no-exercises@gmail.com</option>
            </select>
        </section>
    );
}
