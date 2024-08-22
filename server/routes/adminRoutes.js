const express = require('express');
const router = express.Router();
const { verifyAdminPassword } = require('../middleware/adminAuth');

// POST route (e.g., creating a new resource)
router.post('/api/admins', async (req, res) => {
  const { password } = req.body;

  if (await verifyAdminPassword(password)) {
    // Perform the create operation
    return res.json({ isAdmin: true });

  } else {
    return res.json({ isAdmin: false });

  }
});

// PUT route (e.g., updating a resource)
router.put('/admin/protected-route/:id', async (req, res) => {
  const { password, data } = req.body;
  const { id } = req.params;

  if (await verifyAdminPassword(password)) {
    // Perform the update operation
    res.status(200).send('Resource updated');
  } else {
    res.status(401).send('Unauthorized');
  }
});

// DELETE route (e.g., deleting a resource)
router.delete('/admin/protected-route/:id', async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;

  if (await verifyAdminPassword(password)) {
    // Perform the delete operation
    res.status(200).send('Resource deleted');
  } else {
    res.status(401).send('Unauthorized');
  }
});

module.exports = router;
