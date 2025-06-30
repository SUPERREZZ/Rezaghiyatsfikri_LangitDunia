import {Globe,Plane,X,Menu} from "lucide-react";

const NavbarSection = ({isDarkMode,t,setIsDarkMode,setIsMenuOpen,isMenuOpen,setLanguage,language}) => {
    return (
        <nav
            className={`sticky p-2 top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${isDarkMode ? "bg-gray-900/95 border-gray-800" : "bg-white/95 border-gray-200"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Brand */}
                    <div className="flex-shrink-0">
                        <p
                            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"
                                }`}
                        >
                            <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                            {t.brand}
                        </p>
                    </div>


                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <div className="flex items-baseline space-x-8">
                            {[
                                { key: "home", label: t.nav.home },
                                { key: "explore", label: t.nav.explore },
                                { key: "about", label: t.nav.about },
                                { key: "contact", label: t.nav.contact },
                            ].map((item) => (
                                <a
                                    key={item.key}
                                    href={`#${item.key}`}
                                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                                        }`}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`p-2 rounded-lg transition-colors duration-200 ${isDarkMode
                                ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
                                : "bg-gray-200 hover:bg-gray-300 text-white"
                                }`}
                            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {isDarkMode ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            )}
                        </button>

                        {/* Language Toggle */}
                        <button
                            onClick={() => setLanguage(language === "en" ? "id" : "en")}
                            className={`px-3 py-2 rounded-lg text-sm font-medium flex gap-3 items-center ali transition-colors duration-200 ${isDarkMode
                                ? "bg-gray-800 hover:bg-gray-700 text-blue-400"
                                : "bg-gray-200 hover:bg-gray-300 text-white"
                                }`}
                        >
                            <Globe className="w-5 h-5" />
                            {language === "en" ? "EN" : "ID"}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200 ${isDarkMode
                                ? "text-gray-300 hover:text-white hover:bg-gray-800"
                                : "text-blue-300 hover:text-blue-600 hover:bg-gray-100"
                                }`}
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div
                            className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t transition-colors duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                                }`}
                        >
                            {[
                                { key: "home", label: t.nav.home },
                                { key: "explore", label: t.nav.explore },
                                { key: "about", label: t.nav.about },
                                { key: "contact", label: t.nav.contact },
                            ].map((item) => (
                                <a
                                    key={item.key}
                                    href={`#${item.key}`}
                                    className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}

                            {/* Mobile Theme and Language Toggles */}
                            <div className="flex items-center justify-between px-3 py-2 mt-4 pt-4 border-t border-gray-600">
                                <button
                                    onClick={() => setIsDarkMode(!isDarkMode)}
                                    className={`p-2 rounded-lg transition-colors duration-200 ${isDarkMode
                                        ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                        }`}
                                >
                                    {isDarkMode ? "☀️" : "🌙"}
                                </button>

                                <button
                                    onClick={() => setLanguage(language === "en" ? "id" : "en")}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isDarkMode
                                        ? "bg-gray-700 hover:bg-gray-600 text-blue-400"
                                        : "bg-gray-200 hover:bg-gray-300 text-blue-600"
                                        }`}
                                >
                                    {language === "en" ? "ID" : "EN"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
export default NavbarSection;