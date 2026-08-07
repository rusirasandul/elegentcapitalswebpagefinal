import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const phoneNumber = '+94711545460'; // Sri Lanka phone number format
  const message = 'Hello! I would like to know more about Elegant Capitals services.';

  const handleWhatsAppClick = () => {
    // Format: https://wa.me/[country-code][phone-number]?text=[message]
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-40 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
      style={{
        background: 'linear-gradient(135deg, #25D366, #128C7E)',
        boxShadow: '0 4px 20px rgba(37, 211, 102, 0.3)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 6px 30px rgba(37, 211, 102, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.3)';
      }}
      aria-label="Contact us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </button>
  );
};

export default WhatsAppButton;
