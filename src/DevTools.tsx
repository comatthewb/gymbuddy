import { useEffect, useState } from "react";
import { getUsers } from "./api/userApi";
import styles from "./DevTools.module.css";
import { User } from "./types";
import invariant from "invariant";

type DevToolsProps = {
    user: User | null;
    setUser: (user: User) => void;
};

export default function DevTools({ user, setUser }: DevToolsProps) {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const _users = await getUsers();
                setUsers(_users);

                // set the App's selected user to the first user
                setUser(_users[0]);
            } catch (error) {
                return error;
            }
        }
        fetchData();
    }, [setUser]);

    return (
        <section className={styles.root}>
            <label htmlFor="devtools-user"> User </label>
            <br />
            <select
                id="devtools-user"
                value={user?.id}
                onChange={(event) => {
                    const user = users.find((user) => user.id.toString() === event.target.value);
                    invariant(user !== undefined, "User not found");
                    setUser(user);
                }}
            >
                {users.map((user) => {
                    return (
                        <option key={user.id} value={user.id}>
                            {user.email}
                        </option>
                    );
                })}
            </select>
        </section>
    );
}
