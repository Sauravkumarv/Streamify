import React, { useState } from 'react'
import { ShipWheelIcon } from 'lucide-react'
const SignUpPage = () => {

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const handleSignup = (e) => {
    e.prevent.default();
  }



  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>

        {/* SIGNUP FORM -KEFT SIDE */}
        <div className='w-full lg:w-1/2 p-4 sm-p-8 flex flex-col'>
          {/* LOGO */}

          <div className='mb-4 flex items-center justify-start gap-2'>
            <ShipWheelIcon className="size-9 text-primary" />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to secondary tracking-wider'>
              Streamify
            </span>
          </div>

          <div className='w-full'>
          <form onSubmit={handleSignup}>
              <div className='space-y-4'>
                <div>
                  <h2 className='text-xl font-semibold'>Create an Account</h2>
                  <p className='text-sm opacity-70'>
                    Join Streamify and start your language learning adventure!
                  </p>
                </div>
                <div className='space-y-3'>

                  {/* fullName */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Full Name

                      </span>
                    </label>
                    <input type="text"
                      className='input imput-bordered w-full'
                      placeholder='John Doe'
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                    />

                  </div>

                  {/* email */}

                  <div className='form-control w-full'>
                  <label className='label'>
                      <span className='label-text'>Email

                      </span>
                    </label>
                    <input type="email"
                      className='input imput-bordered w-full'
                      placeholder='johndoe@gmail.com'
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />

                  </div>
                  {/* password */}
                  <div className='form-control w-full'>
                  <label className='label'>
                      <span className='label-text'>Password

                      </span>
                    </label>
                    <input type="*******"
                      className='input imput-bordered w-full'
                      placeholder='password'
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />

                  </div>










                 

                 

                </div>
              </div>
            </form>

          </div>
        </div>

      </div>
    </div>
  )
}

export default SignUpPage
