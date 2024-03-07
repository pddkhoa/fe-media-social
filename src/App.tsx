import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routers/AppRoutes";
import GlobalModal from "./components/ui/Modal";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AppRoutes />
          <GlobalModal />
          <Toaster position="top-right" reverseOrder={false} />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
