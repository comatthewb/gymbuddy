import { User } from "./types";
import { createContext, useContext } from "react";
import invariant from "invariant";

export type UserContextValue = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserContext = createContext<UserContextValue | null>(null);

export type UserContextProviderProps = UserContextValue & {
    children: React.ReactNode;
};

export function UserContextProvider({ user, setUser, children }: UserContextProviderProps) {
    const value: UserContextValue = {
        user,
        setUser,
    };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
    const userContext = useContext(UserContext);
    invariant(userContext?.user, "useUserContext may only be used as a child of UserContextProvider");
    return { user: userContext.user, setUser: userContext.setUser };
}
