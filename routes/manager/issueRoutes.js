const express = require('express');
const router = express.Router();
const {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
  deleteIssue
} = require('../../controllers/issueController');

const authMiddleware = require('../../middleware/authMiddleware');
const roleMiddleware = require('../../middleware/roleMiddleware');

// Manager-only routes
router.use(authMiddleware, roleMiddleware(['manager']));

router.route('/')
  .post(createIssue)
  .get(getAllIssues);

router.route('/:id')
  .get(getIssueById)
  .patch(updateIssue)
  .delete(deleteIssue);

module.exports = router;
