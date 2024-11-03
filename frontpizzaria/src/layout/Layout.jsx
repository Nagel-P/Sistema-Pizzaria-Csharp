import "../App.css";
import HeaderApp from "./Header";

function Layout(props) {
  return (
    <>
      <HeaderApp />
      <main class="content">{props.children}</main>
    </>
  );
}

export default Layout;
