class NotificacionService {
    constructor() { this.observadores = []; }

    suscribir(callback) {
        this.observadores.push(callback);
        return () => { this.observadores = this.observadores.filter(obs => obs !== callback); };
    }

    notificar(mensaje) {
        this.observadores.forEach(obs => obs(mensaje));
    }
}
export const notificacionService = new NotificacionService();