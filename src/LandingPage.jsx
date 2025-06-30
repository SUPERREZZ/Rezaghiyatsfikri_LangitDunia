
import { useState, useEffect } from "react"
import translations from "../Language"
import fetchFlightStates from "./fetching/stateAll.js"
import FooterSection from "./components/Footer.jsx"
import ContactSection from "./components/Contact.jsx"
import AboutSection from "./components/AboutSection.jsx"
import ContentSection from "./components/ContentSection.jsx"
import HeaderSection from "./components/HeaderHeroSection.jsx"
import NavbarSection from "./components/NavbarSection.jsx"

export default function LandingPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [viewMode, setViewMode] = useState("map")
    const [isDarkMode, setIsDarkMode] = useState(true)
    const [flightData, setFlightData] = useState([]);
    const [language, setLanguage] = useState("en")
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)
    useEffect(() => {
        async function loadFlights() {
            const data = fetchFlightStates();
            setFlightData(data);
        }

        loadFlights();
    }, []);

    // Filter berdasarkan search
    const filteredFlights = flightData.filter(flight => {
        if (!searchQuery) {
            return true;
        }

        const query = searchQuery.toLowerCase();

        return (
            flight.id.toLowerCase().includes(query) ||
            flight.tooltipInfo.maskapai.toLowerCase().includes(query) ||
            flight.from.toLowerCase().includes(query) ||
            flight.to.toLowerCase().includes(query)
        );
    });
    // Pagination
    const totalPages = Math.ceil(filteredFlights.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentFlights = filteredFlights.slice(startIndex, endIndex);


    // Saat search berubah
    const handleSearchChange = (value) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const t = translations[language]

    return (
        <div className="relative overflow-hidden bg-gray-900">
            <div
            className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
        >
            {/* Sticky Navbar */}
            <NavbarSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} setLanguage={setLanguage} language={language} t={t} />
            {/* Hero Section */}
            <HeaderSection t={t} isDarkMode={isDarkMode} />
            {/* Content Section */}
            <ContentSection t={t} isDarkMode={isDarkMode} setViewMode={setViewMode} viewMode={viewMode} handleSearchChange={handleSearchChange} searchQuery={searchQuery} filteredFlights={filteredFlights} startIndex={startIndex} endIndex={endIndex} currentFlights={currentFlights} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
            {/* About Section */}
            <AboutSection t={t} isDarkMode={isDarkMode} />
            {/* Contact Section */}
            <ContactSection t={t} isDarkMode={isDarkMode} />
            {/* Footer */}
            <FooterSection t={t} isDarkMode={isDarkMode} />
        </div >
        </div>
    )
}
