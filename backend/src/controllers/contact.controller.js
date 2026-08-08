export const handleContactSubmission = async (req, res, next) => {
  try {
    const { name, email, message, service, phone } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide your name, email address, and project details.",
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    console.log("[MadTech New Inquiry Received]:", {
      name,
      email,
      phone: phone || "Not provided",
      service: service || "General inquiry",
      message,
      receivedAt: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      message: "Thank you for reaching out! We will review your project and send your free demo within 48 hours.",
      data: {
        name,
        email,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};
