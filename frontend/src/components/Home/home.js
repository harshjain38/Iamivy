import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bg from '../../assests/bg.jpg';

import classes from "./home.module.css";
import NavBar from "../UI/NavBar/NavBar";

const Home = props => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '' });
    const [navVis,setNavVis]=useState(false);
    const ivyToken = JSON.parse(localStorage.getItem('ivyToken'));

    useEffect(() => {
        const verifyToken = async () => {
            if (!ivyToken || !ivyToken.token) {
                return;
            }
            const { data } = await axios.post(
                `${process.env.REACT_APP_HOSTNAME}/verify`,
                { token: ivyToken.token }
            );
            const { status, user } = data;
            return status
                ? (setUser(user),setNavVis(true))
                : (localStorage.removeItem("ivyToken"));
        };
        verifyToken();
    // eslint-disable-next-line
    }, []);

    return <div className={classes.mainHome} style={{backgroundImage: `url(${bg})`, height: '100vh', backgroundPosition: 'center',backgroundSize: 'cover',backgroundRepeat:'no-repeat'}}>
        <NavBar navVis={navVis} name={user.name}/>
        <div className={classes.divCard} onClick={()=> {navigate('/situation'); props.setExpert('A')}}>
            <h1 className={classes["home-head"]}>Ivy For Career</h1>
            <p className={classes["home-para"]}>Your personal Career Counsellor. Ask anything related to your career and get Human like, Empathetic response.</p>
        </div>
        <div className={classes.divCard} onClick={()=> {navigate('/situation'); props.setExpert('B')}}>
            <h1 className={classes["home-head"]}>Ivy For Life</h1>
            <p className={classes["home-para"]}>Get Psychological First Aid for your life events. Pour your heart out and she will listen, without judging you.</p>
        </div>
    </div>
};

export default Home;