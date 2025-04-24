import { Mail, Phone, Globe, Home } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import emailjs from "emailjs-com";

export default function BusinessCard() {
  const qrRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [showPopup, setShowPopup] = useState(false);
  const [sharePopup, setSharePopup] = useState(false);
  const [formPopup, setFormPopup] = useState(false);

  useEffect(() => {
    const canvas = qrRef.current;
    if (canvas) {
      QRCode.toCanvas(canvas, "https://lakeviewmortgage.mymortgage-online.com/loan-app/?siteId=1097684050&lar=tburchfield&workFlowId=97054", { width: 128 }, function (error) {
        if (error) console.error(error);
      });
    }
  }, []);

  const handleVCardDownload = () => {
    const vcardData = `BEGIN:VCARD\nVERSION:3.0\nFN:Tiffany Burchfield\nTITLE:Branch Manager\nORG:Lakeview Mortgage Corp.\nURL;TITLE:https://mylendertiffany.com\nEMAIL;type=INTERNET;TYPE=WORK:tburchfield@Lmbankers.com\nTEL;type=CELL:+1 (678) 943-0996\nTEL;type=WORK:+1 (646) 452-5004\nTEL;type=FAX:+1 (516) 882-2169\nADR:;;1735 Pennsylvania Ave;McDonough;GA;30253;USA\nNOTE:NMLSR: 1614501\nEND:VCARD`;
    const blob = new Blob([vcardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Tiffany_Burchfield.vcf';
    link.click();
    URL.revokeObjectURL(url);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleShare = () => {
    handleVCardDownload();
    emailjs.send("service_ypou10m", "template_915j5je", {
      to_name: "Tiffany Burchfield",
      message: "Your contact info was just shared!"
    }, "GPvLctaWqRZ_V_o-k");
    setSharePopup(true);
    setTimeout(() => setSharePopup(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send("service_ypou10m", "template_iq6lmem", {
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone,
      message: formData.message,
    }, "GPvLctaWqRZ_V_o-k").then(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setFormPopup(true);
      setTimeout(() => setFormPopup(false), 3000);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDE9E3] p-4">
      <div className="max-w-md w-full p-6 rounded-2xl shadow-lg bg-[#E7D7C9]">
        {showPopup && (
          <div className="mb-4 text-center text-[#A38F85] font-semibold">
            I look forward to working with you!
          </div>
        )}
        {sharePopup && (
          <div className="mb-4 text-center text-[#A38F85] font-semibold">
            Contact downloaded — you can now share it via text or email.
          </div>
        )}

        <div className="text-center">
          <img src="/539A0076.jpg" alt="Tiffany Burchfield" className="w-32 h-40 mx-auto mb-4 object-contain" />
          <h1 className="text-2xl font-bold text-[#A38F85]">Tiffany Burchfield</h1>
          <p className="text-[#A38F85]">Branch Manager | NMLSR: 1614501</p>
        </div>

        <div className="mt-6 space-y-4 text-[#D4B2A7]">
          <div className="flex items-center space-x-3"><Mail className="w-5 h-5" /><span>tburchfield@Lmbankers.com</span></div>
          <div className="flex items-center space-x-3"><Phone className="w-5 h-5" /><span>M: (678) 943-0996</span></div>
          <div className="flex items-center space-x-3"><Phone className="w-5 h-5" /><span>O: (646) 452-5004</span></div>
          <div className="flex items-center space-x-3"><Phone className="w-5 h-5" /><span>F: (516) 882-2169</span></div>
          <div className="flex items-center space-x-3"><Globe className="w-5 h-5" /><a href="https://lakeviewmortgage.mymortgage-online.com/loan-app/?siteId=1097684050&lar=tburchfield&workFlowId=97054" className="text-[#a96c65] hover:underline">Apply Now!</a></div>
          <div className="flex items-center space-x-3"><Home className="w-5 h-5" /><span>1735 Pennsylvania Ave McDonough, GA 30253</span></div>

          <div className="mt-4 space-y-2">
            <button className="w-full bg-[#e4cfc3] text-[#7a645c] p-2 rounded-md" onClick={handleVCardDownload}>Save Contact</button>
            <button className="w-full border border-[#e4cfc3] text-[#7a645c] p-2 rounded-md" onClick={handleShare}>Share Contact</button>
          </div>

          <div className="flex justify-center"><canvas ref={qrRef} className="mt-4" /></div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="w-full p-2 border border-gray-300 rounded-md bg-[#fef7f4]" />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" className="w-full p-2 border border-gray-300 rounded-md bg-[#fef7f4]" />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone Number" className="w-full p-2 border border-gray-300 rounded-md bg-[#fef7f4]" />
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" className="w-full p-2 border border-gray-300 rounded-md bg-[#fef7f4]" />
          {formPopup && (
            <div className="text-center text-[#a96c65] font-semibold">
              Your message has been sent.
            </div>
          )}
          <button type="submit" className="w-full bg-[#e4cfc3] text-[#7a645c] p-2 rounded-md">Send Message</button>
        </form>

        <div className="text-xs text-[#a96c65] mt-6">
          <p className="mt-2 font-semibold">Lakeview Mortgage Bankers Corp.</p>
          <p>NMLS: 34690</p>
          <p>Corporate Address: 5512 Merrick Rd Massapequa, NY 11758</p>
          <p>Telephone: (516) 264-7040</p>
          <p>Licensed Lender in CO, CT, FL, GA, IL, MD, MI, NJ, NY, PA, VA</p>
          <p>Licensed Broker in CO, CT, FL, GA, IL, MD, MI, NJ, NY, PA, SC, VA</p>
          <p>GA/SC DBA Name: Lakeview Mortgage Corp.</p>
          <p>PA DBA Name: Lakeview Lenders Corp.</p>
        </div>
        <div className="flex items-center space-x-3 mt-2">
          <Globe className="w-5 h-5" />
          <a href="https://www.lmbankers.com" className="text-[#a96c65] hover:underline">Visit Us Online</a>
        </div>

        <div className="text-xs text-[#a96c65] mt-4">
          <p className="mb-2 font-semibold">WIRE FRAUD NOTICE:</p>
          <p>Never wire funds to any accounts without calling the corresponding office to confirm wire information and authenticity. All wire transfers are subject to verbal verification.</p>
        </div>

        <div className="mt-4 flex flex-col items-center gap-2">
          <img src="/Logo.jpg" alt="Lakeview Logo" className="h-10" />
          <img src="/equal housing.png" alt="Equal Housing Opportunity" className="h-6" />
        </div>
      </div>
    </div>
  );
}
