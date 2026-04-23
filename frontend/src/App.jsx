import { MascotasList } from "./components/MascotasList";
import { VerMensaje } from "./components/verMensaje"; 
import { useUserViewModel } from "./hooks/useUserViewModel";
import './App.css';

function App() {
  const { user } = useUserViewModel();

  return (
    <div className="App">
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', background: '#2c3e50', color: 'white' }}>
        <h1>Sanos y Salvos 🐾</h1>
        <div>Usuario: <strong>{user.nombre}</strong> | Puntos: {user.puntos}</div>
      </nav>

      <main style={{ padding: '20px' }}>
        <VerMensaje /> 
        <MascotasList />
      </main>
    </div>
  );
}

export default App;