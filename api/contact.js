// Professional Contact Form API with Dual Email System
// Sends admin notification + user confirmation emails

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, company, message, service } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'Missing required fields: name, email, and message are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Configure SMTP transporter for Nexariza AI
    const transporter = nodemailer.createTransporter({
      host: 'smtpout.secureserver.net',
      port: 587,
      secure: false,
      auth: {
        user: 'contact@nexariza.com',
        pass: process.env.SMTP_PASS || 'Nexariza@Ahmad1122'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Admin notification email
    const adminEmailContent = {
      from: 'contact@nexariza.com',
      to: 'contact@nexariza.com',
      subject: `🚀 New AI Consultation Request from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background: #f8fafc;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700;">🚀 Nexariza AI</h1>
            <p style="color: #e5e7eb; margin: 10px 0 0 0; font-size: 18px;">New AI Consultation Request</p>
          </div>
          
          <!-- Content -->
          <div style="background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
            <!-- Priority Alert -->
            <div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 30px; text-align: center;">
              <h2 style="margin: 0; font-size: 20px;">⚡ HIGH PRIORITY LEAD ⚡</h2>
              <p style="margin: 5px 0 0 0; font-size: 14px;">Respond within 24 hours for maximum conversion</p>
            </div>

            <!-- Client Details -->
            <div style="background: #f1f5f9; padding: 25px; border-radius: 10px; margin-bottom: 25px; border-left: 5px solid #3b82f6;">
              <h3 style="color: #1e3a8a; margin: 0 0 20px 0; font-size: 22px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">👤 Client Information</h3>
              
              <div style="display: grid; gap: 15px;">
                <div style="display: flex; align-items: center;">
                  <span style="font-weight: 600; color: #374151; min-width: 120px;">👤 Name:</span>
                  <span style="color: #1f2937; font-size: 16px; font-weight: 500;">${name}</span>
                </div>
                <div style="display: flex; align-items: center;">
                  <span style="font-weight: 600; color: #374151; min-width: 120px;">📧 Email:</span>
                  <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none; font-weight: 500;">${email}</a>
                </div>
                <div style="display: flex; align-items: center;">
                  <span style="font-weight: 600; color: #374151; min-width: 120px;">🏢 Company:</span>
                  <span style="color: #1f2937; font-weight: 500;">${company || 'Not provided'}</span>
                </div>
                <div style="display: flex; align-items: center;">
                  <span style="font-weight: 600; color: #374151; min-width: 120px;">🎯 Service:</span>
                  <span style="color: #1f2937; font-weight: 500;">${service || 'General Inquiry'}</span>
                </div>
              </div>
            </div>
            
            <!-- Message -->
            <div style="background: #fefefe; border: 2px solid #e5e7eb; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
              <h3 style="color: #1e3a8a; margin: 0 0 15px 0; font-size: 20px;">💬 Client Message:</h3>
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; line-height: 1.6; color: #374151; font-size: 15px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>

            <!-- Action Items -->
            <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
              <h3 style="margin: 0 0 15px 0; font-size: 20px;">✅ Next Steps:</h3>
              <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
                <li><strong>Immediate:</strong> Send personalized response within 2 hours</li>
                <li><strong>Follow-up:</strong> Schedule discovery call within 24 hours</li>
                <li><strong>Proposal:</strong> Prepare custom AI solution proposal</li>
                <li><strong>Timeline:</strong> Provide project timeline and pricing</li>
              </ul>
            </div>

            <!-- Quick Actions -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${email}?subject=Re: Your AI Consultation Request&body=Hi ${name},%0D%0A%0D%0AThank you for your interest in Nexariza AI solutions. I'd love to discuss your project in detail.%0D%0A%0D%0AWhen would be a good time for a 30-minute discovery call?%0D%0A%0D%0ABest regards,%0D%0AAhmad Yasin%0D%0AFounder & CEO, Nexariza AI" 
                 style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 0 10px 10px 0; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);">
                📧 Reply to Client
              </a>
              <a href="https://calendly.com/nexariza-ai" target="_blank" 
                 style="display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 0 10px 10px 0; box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);">
                📅 Schedule Call
              </a>
            </div>
            
            <!-- Footer -->
            <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px;">
              <p style="margin: 0;"><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
              <p style="margin: 5px 0 0 0;"><strong>Source:</strong> Nexariza AI Contact Form - www.nexariza.com</p>
              <p style="margin: 10px 0 0 0; font-style: italic;">This is a high-priority lead. Respond quickly for best conversion rates! 🚀</p>
            </div>
          </div>
        </div>
      `,
      text: `
        🚀 NEXARIZA AI - NEW AI CONSULTATION REQUEST
        ==========================================
        
        ⚡ HIGH PRIORITY LEAD - Respond within 24 hours!
        
        👤 CLIENT INFORMATION:
        ----------------------
        Name: ${name}
        Email: ${email}
        Company: ${company || 'Not provided'}
        Service Interest: ${service || 'General Inquiry'}
        
        💬 CLIENT MESSAGE:
        ------------------
        ${message}
        
        ✅ NEXT STEPS:
        --------------
        1. Send personalized response within 2 hours
        2. Schedule discovery call within 24 hours  
        3. Prepare custom AI solution proposal
        4. Provide project timeline and pricing
        
        📧 QUICK REPLY: Reply to ${email}
        📅 SCHEDULE: Set up discovery call
        
        Submission Time: ${new Date().toLocaleString()}
        Source: Nexariza AI Contact Form - www.nexariza.com
        
        This is a high-priority lead. Respond quickly! 🚀
      `
    };

    // User confirmation email
    const userEmailContent = {
      from: 'contact@nexariza.com',
      to: email,
      subject: '🎉 Thank You for Contacting Nexariza AI - Your AI Journey Starts Here!',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background: #f8fafc;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 36px; font-weight: 700;">🚀 Nexariza AI</h1>
            <p style="color: #e5e7eb; margin: 10px 0 0 0; font-size: 20px;">Your AI Transformation Starts Here!</p>
          </div>
          
          <!-- Content -->
          <div style="background: white; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
            <!-- Welcome Message -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h2 style="color: #1e3a8a; margin: 0 0 15px 0; font-size: 28px;">Hello ${name}! 👋</h2>
              <p style="color: #374151; font-size: 18px; line-height: 1.6; margin: 0;">
                Thank you for reaching out to <strong style="color: #3b82f6;">Nexariza AI</strong>! We're excited to learn about your project and help transform your vision into reality.
              </p>
            </div>

            <!-- Confirmation Box -->
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 25px; border-radius: 12px; margin: 30px 0; text-align: center;">
              <h3 style="margin: 0 0 10px 0; font-size: 22px;">✅ Message Received Successfully!</h3>
              <p style="margin: 0; font-size: 16px; opacity: 0.9;">Your inquiry has been delivered to our expert team</p>
            </div>
            
            <!-- Submission Summary -->
            <div style="background: #f1f5f9; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 5px solid #3b82f6;">
              <h3 style="color: #1e3a8a; margin: 0 0 20px 0; font-size: 20px;">📋 Your Submission Summary</h3>
              <div style="display: grid; gap: 12px;">
                <div><strong style="color: #374151;">Service Interest:</strong> <span style="color: #1f2937;">${service || 'General AI Consultation'}</span></div>
                <div><strong style="color: #374151;">Company:</strong> <span style="color: #1f2937;">${company || 'Individual Inquiry'}</span></div>
                <div><strong style="color: #374151;">Submitted:</strong> <span style="color: #1f2937;">${new Date().toLocaleString()}</span></div>
              </div>
            </div>
            
            <!-- What Happens Next -->
            <div style="background: #fefefe; border: 2px solid #e5e7eb; padding: 25px; border-radius: 10px; margin: 25px 0;">
              <h3 style="color: #1e3a8a; margin: 0 0 20px 0; font-size: 22px;">⏰ What Happens Next?</h3>
              <div style="display: grid; gap: 15px;">
                <div style="display: flex; align-items: flex-start; gap: 15px;">
                  <div style="background: #3b82f6; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">1</div>
                  <div>
                    <strong style="color: #1e3a8a;">Immediate Review (Next 2 Hours)</strong>
                    <p style="margin: 5px 0 0 0; color: #6b7280; line-height: 1.5;">Ahmad Yasin or a senior team member will personally review your request and begin crafting a tailored response.</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 15px;">
                  <div style="background: #10b981; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">2</div>
                  <div>
                    <strong style="color: #1e3a8a;">Personalized Response (Within 24 Hours)</strong>
                    <p style="margin: 5px 0 0 0; color: #6b7280; line-height: 1.5;">You'll receive a detailed email with initial insights, relevant case studies, and next steps tailored to your specific needs.</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 15px;">
                  <div style="background: #7c3aed; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">3</div>
                  <div>
                    <strong style="color: #1e3a8a;">Discovery Call (Within 48 Hours)</strong>
                    <p style="margin: 5px 0 0 0; color: #6b7280; line-height: 1.5;">We'll schedule a free 30-minute consultation to dive deep into your requirements and explore how AI can transform your business.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- About Nexariza AI -->
            <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; border-radius: 12px; margin: 30px 0; text-align: center;">
              <h3 style="margin: 0 0 15px 0; font-size: 24px;">🔥 Why Choose Nexariza AI?</h3>
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; opacity: 0.9;">
                Founded in 2024 by Ahmad Yasin, we specialize in transforming innovative ideas into custom AI solutions that deliver real business value. From Neural Networks and LLMs to full-stack integration and enterprise deployment.
              </p>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 25px;">
                <div style="text-align: center;">
                  <div style="font-size: 24px; font-weight: bold; margin-bottom: 5px;">🤝</div>
                  <div style="font-size: 14px; opacity: 0.9;">Lifetime Partnership</div>
                </div>
                <div style="text-align: center;">
                  <div style="font-size: 24px; font-weight: bold; margin-bottom: 5px;">🚀</div>
                  <div style="font-size: 14px; opacity: 0.9;">Custom AI Solutions</div>
                </div>
                <div style="text-align: center;">
                  <div style="font-size: 24px; font-weight: bold; margin-bottom: 5px;">⚡</div>
                  <div style="font-size: 14px; opacity: 0.9;">Real Business Value</div>
                </div>
              </div>
            </div>
            
            <!-- Contact Information -->
            <div style="background: #f8fafc; padding: 25px; border-radius: 10px; margin: 25px 0;">
              <h3 style="color: #1e3a8a; margin: 0 0 20px 0; font-size: 20px;">🌐 Stay Connected</h3>
              <div style="display: grid; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 18px;">🌐</span>
                  <a href="https://www.nexariza.com" style="color: #3b82f6; text-decoration: none; font-weight: 500;">Visit Our Website</a>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 18px;">📧</span>
                  <a href="mailto:contact@nexariza.com" style="color: #3b82f6; text-decoration: none; font-weight: 500;">Direct Email</a>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 18px;">📞</span>
                  <span style="color: #6b7280;">Phone consultation available upon request</span>
                </div>
              </div>
            </div>

            <!-- Quick Response Tip -->
            <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 20px; border-radius: 10px; margin: 25px 0;">
              <div style="display: flex; align-items: flex-start; gap: 15px;">
                <span style="font-size: 24px;">⚡</span>
                <div>
                  <strong style="color: #92400e; font-size: 16px;">Quick Response Tip:</strong>
                  <p style="color: #92400e; margin: 5px 0 0 0; font-size: 14px; line-height: 1.5;">
                    For urgent inquiries, feel free to reply directly to this email. We monitor our inbox continuously and prioritize prompt responses for active prospects.
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="border-top: 2px solid #e5e7eb; padding-top: 25px; text-align: center; color: #6b7280;">
              <p style="margin: 0 0 10px 0; font-size: 16px; color: #1e3a8a; font-weight: 600;">
                Thank you for choosing Nexariza AI to transform your vision into reality! 🚀
              </p>
              <p style="margin: 0; font-size: 14px;">
                <strong>Ahmad Yasin & The Nexariza AI Team</strong><br>
                <em>www.nexariza.com | contact@nexariza.com</em>
              </p>
            </div>
          </div>
          
          <!-- Disclaimer -->
          <div style="text-align: center; margin-top: 20px; padding: 15px;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.4;">
              This is an automated confirmation email. For immediate assistance, please reply directly to this email or contact us at contact@nexariza.com
            </p>
          </div>
        </div>
      `,
      text: `
        🚀 NEXARIZA AI - THANK YOU FOR YOUR INTEREST!
        ============================================
        
        Hello ${name}!
        
        Thank you for reaching out to Nexariza AI! We're excited to learn about your project and help transform your vision into reality.
        
        ✅ MESSAGE RECEIVED SUCCESSFULLY!
        Your inquiry has been delivered to our expert team.
        
        📋 YOUR SUBMISSION SUMMARY:
        ---------------------------
        Service Interest: ${service || 'General AI Consultation'}
        Company: ${company || 'Individual Inquiry'}
        Submitted: ${new Date().toLocaleString()}
        
        ⏰ WHAT HAPPENS NEXT?
        ---------------------
        1. IMMEDIATE REVIEW (Next 2 Hours)
           Ahmad Yasin or a senior team member will personally review your request
        
        2. PERSONALIZED RESPONSE (Within 24 Hours)
           You'll receive a detailed email with insights and next steps
        
        3. DISCOVERY CALL (Within 48 Hours)
           Free 30-minute consultation to explore your requirements
        
        🔥 WHY CHOOSE NEXARIZA AI?
        -------------------------
        Founded in 2024 by Ahmad Yasin, we specialize in transforming innovative ideas into custom AI solutions that deliver real business value.
        
        🤝 Lifetime Partnership • 🚀 Custom AI Solutions • ⚡ Real Business Value
        
        🌐 STAY CONNECTED:
        ------------------
        Website: https://www.nexariza.com
        Email: contact@nexariza.com
        
        ⚡ QUICK RESPONSE TIP:
        For urgent inquiries, reply directly to this email. We monitor continuously and prioritize prompt responses.
        
        Thank you for choosing Nexariza AI to transform your vision into reality! 🚀
        
        Ahmad Yasin & The Nexariza AI Team
        www.nexariza.com | contact@nexariza.com
        
        ---
        This is an automated confirmation email. For immediate assistance, reply to this email.
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminEmailContent),
      transporter.sendMail(userEmailContent)
    ]);

    // Log the submission for debugging
    console.log('Contact form submission processed successfully:', {
      timestamp: new Date().toISOString(),
      name,
      email,
      company,
      service,
      messageLength: message.length,
      emailsSent: 2
    });

    // Return success response
    return res.status(200).json({ 
      message: 'Message sent successfully! We\'ll get back to you within 24 hours. Please check your email for a detailed confirmation with next steps.',
      success: true 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      message: 'Failed to send message. Please try again or contact us directly at contact@nexariza.com',
      success: false,
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}

// Configuration for deployment platforms
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}