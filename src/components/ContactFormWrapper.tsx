"use client";

import dynamic from 'next/dynamic';
import React from 'react';

// Explicitly type the props matching the ContactForm component
type ContactFormProps = {
  settings: {
    email: string;
    phone: string;
    location: string;
  };
};

// Dynamically import the ContactForm client component to bypass Turbopack SSR HMR bug
const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  ssr: false,
});

export default function ContactFormWrapper(props: ContactFormProps) {
  return <ContactForm {...props} />;
}
