import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Background from '@/components/Background'
import { ThemeProvider } from '@/contexts/ThemeContext'

export const metadata: Metadata = {
  title: 'Samuel Oldmark - Creative Product Designer',
  description: 'I design web and mobile apps that are user-friendly, beautiful & convert your target audience.',
  icons: {
    icon: '/Portfolio Assets/Symbols/Favicon 32x32 2.0.png',
    apple: '/Portfolio Assets/Symbols/Webclip 256x256 2.0.png',
  },
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
                  const bgColor = theme === 'dark' ? '#0a0a0a' : '#fafafa';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  }
                  document.documentElement.style.backgroundColor = bgColor;
                  document.body.style.backgroundColor = bgColor;
                  
                  // Update theme-color meta tag
                  let themeColorMeta = document.querySelector('meta[name="theme-color"]');
                  if (!themeColorMeta) {
                    themeColorMeta = document.createElement('meta');
                    themeColorMeta.setAttribute('name', 'theme-color');
                    document.head.appendChild(themeColorMeta);
                  }
                  themeColorMeta.setAttribute('content', bgColor);
                } catch (e) {}
              })();
            `,
          }}
        />
        <ThemeProvider>
          <Background />
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

