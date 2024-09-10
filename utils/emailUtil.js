// const nodemailer = require("nodemailer");

// // Create a transporter object using your email service configuration
// const transporter = nodemailer.createTransport({
//   // service: 'gmail', // Email service provider
//   // auth: {
//   //     user: 'testingkevin006900@gmail.com', // Your email address
//   //     pass: 'your-email-password', // Your email password or app password
//   // },

//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // true for port 465, false for other ports
//   auth: {
//     user: "maddison53@ethereal.email",
//     pass: "jn7jnAPss4f63QBp6D",
//   },
// });

// // Function to send an email
// const sendEmail = async (to, subject, text, html) => {
//   if (!to) {
//       throw new Error('No recipients defined');
//   }

//   const mailOptions = {
//       from: 'testing006900@gmail.com',
//       to, // List of recipients
//       subject,
//       text,
//       html,
//   };

//   try {
//       await transporter.sendMail(mailOptions);
//       console.log('Email sent successfully');
//   } catch (error) {
//       console.error('Error sending email:', error);
//       throw new Error('Failed to send email');
//   }
// };
// module.exports = sendEmail;







const nodemailer = require('nodemailer');

// Create a transporter object using Gmail’s configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail's service
  auth: {
    user: 'testing006900@gmail.com', // Your Gmail address
    pass: 'eyzw srnk xadx isjb',
  },
});

// Function to send an email
const sendEmail = async (to, subject, text, html) => {
  if (!to) {
    throw new Error('No recipients defined');
  }

  const mailOptions = {
    from: 'testing006900@gmail.com', // Sender address
    to, // List of recipients
    subject,
    text,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;
