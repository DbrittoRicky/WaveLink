/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from 'react'
import { SignInFlow } from '../type';
import SignInCard from './sign-inCard';
import SignUpCard from './sign-upCard';

export const AuthScreen = () => {
    const [state, setState] = useState<SignInFlow>("signIn")

  return (
    <div className="h-full flex items-center justify-center bg-[url('/bg.jpg')] bg-cover">
       <div className='md:h-auto md:wd-[420px] '>
            {state === "signIn" ? <SignInCard setState={setState}/> : <SignUpCard setState={setState}/>}
       </div>
    </div>
  )
}

