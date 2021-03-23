import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Content from "./components/layouts/Content";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Content />
      </div>
    </Provider>
  );
}

export default App;
