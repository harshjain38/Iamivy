import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import classes from "./NavBar.module.css";
import logo from "../../../assests/logo.png";

const NavBar = props => {
    const navigate = useNavigate();

    const handleSignout = () => {
        localStorage.removeItem('ivyToken');
        toast.success('Signed out successfully!',{duration:2000});
        navigate("/");
    }

    const handleSignin = () => {
        navigate("/signin");
    }

    const handleSignup = () => {
        navigate("/signup");
    }

    return <ul>
        <li><img src={logo} alt="logo" className={classes.logoImg} onClick={()=> navigate('/')}/></li>
        <li><a className={classes.logo} href="/">Ivy</a></li>
        {
            props.navVis
                ? <div>
                    <button className={classes.butt} onClick={handleSignout}>Signout</button>
                    <li className={classes.firstName}><a href="#username" className={classes.firstNameA}>{props.name.split(' ')[0]}</a></li>
                </div>
                : <div>
                    <button className={classes.butt} onClick={handleSignup}>Signup</button>
                    <button className={classes.butt} onClick={handleSignin}>Signin</button>
                </div>
        }
    </ul>
};

export default NavBar;