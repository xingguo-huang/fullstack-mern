import { useState, useEffect, createContext, useContext } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            const auth = getAuth();
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, loading, logout }}>
            {!loading && children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
} 