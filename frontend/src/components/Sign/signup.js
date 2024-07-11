import { useState } from "react"
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import "./log.css";
import bg from '../../assests/bg.jpg';

const SignUp = props => {
    const navigate=useNavigate();

    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = async (e) => {
        e.preventDefault();
        document.getElementById('SignUpButton').innerHTML='Signing up...';
        user.email=user.email.toLowerCase();
        
        if( user.password === user.reEnterPassword){
            // await axios.post("http://localhost:8080/register", user )
            axios.post(`${process.env.REACT_APP_HOSTNAME}/register`, user)
            .then( res => {
                if(res.data.success){
                    localStorage.setItem('ivyToken',JSON.stringify({token:res.data.token}));
                    toast.success(res.data.message, { duration: 2000 });
                    navigate("/home");
                }
                else{
                    toast.error(res.data.message, { duration: 2000 });
                }
            })
            .catch(err => {
                toast.error("Something went wrong. Try again later!", { duration: 2000 });
                console.log(err);
            })
        } 
        else {
            toast.error("Invalid Input!",{duration:2000});
        }
        document.getElementById('SignUpButton').innerHTML='Sign up';
    }

    return (
        <div style={{ backgroundImage: `url(${bg})`, height: '100vh', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <div className="main reg">
                <div className="log">
                    <h1 className="head1">Create your account!</h1>
                    <form action="" onSubmit={(e)=>register(e)}>
                        <input type="text" name="name" value={user.name} placeholder="Full Name" onChange={ handleChange } required/>
                        <input type="email" name="email" value={user.email} placeholder="Email Address" onChange={ handleChange } required/>
                        <input type="password" name="password" value={user.password} placeholder="Password" onChange={ handleChange } minLength={8} required/>
                        <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange } minLength={8} required/>

                        <button className="button" id="SignUpButton">Sign up</button>
                    </form>
                    <div className="or">
                        Already have an account?
                        <span onClick={()=>navigate("/signin")} className="alt">Sign in</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;