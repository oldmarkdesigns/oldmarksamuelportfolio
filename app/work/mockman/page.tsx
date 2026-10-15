import { redirect } from 'next/navigation'

// Mockman became Mono, and Mono has since been replaced by Hemma. Send old links to the work section.
export default function MockmanRedirectPage() {
  redirect('/#work')
}
