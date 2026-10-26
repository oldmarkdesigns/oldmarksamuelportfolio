import { redirect } from 'next/navigation'

// Moments is no longer part of the portfolio. Keep old links working by sending them to the work section.
export default function MomentsRedirectPage() {
  redirect('/#work')
}
