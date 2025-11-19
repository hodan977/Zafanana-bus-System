import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function PaymentPage() {
  const { state } = useLocation();
  const booking = state?.booking;
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState(booking?.price || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  const cleanAmount = Math.round(Number(amount));
    
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/daraja/stkpush/', {
        phone,
        amount,
      });
      alert('Payment initiated! Check your phone.');
    } catch (error) {
  if (error.response) {
    console.error("Backend error:", error.response.data);
    alert(`Payment error: ${error.response.data.error || 'Unknown error'}`);
  } else {
    console.error("Network or CORS error:", error);
    alert("Network error or backend unreachable");
  }
}

  };

  return (
    <div className="payment-container">
      <h2>Complete Payment</h2>
      <form onSubmit={handleSubmit}>
        <label>Phone Number:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label>Amount (Ksh):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button type="submit">Pay with M-Pesa</button>
      </form>
    </div>
  );
}

export default PaymentPage;
