import Image from 'next/image'

const Logo = ({ className = '', ...props }) => (
  <Image src="/icon-144x144.png" alt="logo" width="30" height="30" />
)

export default Logo
