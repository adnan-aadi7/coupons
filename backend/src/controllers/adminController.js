const Click = require('../models/Click');
const User = require('../models/User');

/**
 * @desc    Simulate an affiliate network conversion (Demo Tool)
 * @route   POST /api/admin/simulate-conversion/:clickId
 */
exports.simulateConversion = async (req, res) => {
  try {
    const click = await Click.findById(req.params.clickId);

    if (!click) {
      return res.status(404).json({ success: false, message: 'Click log not found' });
    }

    if (click.status === 'converted') {
      return res.status(400).json({ success: false, message: 'Click already converted' });
    }

    if (!click.userId) {
      return res.status(400).json({ success: false, message: 'This click was not attributed to a user' });
    }

    // 1. Update Click Status
    click.status = 'converted';
    await click.save();

    // 2. Update User Wallet
    const user = await User.findById(click.userId);
    if (user) {
      const amount = click.estimatedCashback || 1.00;
      
      // Move from theoretical/nothing to pending or available
      // For demo: move directly to available for instant gratification
      user.wallet.availableCashback += amount;
      user.wallet.lifetimeSavings += amount;
      
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Conversion simulated successfully!',
      data: {
        amount: click.estimatedCashback,
        newBalance: user.wallet.availableCashback
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
