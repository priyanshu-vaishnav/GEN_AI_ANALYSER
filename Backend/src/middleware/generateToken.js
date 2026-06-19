async function generateToken(res, user) {
  const token = jwt.sign(
    { id: user._id },
    process.env.JWSKEY,
    { expiresIn: "24h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // local pe false, prod pe true
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });
}