import "./stylesheets/styles.scss";

import MenuBuilder from "../components/MenuBuilder";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <MenuBuilder />
      <Footer />
    </>
  );
}
