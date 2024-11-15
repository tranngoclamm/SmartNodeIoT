const db = require('../config/firebaseConfig');

const Datastream = {
  async createDatastream(projectId, data) {
    const datastreamRef = db.ref(`projects/${projectId}/datastreams`).push();
    await datastreamRef.set({
      datastreamName: data.datastreamName,
      status: data.status || false,
      data: data.data || '',
      createdAt: new Date().toISOString()
    });
    return datastreamRef.key;
  },

  async updateDatastream(projectId, datastreamId, data) {
    await db.ref(`projects/${projectId}/datastreams/${datastreamId}`).update(data);
  },

  async deleteDatastream(projectId, datastreamId) {
    await db.ref(`projects/${projectId}/datastreams/${datastreamId}`).remove();
  }
};

module.exports = Datastream;
