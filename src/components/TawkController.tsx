"use client";
import React, { useEffect, useState } from 'react';

declare global {
    interface Window {
        Tawk_API: any;
    }
}

const TawkController = () => {
    const [mounted, setMounted] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const checkTawk = setInterval(() => {
            if (window.Tawk_API) {
                // Pre-existing listeners might be overwritten, so we wrap them
                const oldMaximized = window.Tawk_API.onChatMaximized;
                const oldMinimized = window.Tawk_API.onChatMinimized;

                window.Tawk_API.onChatMaximized = () => {
                    setIsMaximized(true);
                    document.body.classList.add('tawk-full-view');
                    if (oldMaximized) oldMaximized();
                };
                window.Tawk_API.onChatMinimized = () => {
                    setIsMaximized(false);
                    document.body.classList.remove('tawk-full-view');
                    if (oldMinimized) oldMinimized();
                };
                clearInterval(checkTawk);
            }
        }, 500);
        return () => clearInterval(checkTawk);
    }, []);

    // Also close on escape key
    useEffect(() => {
        if (!mounted) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMaximized) {
                window.Tawk_API?.minimize();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isMaximized]);

    if (!isMaximized) return null;

    return (
        <button
            onClick={() => window.Tawk_API?.minimize()}
            className="tawk-close-overlay-btn"
            aria-label="Close Chat"
            title="Close Chat"
        >
            <i className="fa fa-times"></i>
            <style jsx>{`
                .tawk-close-overlay-btn {
                    position: fixed;
                    top: 5px;
                    right: 12px;
                    z-index: 2147483647; /* Highest possible z-index to stay above Tawk.to */
                    background: #ff4d4f; /* Red for clear 'Close' action */
                    color: white;
                    border: 2px solid white;
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    display: none;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.4);
                    transition: all 0.2s ease;
                    cursor: pointer;
                    padding: 0;
                }
                .tawk-close-overlay-btn:hover {
                    transform: scale(1.1);
                    background: #ff7875;
                }
                .tawk-close-overlay-btn:active {
                    transform: scale(0.95);
                }
                @media (max-width: 480px) {
                    .tawk-close-overlay-btn {
                        display: flex;
                    }
                }
            `}</style>
        </button>
    );
};

export default TawkController;
