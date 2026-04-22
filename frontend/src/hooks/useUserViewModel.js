import { useState } from 'react';
import { initialUser } from '../models/UserModel';

export const useUserViewModel = () => {
    const [user, setUser] = useState(initialUser);

    const sumarPuntos = (pts) => {
        setUser(prev => ({
            ...prev,
            puntos: prev.puntos + pts,
            isVip: (prev.puntos + pts) > 500
        }));
    };

    return { user, sumarPuntos };
};