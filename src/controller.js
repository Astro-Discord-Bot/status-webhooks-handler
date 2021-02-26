exports.handleStatusWebhook = (req, res) => {
  // testing
  console.log(req.body);

  res.status(200).json({ message: 'Status webhook received and handled successfully' });
}