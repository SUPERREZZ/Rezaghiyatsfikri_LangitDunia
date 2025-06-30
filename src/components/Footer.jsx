import React from 'react';
import { Plane } from 'lucide-react';

const FooterSection = ({t, isDarkMode}) => {
    return (
        < footer
                className={`border-t py-12 transition-colors duration-300 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex justify-center items-center gap-2 mb-4">
                            <Plane className="w-6 h-6 text-blue-400" />
                            <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{t.brand}</h3>
                        </div>
                        <p className={`mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{t.footer?.description}</p>
                        <div className="flex justify-center space-x-8 mb-8">
                            {[
                                { key: "home", label: t.nav.home },
                                { key: "explore", label: t.nav.explore },
                                { key: "about", label: t.nav.about },
                                { key: "contact", label: t.nav.contact },
                            ].map((item) => (
                                <a
                                    key={item.key}
                                    href={`#${item.key}`}
                                    className={`transition-colors duration-200 ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                                        }`}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                        <div className={`pt-8 border-t ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
                            <p className={isDarkMode ? "text-gray-500" : "text-gray-400"}>{t.footer.copyright}</p>
                        </div>
                    </div>
                </div>
            </footer >
    )
}
export default FooterSection;