import Footer from "../../components/StructureElements/Footer";
import Header from "../../components/StructureElements/Header";

type AuthPageFrameProps = {
    children: React.ReactNode
}
export default function AuthPageFrame({children}:AuthPageFrameProps){
    return <div className="h-lvh flex flex-col">
    <Header />
        {children}
    <Footer />
  </div>
}