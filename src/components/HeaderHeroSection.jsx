import { Button } from "./ui/Button";
import { Plane } from "lucide-react";
import gambar from "../assets/items.png"

const HeaderSection = ({ t, isDarkMode }) => {
    return (
        <section id="home" className="py-20 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                                {t.hero.title}
                                <span className="text-blue-400 block">{t.hero.subtitle}</span>
                            </h1>
                            <p className={`text-xl max-w-2xl ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                {t.hero.description}
                            </p>
                        </div>
                        <Button
                        onClick={() => window.location.href = "#explore"}
                            size="lg"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold transition-colors duration-200"
                        >
                            {t.hero.cta}
                        </Button>
                    </div>

                    {/* Right - Airplane Image */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative overflow-visible">
                            <div className={`text-center ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                <div className="relative group">
                                    {/* Container utama */}
                                    <div className={`relative rounded-2xl overflow-hidden ${isDarkMode ? "" : "shadow-2xl"}`}>
                                        {/* Kotak latar belakang */}
                                        <div
                                            className={`w-full max-w-4xl mx-auto aspect-video rounded-2xl transition-all duration-500 ${isDarkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-100 to-gray-200"
                                                } flex items-center justify-center`}
                                        >
                                            {/* Gambar pesawat */}
                                            <img
                                                src={gambar || "/placeholder.svg"}
                                                alt="Aircraft Visualization"
                                                className="w-full max-w-md h-auto object-contain transition-all duration-500 group-hover:scale-105 group-hover:rotate-1 drop-shadow-2xl"
                                                style={{
                                                    filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.25))",
                                                    transform: "translateZ(0)",
                                                }}
                                            />
                                        </div>

                                        {/* Overlay gradasi */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                                        {/* Efek glow */}
                                        <div className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
                                        <div className="absolute inset-0 rounded-2xl bg-blue-400/10 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 -z-20"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Elemen dekoratif luar */}
                            <div className="absolute -top-6 -right-6 w-8 h-8 bg-blue-500 rounded-full opacity-60 animate-bounce" />
                            <div
                                className="absolute -bottom-6 -left-6 w-6 h-6 bg-blue-400 rounded-full opacity-40 animate-bounce"
                                style={{ animationDelay: "0.5s" }}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
export default HeaderSection;