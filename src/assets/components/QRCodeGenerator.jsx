import { useState } from "react";

const QRCodeGenerator = () => {
  const [inputData, setInputData] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const generateQRCode = () => {
    if (inputData) {
      const url = `http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        inputData
      )}&size=150x150`;
      setQrCodeUrl(url);
    }
  };

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QR Code',
          text: 'Here is your generated QR Code',
          url: qrCodeUrl,
        });
        console.log('QR Code shared successfully');
      } catch (error) {
        console.error('Error sharing QR Code:', error);
      }
    } else {
      alert('Sharing is not supported in this browser');
    }
  };

  return (
    <div className="p-4 text-center items-center">
      <h1 className="text-center font-bold mb-4">QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter text or URL"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        className="border p-5 mb-6 w-40 h-4 text-center"
      />
      <button
        onClick={generateQRCode}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Generate QR Code
      </button>
      {qrCodeUrl && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Your QR Code:</h2>
          <img className="mx-auto mb-4" src={qrCodeUrl} alt="Generated QR Code" />
          <button
            onClick={shareQRCode}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Share QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;