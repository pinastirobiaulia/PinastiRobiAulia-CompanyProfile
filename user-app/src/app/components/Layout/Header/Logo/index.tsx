import Link from 'next/link'
import Image from 'next/image'

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-6">
      {/* Logo pertama + teks */}
      <div className="flex items-center space-x-2">
        <Image
          src="/images/logo/beehivedrones.jpg"
          alt="Beehive Drones"
          width={40} // ukuran lebih kecil
          height={40}
        />
        <span className="font-bold text-sm">Beehive Drones</span>
      </div>

      {/* Logo kedua + teks */}
      <div className="flex items-center space-x-2">
        <Image
          src="/images/logo/lumbungmuncul.jpg"
          alt="Lumbung Muncul"
          width={40} // ukuran lebih kecil
          height={40}
        />
        <span className="font-bold text-sm">Lumbung Muncul</span>
      </div>
    </Link>
  )
}

export default Logo