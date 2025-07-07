const Issue=require('../models/issueModel');
//@desc Create a new Issue
const createIssue = async (req, res) => {
  try {
    const { title, description, priority, unit } = req.body;
    const reportedBy = req.user._id;

    const issue = await Issue.create({
      title,
      description,
      priority,
      reportedBy: req.user.id,
      unit,
    });

    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all issues (for manager)
const getAllIssues = async (req, res) => {
  try {
    const query = {};
    const { status, priority, unit } = req.query;

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (unit) query.unit = unit;

    const issues = await Issue.find(query)
      .populate('reportedBy', 'name email')
      .populate('assignedTo', 'name role')
      .populate({
        path: 'unit',
        populate: { path: 'building', select: 'name address' }
      })
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single issue
const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate('reportedBy', 'name email')
      .populate('assignedTo', 'name role')
      .populate({
        path: 'unit',
        populate: { path: 'building', select: 'name address' }
      });

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// @desc    Update issue (status, assign staff,


const updateIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status, assignedTo } = req.body;

    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    // Optional: Validate staff ID
    if (assignedTo) {
      const staffExists = await Staff.findById(assignedTo);
      if (!staffExists) {
        return res.status(400).json({ message: 'Assigned staff not found' });
      }
      issue.assignedTo = assignedTo;
    }

    // Update other fields if present
    if (title) issue.title = title;
    if (description) issue.description = description;
    if (priority) issue.priority = priority;
    if (status) issue.status = status;

    await issue.save();

    res.status(200).json({
      message: 'Issue updated successfully',
      issue
    });
  } catch (error) {
    console.error('Update Issue Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// @desc    Delete i
const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.json({ message: 'Issue deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
    createIssue,
    getAllIssues,
    getIssueById,
    updateIssue,
    deleteIssue
};