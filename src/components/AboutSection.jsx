import { User, GraduationCap, MapPin, Calendar, Mail, Github, Linkedin, Award } from 'lucide-react';
import { Button } from "../components/ui/Button";

const AboutSection = ({ t, isDarkMode }) => {
    const data  = t.about

    return (
        <section id="about" className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {t.about.title}
                    </h2>
                    <p className={`text-lg mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {t.about.subtitle}
                    </p>
                </div>

                <div className={`rounded-2xl p-8 border shadow-md transition-colors duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDarkMode ? "bg-blue-600" : "bg-blue-100"}`}>
                            <User className={`w-8 h-8 ${isDarkMode ? "text-white" : "text-blue-600"}`} />
                        </div>
                        <div>
                            <h3 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                {data.name}
                            </h3>
                            <p className={`text-base ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                                {data.title}
                            </p>
                        </div>
                    </div>

                    <p className={`text-base leading-relaxed mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {data.bio}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div className="flex gap-3 items-center">
                            <GraduationCap className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                            <div className='flex flex-col items-start'>
                                <p className="text-sm text-gray-500">{data.pendidikan}</p>
                                <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{data.school}</p>
                                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{data.major} - {data.year}</p>
                            </div>
                        </div>

                        <div className="flex gap-3 items-center">
                            <MapPin className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                            <div className='flex flex-col items-start'>
                                <p className="text-sm text-gray-500">{data.lokasi}</p>
                                <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{data.location}</p>
                            </div>
                        </div>

                        <div className="flex gap-3 items-center">
                            <Mail className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                            <div className='flex flex-col items-start'>
                                <p className="text-sm text-gray-500">Email</p>
                                <a href={`mailto:${data.email}`} className={`font-medium hover:underline ${isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}>{data.email}</a>
                            </div>
                        </div>

                        <div className="flex gap-3 items-center">
                            <Calendar className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                            <div className='flex flex-col items-start'>
                                <p className="text-sm text-gray-500">{data.tahunlulus}</p>
                                <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{data.year}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 flex gap-4 flex-col">
                        <h4 className={`text-lg font-semibold mb-2 xl:ml-5 text-start ${isDarkMode ? "text-white" : "text-gray-900"}`}>Prestasi & Kompetisi</h4>
                        <ul className="space-y-2">
                            {data.competitions.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-start">
                                    <Award className={`w-5 h-5 mt-1 shrink-0 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                                    <span className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex gap-4 flex-wrap">
                        <a
                            href={`https://github.com/${data.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow transition-colors duration-200 ${isDarkMode
                                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                                }`}
                        >
                            <Github className="w-4 h-4" />
                            GitHub
                        </a>

                        <a
                            href={`https://linkedin.com/in/${data.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow transition-all duration-200 ${isDarkMode
                                    ? "bg-blue-500 hover:bg-blue-600"
                                    : "bg-blue-700 hover:bg-blue-400"
                                }`}
                        >
                            <Linkedin className="w-4 h-4 text-white" />
                            <p className="text-white">LinkedIn</p>
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection;
