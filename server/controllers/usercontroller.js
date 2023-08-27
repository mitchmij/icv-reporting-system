const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: gmail,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function forgotPassword(req, res) {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Generate a password reset token and set its expiration date
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send the password reset email
    const resetUrl = `http://${req.headers.host}/users/reset-password?token=${token}`;
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: 'Password Reset Request',
        html: `
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
      `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Password reset email sent' });
    } catch
    (err) {
        console.error('Failed to send password reset email:', err);
        res.status(500).json({ error: 'Failed to send password reset email' });
    }
}


async function resetPassword(req, res) {
    // Validate the password reset token
    const token = req.query.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
    // Find the user by their ID and token, and check if the token is still valid
    const user = await User.findOne({
      _id: decodedToken.id,
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });
  
    if (!user) {
      return res.status(401).json({ error: 'Invalid or expired password reset token' });
    }
  
    // Update the user's password and remove the reset token and its expiration date
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
  
    // Send a confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: 'Password Reset Confirmation',
      html: `
        <p>Your password has been successfully reset. If you did not initiate this request, please contact us immediately.</p>
      `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.json({ message: 'Password reset successful' });
    } catch (err) {
      console.error('Failed to send password reset confirmation email:', err);
      res.status(500).json({ error: 'Failed to send password reset confirmation email' });
    }
  }
  

module.exports = {
  forgotPassword,
  resetPassword,
};
