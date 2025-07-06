
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html lang="en">

      <div
        className={`flex flex-col `}
      >
        
        {children}

      </div>
    </html>
  );
}
