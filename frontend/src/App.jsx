import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";


function App() {

  return (<>
  
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Toaster position="top-center" richColors closeButton />

    <Header/>

    <main className="flex-1">
      <Outlet />
    </main>

    <Footer />
  </div>
  
  </>)

}


export default App;