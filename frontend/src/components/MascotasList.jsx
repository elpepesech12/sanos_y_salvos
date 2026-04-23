import React, { useEffect, useState } from "react";
import { mascotaService } from "../services/mascotaService";
import { notificacionService } from "../services/NotificacionService";
import { useUserViewModel } from "../hooks/useUserViewModel";

export const MascotasList = () => {
    const { sumarPuntos } = useUserViewModel();
    const [mascotas, setMascotas] = useState([]);

    const cargarMascotas = async () => {
        try {
            // Ya no pedimos token de Auth0
            const data = await mascotaService.listar(); 
            setMascotas(data);
        } catch (e) { 
            console.error("Error al conectar con el backend", e); 
        }
    };

    useEffect(() => { 
        cargarMascotas(); 
    }, []);

    const handleReporte = async (id, nombre) => {
        await mascotaService.reportarHallazgo(id, "Encontrado");
        sumarPuntos(100); 
        notificacionService.notificar(`¡Gracias! Reportaste a ${nombre}`); 
    };

    return (
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
    );
};

const styles = {
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' },
    card: { border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'center', background: 'white' },
    btn: { backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }
};