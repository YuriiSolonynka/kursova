export default function Sidebar({ navItems, activeTab, setActiveTab }) {
    return (
        <aside className="w-64 bg-gray-900 border-r border-gray-800">
            <nav className="p-6">
                <h2 className="text-white text-xl font-semibold mb-8">Personal Cabinet</h2>
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === item.id
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                    }`}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
