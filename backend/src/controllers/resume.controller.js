import Resume from "../models/Resume.js";

/* CREATE */
export const createResume = async (req, res) => {
  const resume = await Resume.create({
    user: req.userId,
    title: req.body.title || "Untitled Resume",
    template: req.body.template,
    data: req.body.data,
  });

  res.status(201).json(resume);
};

/* GET ALL (user) */
export const getMyResumes = async (req, res) => {
  const resumes = await Resume.find({ user: req.userId }).sort({ updatedAt: -1 });
  res.json(resumes);
};

/* GET ONE */
export const getResume = async (req, res) => {
  const resume = await Resume.findOne({
    _id: req.params.id,
    user: req.userId,
  });

  if (!resume) {
    return res.status(404).json({ message: "Resume not found" });
  }

  res.json({
  _id: resume._id,
  title: resume.title,
  template: resume.template,
  data: resume.data,
});

};

/* UPDATE */
export const updateResume = async (req, res) => {
  const resume = await Resume.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    {
      title: req.body.title,
      template: req.body.template,
      data: req.body.data,
    },
    { new: true }
  );

  if (!resume) {
    return res.status(404).json({ message: "Resume not found" });
  }

  res.json(resume);
};

/* DELETE */
export const deleteResume = async (req, res) => {
  const resume = await Resume.findOneAndDelete({
    _id: req.params.id,
    user: req.userId,
  });

  if (!resume) {
    return res.status(404).json({ message: "Resume not found" });
  }

  res.json({ message: "Resume deleted" });
};
