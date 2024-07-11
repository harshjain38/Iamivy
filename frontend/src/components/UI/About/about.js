import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import classes from "./about.module.css";
import bg from '../../../assests/bg.jpg';

const About = props => {
    // const ivyToken = JSON.parse(localStorage.getItem('ivyToken'));
    const [about,setAbout] = useState('');
    const navigate = useNavigate();

    // useEffect(() => {
    //     const verifyToken = async () => {
    //         if (!ivyToken || !ivyToken.token) {
    //             // navigate("/signin");
    //             return;
    //         }
    //         const { data } = await axios.post(
    //             `${process.env.REACT_APP_HOSTNAME}/verify`,
    //             { token: ivyToken.token }
    //         );
    //         const { status } = data;
    //         return status
    //             ? ''
    //             : (localStorage.removeItem("ivyToken"));
    //     };
    //     verifyToken();
    // // eslint-disable-next-line
    // }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!about.trim()){
            return;
        }
        props.setSituation(about.trim());
        navigate('/aiexpert');
    }

    return <div className={classes.main} style={{ backgroundImage: `url(${bg})`, height: '100vh', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
        <h1 className={classes.head1}>{props.expert === 'A' ? 'Ivy For Career' : 'Ivy For Life'}</h1>
        <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
            <textarea
                name='about'
                value={about}
                className={classes.textarea}
                onChange={(e)=>setAbout(e.target.value)}
                placeholder="Describe your situation..."
                autoFocus required
            />
            <div><button className={classes.butt}>Submit</button></div>
        </form>
    </div>
}

export default About;