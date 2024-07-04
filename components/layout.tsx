import Alert from "./alert";
import Footer from "./footer";
import Meta from "./meta";

type Props = {
  isAlert?: boolean;
  children: React.ReactNode;
};

const Layout = ({ isAlert, children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert isAlert={isAlert} />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
