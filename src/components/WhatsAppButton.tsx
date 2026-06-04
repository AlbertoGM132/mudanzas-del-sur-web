const WHATSAPP_NUMBER = "34659715271";
const WHATSAPP_MESSAGE = encodeURIComponent("Hola, me gustaría solicitar información sobre vuestros servicios de mudanzas.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function WhatsAppButton() {
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
      style={{ backgroundColor: "#25D366" }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8" fill="white" aria-hidden="true">
        <path d="M16.003 2.667C8.639 2.667 2.667 8.639 2.667 16c0 2.347.638 4.641 1.849 6.651L2.667 29.333l6.865-1.802A13.267 13.267 0 0 0 16.003 29.333c7.364 0 13.33-5.972 13.33-13.333 0-7.361-5.966-13.333-13.33-13.333zm0 24.267a11.04 11.04 0 0 1-5.637-1.547l-.403-.24-4.074 1.069 1.088-3.963-.263-.418A11.04 11.04 0 0 1 4.96 16c0-6.09 4.953-11.04 11.043-11.04S27.043 9.91 27.043 16c0 6.09-4.95 11.04-11.04 11.04zm6.057-8.268c-.332-.166-1.963-.968-2.267-1.079-.304-.11-.525-.166-.746.166-.22.332-.856 1.079-1.049 1.3-.193.22-.387.248-.719.083-.332-.166-1.402-.517-2.67-1.648-.987-.88-1.653-1.966-1.847-2.298-.193-.332-.021-.511.145-.677.15-.149.332-.387.498-.581.166-.193.22-.332.332-.553.11-.22.055-.414-.028-.581-.083-.166-.746-1.797-1.022-2.461-.269-.647-.542-.559-.746-.569l-.636-.011c-.22 0-.581.083-.885.414-.304.332-1.16 1.134-1.16 2.765 0 1.631 1.188 3.207 1.354 3.428.166.22 2.337 3.567 5.661 5.001.791.342 1.408.546 1.889.699.794.253 1.517.217 2.088.132.637-.095 1.963-.803 2.239-1.578.276-.775.276-1.44.193-1.578-.082-.138-.304-.22-.636-.387z" />
      </svg>
    </a>
  );
}
