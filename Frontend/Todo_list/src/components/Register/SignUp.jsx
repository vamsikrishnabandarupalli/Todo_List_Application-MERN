import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';

export default function SignUp(){

    const [formData, setformData] = useState({email : '', username : '', password: ''});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();;

    const handleChange = (e) => {
        setformData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:1000/api/auths/register', formData);
            setMessage(response.data.message);
            setformData({email : ' ', username :' ', password : ' '})
            navigate('/signin'); 
        }catch(error){
            setMessage(error.response?.data?.error || "Something went wrong")
        }
    } 

    return (
        <>
            <div id="one" className='container-fluid px-1 py-4' >
                <div id="two" >
                    <div id="signup" >
                        <form method="post" onSubmit={handleSubmit}>
                            <h3>Register</h3>
                            {message && <p>{message}</p>}
                            <div>
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    name="email" id="email" 
                                    placeholder="Enter your email" 
                                    onChange = {handleChange} 
                                    value={formData.email}  
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input 
                                    type="text"
                                    name="username" 
                                    id="username" 
                                    placeholder="Enter your username" 
                                    onChange={handleChange} 
                                    value={formData.username} 
                                    required 
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    placeholder="Enter your password" 
                                    onChange={handleChange} 
                                    value={formData.password} required 
                                />
                            </div>
                            
                            <div>
                            <button type="submit" className='btn btn-primary px-3 py-2 border-2 border-white rounded-3 w-100'>
                                Register
                            </button>
                            </div>
                        </form>
                        <div id="right" >
                            <div id="login" >
                                <h4>Hello, User</h4>
                                <p>Enter your login details to use site features</p>
                                <div>
                                    <button type='submit'>
                                        <Link className="nav-link active" to="./signin">Login Here</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="loginform">
                            <p>Already account created? </p>
                            <div>
                                <button type="submit">
                                    <Link className="nav-link active" to="./signin">Login Here</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}