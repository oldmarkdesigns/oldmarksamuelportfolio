import { redirect } from 'next/navigation'

// Mono was replaced by Hemma. Keep old links working by sending them to the work section.
export default function MonoRedirectPage() {
  redirect('/#work')
}
