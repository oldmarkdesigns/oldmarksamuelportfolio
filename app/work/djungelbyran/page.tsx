import { redirect } from 'next/navigation'

// Djungelbyrån is no longer part of the portfolio. Keep old links working by sending them to the work section.
export default function DjungelbyranRedirectPage() {
  redirect('/#work')
}
