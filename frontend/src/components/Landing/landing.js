import { useNavigate } from "react-router-dom";
import classes from "./landing.module.css";
import Footer from '../UI/Footer/footer';
import React from "react";
import bg from '../../assests/bg.jpg';
import logo from "../../assests/logo.png";


const Landing = () => { 
    const navigate = useNavigate();

    return <React.Fragment>
        <div className={classes.main} style={{backgroundImage: `url(${bg})`, height: '100vh', backgroundPosition: 'center',backgroundSize: 'cover',backgroundRepeat:'no-repeat'}}>
            <div className={classes.head}>
                <img src={logo} alt="logo" className={classes.logo}/>            
                <h1 className={classes.head1}>Ivy</h1>
            </div>
            {/* <h5 className={classes.new}>A message from the founder →</h5> */}
            <h1 className={classes.head2}>Your personal</h1>
            <h1 className={classes.head2}>life mentor</h1>
            <button className={classes.button} onClick={() => navigate("/home")}>Continue</button>
            <button className={`${classes.button} ${classes.signin}`} onClick={() => navigate("/signin")}>Sign in</button>
        </div>
        <Footer />
    </React.Fragment>
};

export default Landing;