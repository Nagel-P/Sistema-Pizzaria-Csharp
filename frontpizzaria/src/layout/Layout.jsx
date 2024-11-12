import "../App.css";
import Header from "./Header";

function Layout(props) {
  return (
    <>
      <Header/>
      <main class="content">{props.children}</main>
    </>
  );
}

export default Layout;
