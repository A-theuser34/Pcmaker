import React, { useState } from 'react'

export default function AuthForm({handleSignIn}:any) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleTogglePassword = () => {
      setShowPassword(!showPassword)
    }


    return (
      <div className=''>
          <form onSubmit={(e)=>handleSignIn(e,email,password)} className="space-y-4">
            <input required type="email"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            placeholder='email...'
            className="block w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-black"
            />
            <div className="flex items-center space-x-2">
              <input required type={showPassword ? "text" : "password"} 
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              placeholder='pass'
              className="block w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-black"
              />
            <button type='button' onClick={handleTogglePassword} className="px-2 py-1 text-xs bg-slate-600 text-white rounded-lg hover:bg-slate-900">
              {showPassword ? 'Hide Password' : 'Show Password'}
            </button>


            </div>
            <button type='submit' className="w-full py-2 px-4 text-sm bg-slate-600 text-white rounded-lg hover:bg-slate-900">Submit</button>
        </form>
      </div>
)
}
