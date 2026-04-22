import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { mascotaService } from '../services/mascotaService';
import { notificacionService } from '../services/NotificacionService';
import { useUserViewModel } from '../hooks/useUserViewModel';

export const MascotasList = () => {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const { user, sumarPuntos } = useUserViewModel();
    const [mascotas, setMascotas] = useState([]);

    const cargarMascotas = async () => {
        try {
            const token = await getAccessTokenSilently();
            const data = await mascotaService.listar(token);
            setMascotas(data);
        } catch (e) { console.error("Error de autenticación", e); }
    };

    useEffect(() => { if (isAuthenticated) cargarMascotas(); }, [isAuthenticated]);

    const handleReporte = async (id, nombre) => {
        await mascotaService.reportarHallazgo(id, "Encontrado");
        sumarPuntos(100); // Lógica MVVM [cite: 96]
        notificacionService.notificar(`¡Gracias! Reportaste a ${nombre}`); // Lógica Observer [cite: 87]
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h2>Hola, {user.nombre} {user.isVip ? '⭐ VIP' : ''}</h2>
                <p>Puntos de Colaborador: <strong>{user.puntos}</strong></p>
            </header>

            <div style={styles.grid}>
                {mascotas.map(m => (
                    <div key={m.id} style={styles.card}>
                        <h3>{m.nombre}</h3>
                        <p>Estado: <strong>{m.estado}</strong></p>
                        {m.estado === 'Perdido' && (
                            <button onClick={() => handleReporte(m.id, m.nombre)} style={styles.btn}>
                                Marcar como Encontrado
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '20px', fontFamily: 'sans-serif' },
    header: { backgroundColor: '#eee', padding: '15px', borderRadius: '10px', marginBottom: '20px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' },
    card: { border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'center' },
    btn: { backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }
};  