'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Send, Mail, User, MessageSquare } from 'lucide-react'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const ContactUs = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      const recipientEmail = "asiapacificanalyticsclubapu@gmail.com"
      const mailSubject = encodeURIComponent(formData.subject)
      const mailBody = encodeURIComponent(`
        Name: ${formData.name}
        Email: ${formData.email}
        
        Message:
        ${formData.message}
      `)
  
      const mailtoLink = `mailto:${recipientEmail}?subject=${mailSubject}&body=${mailBody}`
      window.location.href = mailtoLink
  
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(()=>{
        setSubmitMessage('Your message has been prepared in your email client!');
        setSubmitMessage('');
      },3000)
      
    } else {
      setTimeout(()=>{
        setSubmitMessage('Please fill in all required fields correctly.')
        setSubmitMessage('');
      },3000)
      
    }
   
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#DCFFBD] via-[#CC86D1] to-purple-400 flex items-center justify-center px-4 py-16">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-white/20 to-transparent rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-7xl"
      >
        <div className="backdrop-blur-lg bg-white/30 rounded-3xl border border-white/30 shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-stretch">
            {/* Form Section */}
            <div className="flex-1 p-8 md:p-12">
              <div className="text-center md:text-left mb-8">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                >
                  Get in Touch
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-gray-600"
                >
                  We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.

                </motion.p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-black h-5 w-5" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className={`w-full pl-10 pr-4 py-3 bg-white/70 backdrop-blur-sm rounded-xl border ${
                        errors.name ? 'border-red-500' : 'border-transparent'
                      } focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black h-5 w-5" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className={`w-full pl-10 pr-4 py-3 bg-white/70 backdrop-blur-sm rounded-xl border ${
                        errors.email ? 'border-red-500' : 'border-transparent'
                      } focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 text-black h-5 w-5" />
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Message Subject"
                      className={`w-full pl-10 pr-4 py-3 bg-white/70 backdrop-blur-sm rounded-xl border ${
                        errors.subject ? 'border-red-500' : 'border-transparent'
                      } focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200`}
                    />
                    {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                  </div>

                  <div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message for us"
                      rows={5}
                      className={`w-full p-4 bg-white/70 backdrop-blur-sm rounded-xl border ${
                        errors.message ? 'border-red-500' : 'border-transparent'
                      } focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200`}
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>

                {submitMessage && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center text-sm ${
                      submitMessage.includes('error') ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {submitMessage}
                  </motion.p>
                )}
              </form>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-white/30 self-stretch mx-2" />

            {/* Image Section */}
            <div className="flex-1 flex flex-col relative items-center justify-center h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="h-full min-h-[300px] md:min-h-full relative"
              >
                <Image
                  src="/contactus.png"
                  alt="Contact Us"
                  width={700}
                  height={1500}
                  className=" py-10"

                  priority
                />
               
              </motion.div>
             
            </div> 
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ContactUs