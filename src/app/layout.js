


import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";



export default function RootLayout({ children }) {

  return (
    <html>
      <body>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}