

function MainLayout({ children }) {
    return (
        <div className="flex flex-col min-h-full">
            <main className="grow">
                {children}
            </main>
        </div>
    )
}

export default MainLayout
