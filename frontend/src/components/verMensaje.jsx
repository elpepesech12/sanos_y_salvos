// src/components/verMensaje.jsx
import React, { useEffect, useState } from 'react';
import { notificacionService } from '../services/NotificacionService';

export const VerMensaje = () => {
    const [mensaje, setMensaje] = useState(null);

    useEffect(() => {
        // Suscribirse al servicio (Observer)
        const desuscribir = notificacionService.suscribir((msg) => {
            setMensaje(msg);
            // El mensaje desaparece a los 3 segundos
            setTimeout(() => setMensaje(null), 3000);
        });

        return () => desuscribir(); // Limpieza al desmontar
    }, []);

    if (!mensaje) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#3498db',
            color: 'white',
            padding: '1rem',
            borderRadius: '8px',
            zIndex: 1000,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
            📢 {mensaje}
        </div>
    );
};