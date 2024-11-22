const db = require('../config/firebaseConfig'); 

const SensorHistory = {
  async saveShortTermData(projectId, pin, value) {
    console.log("saveShortTearm:", projectId, pin, value)
    const timestamp = Date.now();
    const time = new Date(timestamp).toISOString();
  
    const shortTermRef = db.ref(`sensor_histories/${projectId}/${pin}/short_term/${timestamp}`);
    const fiveMinutesAgo = timestamp - 5 * 60 * 1000;
  
    try {
      // Thêm dữ liệu mới
      await shortTermRef.set({
        value,
        time,
      });
  
      // Xóa dữ liệu cũ hơn 5 phút
      const oldDataRef = db.ref(`sensor_histories/${projectId}/${pin}/short_term`);
      const snapshot = await oldDataRef.orderByKey().endAt(String(fiveMinutesAgo)).once('value');
  
      snapshot.forEach((childSnapshot) => {
        childSnapshot.ref.remove();
      });
  
      console.log(`Short-term data saved and old data cleaned for pin ${pin}.`);
    } catch (error) {
      console.error(`Error saving short-term data for pin ${pin}:`, error);
    }
  },  
  
  async saveLongTermData(projectId, pin) {
    console.log("saveLongTearm:", projectId, pin)

    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    const standardThresholdRef = db.ref(`projects/${projectId}/highThreshold`);
    const shortTermRef = db.ref(`sensor_histories/${projectId}/${pin}/short_term`);
  
    try {
      // Lấy giá trị tiêu chuẩn
      const standardSnapshot = await standardThresholdRef.once('value');
      const standardThreshold = standardSnapshot.val();
  
      // Lấy dữ liệu 5 phút gần nhất
      const snapshot = await shortTermRef.orderByKey().startAt(String(fiveMinutesAgo)).once('value');
  
      let maxDeviation = 0;
      let mostDeviatedValue = null;
      let mostDeviatedTime = null;
  
      snapshot.forEach((childSnapshot) => {
        const { value, time } = childSnapshot.val();
        const deviation = Math.abs(value - standardThreshold);
  
        if (deviation > maxDeviation) {
          maxDeviation = deviation;
          mostDeviatedValue = value;
          mostDeviatedTime = time;
        }
      });
  
      // Nếu có dữ liệu lệch, lưu vào long_term
      if (mostDeviatedValue !== null) {
        const date = new Date(fiveMinutesAgo);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minuteBlock = `${String(Math.floor(date.getMinutes() / 5) * 5).padStart(2, '0')}`;
  
        const longTermRef = db.ref(
          `sensor_histories/${projectId}/${pin}/long_term/${year}/${month}/${day}/${hour}:${minuteBlock}`
        );
        await longTermRef.set({
          deviation: maxDeviation,
          value: mostDeviatedValue,
          time: mostDeviatedTime,
        });
  
        console.log(`Long-term data saved for pin ${pin} at ${hour}:${minuteBlock}.`);
      }
    } catch (error) {
      console.error(`Error saving long-term data for pin ${pin}:`, error);
    }
  }  
  
  };

  const DeviceHistory = {
    // Lưu trạng thái thiết bị vào Firebase với pin
    async saveDeviceStatus(projectId, pin, value) {
      const timestamp = Date.now();
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const time = `${date.getHours()}:${date.getMinutes()}`;
  
      const deviceRef = db.ref(`device_histories/${projectId}/${year}/${month}/${day}/${pin}/${time}`);
  
      try {
        await deviceRef.set({
          value: value,
          timestamp: timestamp,
        });
        console.log(`Device status saved successfully for pin ${pin}:`, { value, timestamp });
      } catch (error) {
        console.error(`Error saving device status for pin ${pin}:`, error);
      }
    },
  
    // Xóa dữ liệu cũ hơn 5 phút cho device
    async removeOldDeviceData(projectId) {
        const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    
        try {
          const deviceStatusRef = db.ref(`device_histories/${projectId}`);
          const snapshot = await deviceStatusRef.orderByChild('timestamp').endAt(fiveMinutesAgo).once('value');
    
          snapshot.forEach((childSnapshot) => {
            childSnapshot.ref.remove();
          });
          console.log('Old device data removed successfully!');
        } catch (error) {
          console.error('Error removing old device data:', error);
        }
      } 
  };

const Device = {
  async resetMaxDeviation(projectId) {
    const deviceRef = db.ref(`devices/${projectId}/latest/max_deviation`);

    try {
      await deviceRef.set({
        temperature: 0,
        humidity: 0
      });
      console.log('Max deviation reset successfully!');
    } catch (error) {
      console.error('Error resetting max deviation:', error);
    }
  }
};

module.exports = {
  SensorHistory,
  DeviceHistory,
  Device
};
