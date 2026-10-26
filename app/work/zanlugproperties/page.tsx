import { redirect } from 'next/navigation'

// Zanlüg Properties is no longer part of the portfolio. Keep old links working by sending them to the work section.
export default function ZanlugPropertiesRedirectPage() {
  redirect('/#work')
}
