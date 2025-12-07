// src/app/page.tsx 
import { redirect } from 'next/navigation'; 
export default function Page() { 
    redirect('/auth/login'); // redirect ke halaman login 
}