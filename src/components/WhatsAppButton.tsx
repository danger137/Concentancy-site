"use client";

import React from 'react';

const WhatsAppButton = () => {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);

    const phoneNumber = "923264571906"; // WhatsApp number
    const message = encodeURIComponent("Hello! I'm interested in your services. Can you help me?");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    if (!mounted) return null;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float shadow-lg d-flex align-items-center justify-content-center"
            aria-label="Contact us on WhatsApp"
        >
            <i className="fa fa-whatsapp"></i>
            <style jsx>{`
                .whatsapp-float {
                    position: fixed;
                    bottom: 80px;
                    left: 40px;
                    width: 60px;
                    height: 60px;
                    background-color: #25d366;
                    color: white;
                    border-radius: 50%;
                    font-size: 34px;
                    z-index: 9999;
                    transition: all 0.3s ease;
                    text-decoration: none;
                }
                .whatsapp-float:hover {
                    background-color: #128c7e;
                    transform: scale(1.1);
                    color: white;
                }
                @media (max-width: 768px) {
                    .whatsapp-float {
                        width: 60px;
                        height: 60px;
                        font-size: 34px;
                    bottom: 85px;
                    left: 15px;
                }
            }
            `}</style>
        </a>
    );
};

export default WhatsAppButton;
