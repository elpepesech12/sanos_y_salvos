const API_URL = "http://localhost:8081/api";

export const mascotaService = {
    listar: async () => {
        const resp = await fetch(`${API_URL}/mascotas`);
        return await resp.json();
    },
    reportarHallazgo: async (id, estado) => {
        const resp = await fetch(`${API_URL}/reportes/${id}/${estado}`, {
            method: 'POST'
        });
        return await resp.text();
    }
};