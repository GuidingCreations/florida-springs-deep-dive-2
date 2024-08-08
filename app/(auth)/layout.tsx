import React from 'react'

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className='auth-wrapper'>
            {children}
        </div>
    );
  }
  