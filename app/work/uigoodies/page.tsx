import { redirect } from 'next/navigation'

// Daily UI is no longer part of the portfolio. Keep old links working by sending them to the work section.
export default function UIGoodiesRedirectPage() {
  redirect('/#work')
}
