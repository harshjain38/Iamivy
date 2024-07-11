import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import "./log.css";
import bg from '../../assests/bg.jpg';


const Login = props => {
    const ivyToken = JSON.parse(localStorage.getItem('ivyToken'));
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            if (!ivyToken || !ivyToken.token) {
                return;
            }
            const { data } = await axios.post(
                `${process.env.REACT_APP_HOSTNAME}/verify`,
                { token: ivyToken.token }
            );
            const { status } = data;
            return status
                ? (navigate('/home'))
                : (localStorage.removeItem("ivyToken"));
        };
        verifyToken();
    // eslint-disable-next-line
    }, []);

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = async (e) => {
        e.preventDefault();
        document.getElementById('LoginButton').innerHTML = 'Signing in...';
        user.email = user.email.toLowerCase();

        await axios.post(`${process.env.REACT_APP_HOSTNAME}/login`, user)
        // await axios.post("http://localhost:8080/login", user)
            .then(res => {
                if (res.data.success) {
                    localStorage.setItem('ivyToken', JSON.stringify({ token: res.data.token }));
                    toast.success(res.data.message, { duration: 2000 });
                    navigate("/home");
                }
                else {
                    toast.error(res.data.message, { duration: 2000 });
                }
            })
            .catch(err => {
                toast.error("Something went wrong. Try again later!", { duration: 2000 });
                console.log(err);
            })
        document.getElementById('LoginButton').innerHTML = 'Sign in';
    }

    return (
        <div style={{ backgroundImage: `url(${bg})`, height: '100vh', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <div className="main">
                <div className="log">
                    <h1 className="head1">Welcome back!</h1>
                    <form action="" onSubmit={(e) => login(e)}>
                        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email Address" required />
                        <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" required />
                        <button className="button" id="LoginButton">Sign in</button>
                    </form>
                    <div className="or">
                        Don't have an account?
                        <span onClick={() => navigate("/signup")} className="alt">Sign up</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;