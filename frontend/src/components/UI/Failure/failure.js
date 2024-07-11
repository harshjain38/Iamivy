import classes from "./failure.module.css";
import bg from '../../../assests/bg.jpg';


const Failure = () => {
    return <div className={classes.mainFail} style={{ backgroundImage: `url(${bg})`, height: '100vh', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
        <h1 className={classes.headFail1}>404</h1>    
        <h1 className={classes.headFail2}>This page is not found!</h1>
    </div> 
}

export default Failure;