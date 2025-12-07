'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CardBox from '../shared/CardBox'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { apiFetch } from '@/app/utils/apiFetch'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      // Simpan status login
      localStorage.setItem('isLoggedIn', 'true')
      if (remember) {
        localStorage.setItem('token', data.token || '')
      }

      // Redirect ke dashboard
      router.push('/dashboard')
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div className='h-screen w-full flex justify-center items-center bg-lightprimary'>
      <div className='md:min-w-[450px] min-w-max'>
        <CardBox>
          {/* Logos */}
          <div className='flex justify-center mb-6 gap-8 items-center'>
            <div className='flex flex-col items-center'>
              <img
                src='/images/logos/beehivedrones.jpg'
                alt='BeehiveDrones'
                className='h-12'
              />
              <span className='text-sm font-medium mt-1'>Beehive Drones</span>
            </div>
            <div className='flex flex-col items-center'>
              <img
                src='/images/logos/lumbungmuncul.jpg'
                alt='LumbungMuncul'
                className='h-12'
              />
              <span className='text-sm font-medium mt-1'>Lumbung Muncul</span>
            </div>
          </div>

          {/* Username */}
          <div className='mb-4'>
            <Label htmlFor='username1' className='font-medium'>Username</Label>
            <Input
              id='username1'
              type='text'
              placeholder='Enter your username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className='mb-4'>
            <Label htmlFor='password1' className='font-medium'>Password</Label>
            <Input
              id='password1'
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember + Forgot Password */}
          <div className='flex flex-wrap gap-6 items-center justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <Checkbox
                id='remember'
                checked={remember}
                onChange={(e) => setRemember((e.target as HTMLInputElement).checked)}
              />
              <Label
                className='text-link font-normal text-sm'
                htmlFor='remember'>
                Remember this device
              </Label>
            </div>
            <a
              href='#'
              className='text-sm font-medium text-primary hover:text-primaryemphasis'>
              Forgot Password ?
            </a>
          </div>

          {/* Sign In Button */}
          <Button className='w-full' onClick={handleLogin}>
            Sign In
          </Button>
        </CardBox>
      </div>
    </div>
  )
}