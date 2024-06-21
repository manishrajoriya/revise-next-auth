"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'



function Signup() {
  const router = useRouter()
    const [value, setValue] = useState({
        username: '',
        email: '',
        password: '',
    })

    const [buttonDisabled, setButtonDisabled ] = useState(false)
    const [loading, setLoading]= useState(false)
    const [success, setSuccess] = useState(false)

   const  onSignup = async ()=>{
      try {
        setLoading(true)
        setButtonDisabled(true)
        const res = await axios.post('/api/users/signup', value)
        setSuccess(true)
        console.log("signup successfull",res.data);
        toast.success("signup successfull")
        router.push("/home")


      } catch (error) {
        setSuccess(false)
        console.log("signup error");
        toast.error("signup error")
      }
    }

    useEffect(()=>{
      if(value.username.length > 0 && value.email.length > 0 && value.password.length > 0){
        setButtonDisabled(false)
      }else{
        setButtonDisabled(true)
      }
    },[value]
    )


  return (
<div className="flex flex-col justify-center max-w-lg mx-auto px-4 space-y-6 font-[sans-serif] text-[#f9eeee]">
        <h1>{loading? "processing" : "Signup"}</h1>
        <h1>{success? "Signup Successfull": "Signup Faild"}</h1>
        <Input 
        className="px-4 py-2.5  rounded-md   w-full " 
        type="text"
        placeholder="username"
        value={value.username}
        onChange={(e) =>
          setValue({ ...value, username: e.target.value })
        }
        />
        <Input 
        className='px-4 py-2.5  rounded-md   w-full'
        type="email"
        placeholder="Email"
        value={value.email}
        onChange={(e) =>
          setValue({ ...value, email: e.target.value })
        }
        />
        <Input 
        className='px-4 py-2.5  rounded-md   w-full'
        type="password"
        placeholder="Password"
        value={value.password}
        onChange={(e) =>
          setValue({ ...value, password: e.target.value })
        }
        />

        <Button 
        onClick={onSignup}
        className=''
        disabled={buttonDisabled}
        >{buttonDisabled? "fill Data ": "Signup "}</Button>

      <Button>
        <Link href="/login">Visit for Login</Link>
      </Button>
      
    </div>
  )
}

export default Signup