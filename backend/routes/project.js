import router from 'express';
import project from '../models/mysql/projects.js';

const projectRouter = router.Router();

projectRouter.get('/project', async (req, res) => {
  try {
    console.log("acaaaaaaa")
    const data = await project.findAll();
    res.json({data});
  } catch (error) {
    console.log("error", error)
    res.status(400).json({data:'error', message: error.message });
  }
})

projectRouter.post('/project', async (req, res) => {
  try {
    const body = req.body;
    const data = await project.create(body);
    res.json({data});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

export default projectRouter;
