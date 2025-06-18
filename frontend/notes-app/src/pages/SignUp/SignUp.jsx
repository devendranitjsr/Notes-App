import React, { useState } from "react";
import Navbar from "../../componantes/Navbar/Navbar";
import PasswordInput from "../../componantes/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utilis/helper";
import axiosInstance from "../../utilis/axioslnstance";

const SignUp =() =>{

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(null);

    const navigate = useNavigate();

    const handleSignUp = async (e) =>{
        e.preventDefault();

        if(!name){
            setError("Please enter your Name");
            return;
        }

        if(!validateEmail(email)){
            setError("Please Enter your vaild email");
            return;
        }

        if(!password){
            setError("Please enter your Password");
            return;
        }

        setError('')

        //SignUp Api Call
        try {
            const response = await axiosInstance.post("/create-account",{
                fullName:name,
                email: email,
                password: password,
            });

            // Handal sucessfull registration response
            if(response.data && response.data.error){
                setError(response.data.message)
                return
            }

            if(response.data && response.data.accessToken){
                localStorage.setItem("token",response.data.accessToken)
                navigate('/dashboard')
            }
        } catch(error){
            // Handle login error
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }else{
                setError("An unexcepted error occured. plese try again");
            }
            
        }
    };
    return(
        <>
         <Navbar/>

          <div className="flex item-center justify-center mt-28 ">
            <div className="w-96 border rounded bg-white px-7 py-10">
             <form onSubmit={handleSignUp}>
                 <h4 className="text-2xl mb-7">SignUp</h4>

                <input type="text" 
                 placeholder="Name" 
                 className="input-box"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                ></input>

                <input type="text" 
                 placeholder="Email" 
                 className="input-box"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                ></input>
                 
                <PasswordInput 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />     
                    {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
                    <button type="submit" className="btn-primary">
                    Create Account
                    </button>

                    <p className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-primary underline">
                    Login
                    </Link>
                    </p> 
             </form>

            </div>
          </div>
        </>

    );
};

export default SignUp