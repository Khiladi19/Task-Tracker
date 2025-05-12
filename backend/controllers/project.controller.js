import { Project } from '../models/project.model.js';


// create project
export const createProject = async (req, res) => {
  const { name } = req.body;

  try {
    const existingProjects = await Project.find({ user: req.user._id });

    if (existingProjects.length >= 4) {
      return res
        .status(400)
        .json({ message: 'You can only create up to 4 projects' });
    }

    const project = new Project({ name, user: req.user._id });
    await project.save();

    res.status(201).json({success:true, message:'Project created',project});
  } catch (error) {
    res.status(500).json({ success:false, message: 'Server error', error: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(201).json({success:true, message:'Project fetech specific id',project});
  } catch (error) {
    res.status(500).json({ success:false, message: 'Server error', error: error.message });
  }
};


// getProject
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id }).populate("tasks");
    res.status(200).json({ success: true, message: 'All projects fetched', projects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};




// deleteProject
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};



// updateProject
export const updateProject = async (req, res) => {
  const { name } = req.body;

  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, message: 'Project updated successfully', project });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
