import { Button } from "./ui/Button";
const ContactSection = ({t,isDarkMode}) => {
    return (
       <section
                id="contact"
                className={`py-20 transition-colors duration-300 ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100/50"}`
                }
            >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className={`text-3xl lg:text-4xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {t.contact.title}
                    </h2>
                    <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {t.contact.description}
                    </p>
                    <Button onClick={() => { window.location.href = "mailto:rezaghiyatsfikri2023@gmail.com";}} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold">
                        {t.contact.cta}
                    </Button>
                </div>
            </section >
    )
}
export default ContactSection;