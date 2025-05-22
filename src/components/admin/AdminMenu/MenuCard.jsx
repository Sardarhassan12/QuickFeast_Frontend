import React, { useState, useRef } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import QRCodeLib from 'qrcode';

const MenuCard = ({ menu, onDelete }) => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [tableCount, setTableCount] = useState('');
  const [tableLinks, setTableLinks] = useState([]);
  const qrContainerRef = useRef(null);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this menu?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/menu/${menu._id}`);
        onDelete();
      } catch (err) {
        console.error('Error deleting menu', err);
        alert('Failed to delete menu');
      }
    }
  };

  const handleGenerateQR = () => {
    setIsQRModalOpen(true);
  };

  const handleSubmitTables = async (e) => {
    e.preventDefault();
    if (!tableCount || tableCount <= 0) {
      alert('Please enter a valid number of tables');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/generate-qr', {
        menuId: menu._id,
        tableCount: parseInt(tableCount)
      });
      setTableLinks(response.data.tableLinks);
    } catch (err) {
      console.error('Error generating QR codes', err);
      alert('Failed to generate QR codes');
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const pdf = new jsPDF();
      const qrElements = qrContainerRef.current.querySelectorAll('.qr-code');

      for (let i = 0; i < qrElements.length; i++) {
        const qr = qrElements[i];
        // Create a clean wrapper to avoid parent styles
        const wrapper = document.createElement('div');
        wrapper.style.backgroundColor = '#ffffff';
        wrapper.style.padding = '10px';
        wrapper.appendChild(qr.cloneNode(true));
        document.body.appendChild(wrapper);

        const canvas = await html2canvas(wrapper, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff'
        });

        document.body.removeChild(wrapper);

        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, 20, pdfWidth - 20, pdfHeight);
        pdf.text(`Table ${qr.dataset.tableNumber}`, pdfWidth / 2, 10, { align: 'center' });
      }

      pdf.save(`QR_Codes_${menu.title}.pdf`);
    } catch (err) {
      console.error('Error generating PDF', err);
      alert('Failed to generate PDF');
    }
  };

  const handleDownloadSingleQR = async (url, tableNumber) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 180;
      const ctx = canvas.getContext('2d');

      // Generate QR code using qrcode library
      await QRCodeLib.toCanvas(canvas, url, {
        width: 150,
        margin: 0,
        color: { dark: '#000000', light: '#ffffff' }
      });

      // Add table number text
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#000000';
      ctx.fillText(`Table ${tableNumber}`, canvas.width / 2, 15);

      // Trigger download
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `Table_${tableNumber}_QR.png`;
      link.click();
    } catch (err) {
      console.error('Error generating QR code for download', err);
      alert('Failed to download QR code');
    }
  };

  const handleCloseModal = () => {
    setIsQRModalOpen(false);
    setTableCount('');
    setTableLinks([]);
  };

  return (
    <div className="w-[300px] bg-white rounded-xl shadow-lg overflow-hidden relative text-black">
      <div className="h-40 w-full bg-gray-200">
        {menu.image ? (
          <img src={`http://localhost:3000${menu.image}`} alt="Menu" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
        )}
      </div>
      <div className="p-4 text-gray-800">
        <h2 className="text-xl font-bold">{menu.title}</h2>
        <p className="text-sm mt-2">Categories: {menu.categoryCount}</p>
        <p className="text-sm">Items: {menu.itemCount}</p>
        <button
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm hover:bg-red-600"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleGenerateQR}
        >
          Generate QR Codes
        </button>
      </div>
      {isQRModalOpen && (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} className="fixed inset-0 flex justify-center items-center text-black">
          <div style={{ backgroundColor: '#ffffff' }} className="p-6 rounded-xl shadow-lg max-h-[80vh] overflow-y-auto">
            <h2 style={{ color: '#000000' }} className="text-lg font-bold mb-4">Generate QR Codes for {menu.title}</h2>
            {!tableLinks.length ? (
              <div >
                <label style={{ color: '#000000' }} className="block mb-2">
                  Number of Tables:
                  <input
                    type="number"
                    value={tableCount}
                    onChange={(e) => setTableCount(e.target.value)}
                    style={{ borderColor: '#000000', borderWidth: '2px', padding: '8px', width: '100%', borderRadius: '4px', marginTop: '4px' }}
                    min="1"
                    required
                  />
                </label>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={handleCloseModal}
                    style={{ borderColor: '#000000', borderWidth: '2px', padding: '8px 16px', borderRadius: '4px' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitTables}
                    style={{ backgroundColor: '#3b82f6', color: '#ffffff', padding: '8px 16px', borderRadius: '4px' }}
                  >
                    Generate
                  </button>
                </div>
              </div>
            ) : (
              <div ref={qrContainerRef}>
                <div className="grid grid-cols-2 gap-4 text-black">
                  {tableLinks.map(({ tableNumber, url }) => (
                    <div key={tableNumber} className="text-center qr-code" data-table-number={tableNumber} style={{ backgroundColor: '#ffffff', padding: '10px' }}>
                      <p style={{ color: '#000000', fontWeight: '600' }}>Table {tableNumber}</p>
                      <QRCode value={url} size={150} bgColor="#ffffff" fgColor="#000000" />
                      <button
                        onClick={() => handleDownloadSingleQR(url, tableNumber)}
                        style={{ color: '#3b82f6', marginTop: '8px' }}
                      >
                        Download QR
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-4 mt-4 text-black">
                  <button
                    onClick={handleDownloadPDF}
                    style={{ backgroundColor: '#10b981', color: '#ffffff', padding: '8px 16px', borderRadius: '4px' }}
                  >
                    Download All as PDF
                  </button>
                  <button
                    onClick={handleCloseModal}
                    style={{ borderColor: '#000000', borderWidth: '2px', padding: '8px 16px', borderRadius: '4px' }}
                    className='text-black'
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuCard;