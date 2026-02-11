const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.log(error);

    res.status(typeof error.code === "number" ? error.code : 500).json({
      success: false,
      message: error.message,
    });
  }
};

export { asyncHandler };
