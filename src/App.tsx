import { AppShell } from './components/layout/AppShell';
import { usePlayback } from './hooks/usePlayback';

function App() {
  usePlayback();
  return <AppShell />;
}

export default App;
