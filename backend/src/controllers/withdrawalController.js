const User = require('../models/User');
const WithdrawalRequest = require('../models/WithdrawalRequest');

// @desc    Request a withdrawal
// @route   POST /api/withdrawal/request
// @access  Private
exports.requestWithdrawal = async (req, res, next) => {
  try {
    const { amount, paypalEmail } = req.body;
    const user = await User.findById(req.user.id);

    const withdrawAmount = parseFloat(amount);

    if (isNaN(withdrawAmount) || withdrawAmount < 5) {
      return res.status(400).json({ success: false, message: 'Minimum withdrawal amount is $5.00' });
    }

    if (user.wallet.availableCashback < withdrawAmount) {
      return res.status(400).json({ success: false, message: 'Insufficient available balance' });
    }

    if (!paypalEmail || !paypalEmail.includes('@')) {
      return res.status(400).json({ success: false, message: 'Invalid PayPal email provided' });
    }

    // Deduct from user wallet locally (optimistic lock logic usually applied in heavy production, here simple save is fine)
    user.wallet.availableCashback -= withdrawAmount;
    await user.save();

    // Create the Withdrawal Request
    const withdrawal = await WithdrawalRequest.create({
      userId: user._id,
      amount: withdrawAmount,
      payoutMethod: {
        provider: 'paypal',
        email: paypalEmail
      },
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      data: {
        withdrawal,
        wallet: user.wallet
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
