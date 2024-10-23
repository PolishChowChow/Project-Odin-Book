import { Link } from "react-router-dom";

type CustomLinkProps = {
    to: string;
    className?: string;
    children?: React.ReactNode;
}
export default function CustomLink({to, className, children}: CustomLinkProps){
    return <Link to={to}><span className={`${className}`}>{children}</span></Link>
    
}