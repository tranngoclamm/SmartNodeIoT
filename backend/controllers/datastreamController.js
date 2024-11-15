const Datastream = require('../models/datastreamModel');

async function createDatastream(req, res) {
  const { projectId } = req.params;
  const { datastreamName, status, data } = req.body;

  try {
    const datastreamId = await Datastream.createDatastream(projectId, { datastreamName, status, data });
    res.status(201).json({ message: 'Datastream created successfully', datastreamId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create datastream', error: error.message });
  }
}

async function updateDatastream(req, res) {
    const { projectId, datastreamId } = req.params;
    const { datastreamName, status, data } = req.body;
  
    try {
      await Datastream.updateDatastream(projectId, datastreamId, { datastreamName, status, data });
      res.status(200).json({ message: 'Datastream updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update datastream', error: error.message });
    }
  }

  
  async function deleteDatastream(req, res) {
    const { projectId, datastreamId } = req.params;
  
    try {
      await Datastream.deleteDatastream(projectId, datastreamId);
      res.status(200).json({ message: 'Datastream deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete datastream', error: error.message });
    }
  }

  module.exports = {
    createDatastream,
    updateDatastream,
    deleteDatastream,
  };
  
