// import { BrowserRouter, withRouter} from 'react-router-dom';

import StudioRoutes from './Routes/Route';
import './App.css';

function App() {
  window.addEventListener("contextmenu", (event) => {
    event.preventDefault()
  })
  return (
    <div>
      {/* <BrowserRouter> */}
      <StudioRoutes />
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
