import React, { useEffect, useState } from "react";
import { Globe, Map, Plane } from "lucide-react";
import { Button } from "./ui/Button";
import FlightMap from "./Maps/FlightsMap";

const ContentSection = ({ isDarkMode, setViewMode, t, viewMode, handleSearchChange, searchQuery, filteredFlights, startIndex, endIndex, currentFlights, totalPages, setCurrentPage, currentPage }) => {
    const [selectedFlight, setSelectedFlight] = useState(null);
   
    useEffect(() => {
        console.log("render ulang")
    }, [selectedFlight]);
    return (
        <section
            id="explore"
            className={`py-20 transition-colors duration-300 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100/50"}`}
        >
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                {/* Toggle Button */}
                {/* <div className="flex justify-center mb-12">
                    <div
                        className={`p-1 rounded-lg border transition-colors duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
                            }`}
                    >
                        <div className="flex gap-2 items-center">
                            <button
                                onClick={() => setViewMode("globe")}
                                className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-200 ${viewMode === "globe"
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : isDarkMode
                                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                    }`}
                            >
                                <Globe className="w-5 h-5" />
                                {t.content.globeView}
                            </button>
                            <button
                                onClick={() => setViewMode("map")}
                                className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-200 ${viewMode === "map"
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : isDarkMode
                                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                    }`}
                            >
                                <Map className="w-5 h-5" />
                                {t.content.mapView}
                            </button>
                        </div>
                    </div>
                </div> */}

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                    {/* Visualization Container */}
                    <div className="xl:col-span-3">
                        <div
                            className={`rounded-2xl border p-8 h-[300px] xl:h-full flex items-center justify-center transition-colors duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
                                }`}
                        >
                            {viewMode === "globe" ? (
                                <Globe className="w-8 h-8 text-blue-400" />
                            ) : (
                                <FlightMap flightData={filteredFlights} selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight} />
                            )}
                        </div>
                    </div>

                    {/* Flight List Table */}
                    <div className="xl:col-span-2">
                        <div
                            className={`rounded-2xl border p-6 transition-colors duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
                                }`}
                        >
                            <h3
                                className={`text-xl font-semibold mb-6 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"
                                    }`}
                            >
                                <Plane className="w-5 h-5 text-blue-400" />
                                {t.content.liveFlights}
                            </h3>

                            {/* Search Input */}
                            <div className="mb-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder={t.content.searchPlaceholder}
                                        value={searchQuery}
                                        onChange={(e) => handleSearchChange(e.target.value)}
                                        className={`w-full px-4 py-2 pl-10 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode
                                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                                            }`}
                                    />
                                    <svg
                                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Results Info */}
                            <div className={`text-sm mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                {filteredFlights.length > 0 ? (
                                    <span>
                                        {t.content.showingResults} {startIndex + 1}-{Math.min(endIndex, filteredFlights.length)}{" "}
                                        {t.content.of} {filteredFlights.length} {t.content.results}
                                    </span>
                                ) : (
                                    <span>{t.content.noResults}</span>
                                )}
                            </div>
                            <div className="space-y-4" >
                                {/* Table Header - Disesuaikan dengan data yang akan ditampilkan */}
                                <div
                                    className={`hidden sm:grid grid-cols-6 gap-4 text-sm font-medium border-b pb-2 ${isDarkMode ? "text-gray-400 border-gray-700" : "text-gray-600 border-gray-300"
                                        }`}
                                >
                                    <div className="col-span-2">Penerbangan</div>
                                    <div className="col-span-2">Rute</div>
                                    <div>Ketinggian</div>
                                    <div>Kecepatan</div>
                                </div>

                                {/* Flight Rows */}
                                <div className="space-y-3 min-h-[300px]">
                                    {currentFlights.length > 0 ? (
                                        (selectedFlight ? [selectedFlight] : currentFlights).map((flight) => (
                                            <div
                                                key={flight.id}
                                                onClick={() => {
                                                    if (selectedFlight && selectedFlight.id === flight.id) {
                                                        setSelectedFlight(null);
                                                    } else {
                                                        setSelectedFlight(flight);
                                                    }
                                                }}
                                                className={`rounded-lg p-3 transition-colors duration-200 ${isDarkMode
                                                        ? "bg-gray-700/50 hover:bg-gray-700"
                                                        : "bg-gray-50 hover:bg-gray-100"
                                                    }`}
                                            >
                                                {/* Desktop Layout */}
                                                <div className="hidden sm:grid grid-cols-6 gap-4 items-center text-sm">
                                                    {/* Kolom 1: Info Penerbangan */}
                                                    <div
                                                        className={`truncate ${isDarkMode ? "text-gray-300" : "text-gray-700"
                                                            } col-span-2`}
                                                    >
                                                        <div
                                                            className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"
                                                                }`}
                                                        >
                                                            {flight.id}
                                                        </div>
                                                        <div className="text-xs">{flight.tooltipInfo.maskapai}</div>
                                                    </div>
                                                    {/* Kolom 2: Info Rute */}
                                                    <div
                                                        className={`truncate ${isDarkMode ? "text-gray-300" : "text-gray-700"
                                                            } col-span-2`}
                                                    >
                                                        <div>{flight.from}</div>
                                                        <div className="text-xs py-0.5">↓</div>
                                                        <div>{flight.to}</div>
                                                    </div>
                                                    {/* Kolom 3: Info Ketinggian */}
                                                    <div
                                                        className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"
                                                            }`}
                                                    >
                                                        {flight.tooltipInfo.ketinggian.toLocaleString("id-ID")} m
                                                    </div>
                                                    {/* Kolom 4: Info Kecepatan */}
                                                    <div
                                                        className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"
                                                            }`}
                                                    >
                                                        {flight.tooltipInfo.kecepatan.toLocaleString("id-ID")} km/j
                                                    </div>
                                                </div>

                                                {/* Mobile Layout */}
                                                <div className="sm:hidden space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span
                                                            className={`font-medium text-base ${isDarkMode ? "text-white" : "text-gray-900"
                                                                }`}
                                                        >
                                                            {flight.id}
                                                        </span>
                                                        <span
                                                            className={`text-xs font-mono px-2 py-1 rounded ${isDarkMode
                                                                    ? "bg-gray-600 text-gray-200"
                                                                    : "bg-gray-200 text-gray-700"
                                                                }`}
                                                        >
                                                            {flight.status}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"
                                                            }`}
                                                    >
                                                        <div className="font-bold">{flight.tooltipInfo.maskapai}</div>
                                                        <div className="mt-1">
                                                            {flight.from} → {flight.to}
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center text-sm pt-2 border-t border-dashed border-gray-500/50">
                                                        <div className="font-medium">
                                                            Alt:{" "}
                                                            <span className={isDarkMode ? "text-white" : "text-gray-900"}>
                                                                {flight.tooltipInfo.ketinggian.toLocaleString("id-ID")} m
                                                            </span>
                                                        </div>
                                                        <div className="font-medium">
                                                            Spd:{" "}
                                                            <span className={isDarkMode ? "text-white" : "text-gray-900"}>
                                                                {flight.tooltipInfo.kecepatan.toLocaleString("id-ID")} km/j
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div
                                            className={`text-center py-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                                }`}
                                        >
                                            <Plane className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                            <p>{t.content.noResults}</p>
                                        </div>
                                    )}

                                </div>
                            </div>
                            {/* Pagination */}
                            {totalPages > 1 && selectedFlight == null && (
                                <div className={`mt-6 pt-4 border-t ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}>
                                    <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3">
                                        {/* Info Halaman */}
                                        <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                            {t.content.page} {currentPage} {t.content.of} {totalPages}
                                        </div>

                                        {/* Navigasi Tombol */}
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {/* Tombol Prev */}
                                            <button
                                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                                disabled={currentPage === 1}
                                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${currentPage === 1
                                                    ? isDarkMode
                                                        ? "text-gray-600 cursor-not-allowed"
                                                        : "text-gray-400 cursor-not-allowed"
                                                    : isDarkMode
                                                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                                    }`}
                                            >
                                                ←
                                            </button>

                                            {/* Nomor Halaman */}
                                            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                                                let pageNum;
                                                if (totalPages <= 5) {
                                                    pageNum = i + 1;
                                                } else if (currentPage <= 3) {
                                                    pageNum = i + 1;
                                                } else if (currentPage >= totalPages - 2) {
                                                    pageNum = totalPages - 4 + i;
                                                } else {
                                                    pageNum = currentPage - 2 + i;
                                                }

                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => setCurrentPage(pageNum)}
                                                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${currentPage === pageNum
                                                            ? "bg-blue-600 text-white"
                                                            : isDarkMode
                                                                ? "text-gray-300 hover:text-white hover:bg-gray-700"
                                                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                                            }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}

                                            {/* Tombol Next */}
                                            <button
                                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                                disabled={currentPage === totalPages}
                                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${currentPage === totalPages
                                                    ? isDarkMode
                                                        ? "text-gray-600 cursor-not-allowed"
                                                        : "text-gray-400 cursor-not-allowed"
                                                    : isDarkMode
                                                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                                    }`}
                                            >
                                                →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}


                            {/* View All Button */}
                            {/* <div className={`mt-6 pt-4 border-t ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}>
                                <Button
                                    variant="outline"
                                    className={`w-full transition-colors duration-200 ${isDarkMode
                                        ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                                        : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        }`}
                                >
                                    {t.content.viewAllFlights}
                                </Button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default ContentSection;