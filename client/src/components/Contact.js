import React, { useEffect, useState } from "react";
import { Mail, Phone, Linkedin, Github } from "lucide-react";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Contact = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const { colorSchemes, colorScheme } = useContext(ThemeContext);


  useEffect(() => {
    fetch("https://eazybyts-portfolio-website.onrender.com/api/contact")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched contact:", data);
        setContact(data);
      })
      .catch((err) => {
        console.error("Error fetching contact:", err);
      })
      .finally(() => {
        // Ensure loading is stopped even if error occurs
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading contact info...</p>;
  if (!contact || Object.keys(contact).length === 0) return <p className="text-center mt-10 text-red-500">No contact info found.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl space-y-4">
      <h1 className={`text-3xl font-bold text-center ${colorSchemes[colorScheme].text}`}>Contact Information</h1>

      <div className="flex items-center gap-3 text-gray-700">
        <Mail className="text-gray-600" />
        <a href={`mailto:${contact.email}`} className="hover:underline text-blue-600">
          {contact.email}
        </a>
      </div>

      <div className="flex items-center gap-3 text-gray-700">
        <Phone className="text-gray-600" />
        <a href={`tel:${contact.phone}`} className="hover:underline text-blue-600">
          Telephone
        </a>
      </div>

      <div className="flex items-center gap-3 text-gray-700">
        <Linkedin className="text-gray-600" />
        <a href={contact.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
          LinkedIn Profile
        </a>
      </div>

      <div className="flex items-center gap-3 text-gray-700">
        <Github className="text-gray-600" />
        <a href={contact.github} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
          GitHub Profile
        </a>
      </div>
    </div>
  );
};

export default Contact;
