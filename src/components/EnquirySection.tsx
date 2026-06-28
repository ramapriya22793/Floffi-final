import { useState } from 'react';
import shelfDisplay from '../assets/shelf_display.png';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function EnquirySection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the WhatsApp message
    const phoneNumber = "918754887774"; // Adding country code (assuming India based on the number style, but just the number works too)
    const textMessage = `*New Enquiry from Floffi Website!*%0a%0a*Name:* ${formData.name}%0a*Email:* ${formData.email}%0a*Phone:* ${formData.phone || 'Not provided'}%0a%0a*Message:*%0a${formData.message}`;
    
    // Open WhatsApp in a new tab
    window.open(`https://wa.me/${phoneNumber}?text=${textMessage}`, '_blank');

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="enquiry-premium-section" style={{ padding: '40px 20px 100px 20px', position: 'relative', background: 'linear-gradient(to bottom, #F9F7F4, #FFFFFF)' }}>
      <style>
        {`
          .enquiry-premium-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 40px;
            box-shadow: 0 30px 60px rgba(62, 39, 35, 0.08);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative;
            border: 1px solid rgba(62,39,35,0.05);
          }
          @media (min-width: 992px) {
            .enquiry-premium-container {
              flex-direction: row;
            }
          }
          
          /* Left Side: Visuals */
          .enquiry-visual {
            background: linear-gradient(135deg, #FF8C00, #E65100);
            color: white;
            padding: 60px 40px;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          @media (min-width: 992px) {
            .enquiry-visual {
              width: 40%;
              padding: 60px;
            }
          }
          .visual-bg-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.12;
            mix-blend-mode: overlay;
          }
          .visual-content {
            position: relative;
            z-index: 10;
          }
          .visual-title {
            font-family: var(--font-heading, serif);
            font-size: clamp(1.8rem, 4vw, 2.4rem);
            font-weight: 800;
            margin-bottom: 20px;
            line-height: 1.3;
            color: white !important; /* Force white over global h2 */
          }
          .visual-text {
            color: rgba(255,255,255,0.95);
            font-size: 1.15rem;
            line-height: 1.6;
            margin-bottom: 40px;
            font-weight: 500;
          }
          .contact-methods {
            display: flex;
            flex-direction: column;
            gap: 24px;
            margin-top: auto;
            position: relative;
            z-index: 10;
          }
          .contact-method {
            display: flex;
            align-items: center;
            gap: 16px;
          }
          .contact-icon-box {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: white; /* White box on orange background */
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .contact-detail {
            font-weight: 600;
            letter-spacing: 0.05em;
            font-size: 1.05rem;
          }
          
          /* Right Side: Form */
          .enquiry-form-wrapper {
            padding: 50px 30px;
            background: white;
            position: relative;
          }
          @media (min-width: 992px) {
            .enquiry-form-wrapper {
              width: 60%;
              padding: 80px;
            }
          }
          .form-title {
            font-family: var(--font-heading, serif);
            font-size: 2rem;
            color: var(--earthy-brown, #3E2723);
            margin-bottom: 40px;
            position: relative;
            display: inline-block;
          }
          .form-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 0;
            width: 40px;
            height: 3px;
            background: #F97316; /* Orange underline */
            border-radius: 2px;
          }
          
          /* Floating Label Inputs */
          .input-group {
            position: relative;
            margin-bottom: 32px;
          }
          .row-group {
            display: flex;
            flex-direction: column;
            gap: 32px;
            margin-bottom: 32px;
          }
          @media (min-width: 768px) {
            .row-group {
              flex-direction: row;
              gap: 24px;
            }
            .row-group .input-group {
              flex: 1;
              margin-bottom: 0;
            }
          }
          .modern-input {
            width: 100%;
            background: transparent;
            border: none;
            border-bottom: 2px solid rgba(62,39,35,0.1);
            padding: 12px 0;
            font-size: 1.1rem;
            color: var(--earthy-brown, #3E2723);
            transition: all 0.3s ease;
            font-family: inherit;
          }
          .modern-input:focus {
            outline: none;
            border-bottom-color: #F97316;
          }
          .modern-label {
            position: absolute;
            top: 12px;
            left: 0;
            font-size: 1.1rem;
            color: rgba(62,39,35,0.5);
            pointer-events: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-weight: 500;
          }
          .modern-input:focus ~ .modern-label,
          .modern-input:not(:placeholder-shown) ~ .modern-label {
            top: -20px;
            font-size: 0.85rem;
            color: #F97316;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
          
          .btn-creative {
            background: linear-gradient(135deg, #FF8C00, #E65100);
            color: white;
            border: none;
            padding: 20px 48px;
            border-radius: 40px;
            font-family: inherit;
            font-size: 1.1rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 10px 20px rgba(230, 81, 0, 0.3);
            margin-top: 20px;
          }
          .btn-creative:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 30px rgba(230, 81, 0, 0.4);
            background: linear-gradient(135deg, #FF9800, #F57C00);
          }
          .btn-creative:active {
            transform: translateY(0);
          }
          .btn-icon {
            transition: transform 0.3s ease;
          }
          .btn-creative:hover .btn-icon {
            transform: translateX(6px) translateY(-4px);
          }
          
          .success-banner {
            background: #e8f5e9;
            border-left: 4px solid #2e7d32;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            gap: 16px;
            color: #1b5e20;
            font-weight: 600;
            animation: slideIn 0.5s ease;
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div className="enquiry-premium-container">
        
        {/* Left Side */}
        <div className="enquiry-visual">
          <img src={shelfDisplay} alt="Floffi Background" className="visual-bg-image" />
          <div className="visual-content">
            <h2 className="visual-title">Distributors/Resellers Enquiry</h2>
            <p className="visual-text">
              We'd absolutely love to hear from you. Send us your questions, feedback, or any sweet ideas you might have!
            </p>
          </div>
          
          <div className="contact-methods">
            <div className="contact-method">
              <div className="contact-icon-box">
                <Mail size={20} color="#E65100" />
              </div>
              <span className="contact-detail">hello@floffi.com</span>
            </div>
            <div className="contact-method">
              <div className="contact-icon-box">
                <Phone size={20} color="#E65100" />
              </div>
              <span className="contact-detail">+91 87547 87774</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="enquiry-form-wrapper">
          <h3 className="form-title">Send an Enquiry</h3>
          
          {isSubmitted && (
            <div className="success-banner">
              <div style={{ background: '#2e7d32', borderRadius: '50%', padding: '4px', display: 'flex' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              Your message has been sent beautifully. We'll be in touch!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row-group">
              <div className="input-group">
                <input 
                  type="text" 
                  name="name" 
                  id="name"
                  className="modern-input" 
                  placeholder=" " 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
                <label htmlFor="name" className="modern-label">Your Name</label>
              </div>
              <div className="input-group">
                <input 
                  type="email" 
                  name="email" 
                  id="email"
                  className="modern-input" 
                  placeholder=" " 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
                <label htmlFor="email" className="modern-label">Email Address</label>
              </div>
            </div>

            <div className="input-group">
              <input 
                type="tel" 
                name="phone" 
                id="phone"
                className="modern-input" 
                placeholder=" " 
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <label htmlFor="phone" className="modern-label">Phone Number</label>
            </div>

            <div className="input-group" style={{ marginTop: '40px' }}>
              <textarea 
                name="message" 
                id="message"
                className="modern-input" 
                style={{ resize: 'vertical', minHeight: '120px' }}
                placeholder=" " 
                value={formData.message}
                onChange={handleChange}
                required 
              ></textarea>
              <label htmlFor="message" className="modern-label">How can we help you?</label>
            </div>

            <button type="submit" className="btn-creative">
              Send Message <Send size={18} className="btn-icon" />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
