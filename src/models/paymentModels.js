const { connection } = require("../config/DbConnection");
const Razorpay = require("razorpay");

const razorpayInstance = new Razorpay({
  key_id: "rzp_live_eoSbTvVLpGdWgz", // Replace with your Razorpay key ID
  key_secret: "Wwc5h5Cz8eug35Ha1v5a2TrI", // Replace with your Razorpay secret key
});

const PaymentsModel = {
  findPaymentById: (paymentId) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM payments WHERE id = ?";
      connection.query(query, [paymentId], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0] || null);
      });
    });
  },

  createPayment: (paymentData) => {
    return new Promise((resolve, reject) => {
      const card = paymentData.card || {};

      let timestamp = paymentData.created_at;
      let date = new Date(timestamp * 1000);

      let paymentAmount = (paymentData.amount / 100).toFixed(2);

      const query = `
        INSERT INTO payments (
          id, entity, amount, currency, status, method, captured,
          description, card_id, card_name, card_last4, card_network, card_type,
          card_international, card_emi, card_sub_type, bank, wallet, vpa, email,
          contact, notes, fee, tax, error_code, error_description, auth_code,
          created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        paymentData.id,
        paymentData.entity,
        paymentAmount,
        paymentData.currency,
        paymentData.status,
        paymentData.method,
        paymentData.captured,
        paymentData.description || null,

        // Card details
        card.id || null,
        card.name || null,
        card.last4 || null,
        card.network || null,
        card.type || null,
        card.international || false,
        card.emi || false,
        card.sub_type || null,

        // Other fields (setting default null values if missing)
        paymentData.bank || null,
        paymentData.wallet || null,
        paymentData.vpa || null,
        paymentData.email || null,
        paymentData.contact || null,
        paymentData.notes[0] || null,
        paymentData.fee || null,
        paymentData.tax || null,
        paymentData.error_code || null,
        paymentData.error_description || null,
        paymentData.acquirer_data?.auth_code || null, // Safely accessing auth_code
        date,
      ];
      connection.query(query, values, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve({
          id: paymentData.id,
          ...paymentData,
          insertedId: results.insertId, // Optional for debugging
        });
      });
    });
  },

  fetchAllPayments: () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM payments";
      connection.query(query, (err, results) => {
        if (err) {
          console.error("Error fetching all payments:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  },
  generateUpiPaymentLink: (amount, courseName) => {
    return new Promise((resolve, reject) => {
      const paymentData = {
        amount: amount * 100, // Razorpay expects amount in paise (1 INR = 100 paise)
        currency: "INR",
        accept_partial: false, // Optional: Disable partial payments
        reference_id: `order_ref_${Math.floor(Math.random() * 1000000000)}`,
        description: `Payment for ${courseName}`,
        customer: {
          // Add customer details (optional)
          name: "Adil",
          email: "adilkoduru012@gmail.com",
          contact: "9121451353",
        },
        notify: {
          sms: true,
          email: true,
        },
        notes: {
          course_name: courseName,
        },
        callback_url: "http:/localhost:5000/payment/callback", // Optional callback URL
        callback_method: "post", // Optional callback method
      };

      // Use Razorpay's Payment Links API to create a payment link
      razorpayInstance.paymentLink.create(paymentData, (err, paymentLink) => {
        if (err) {
          console.error("Error creating Razorpay payment link:", err);
          return reject({
            message: "Error generating UPI payment link",
            error: err,
          });
        }

        if (paymentLink && paymentLink.short_url) {
          // Razorpay provides the `short_url` for the payment link
          resolve({ upiLink: paymentLink.short_url });
        } else {
          reject(new Error("Failed to generate UPI payment link"));
        }
      });
    });
  },
};
module.exports = PaymentsModel;
