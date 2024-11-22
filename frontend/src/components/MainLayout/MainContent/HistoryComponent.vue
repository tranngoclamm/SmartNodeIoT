<template>
  <div class="content history-wrapper">
    <!-- Biểu tượng và Input chọn ngày -->
    <div class="header-wrapper d-flex justify-content-between">
      <div class="picker-date">
        <label for="datePicker">Chọn ngày: </label>
        <input type="date" id="datePicker" v-model="selectedDate" @change="updateChartDate" />
      </div>
      <div class="excel-wrapper" @click="exportToCSV">
        <img class="fa fa-icon excel-icon" src="@/assets/images/excel-svgrepo-com.svg" alt="" />
        <a href="">Export CSV</a>
      </div>
    </div>

    <!-- Biểu đồ -->
    <div class="chart-container">
      <canvas id="myChart" class="chart"></canvas>
    </div>
  </div>
</template>

<script>
  import {
    Chart
  } from 'chart.js/auto';
  import * as XLSX from "xlsx";
  import {
    getProjectHistories,
  } from '@/services/api';
  export default {
    name: 'HistoryComponent',
    data() {
      return {
        date: '',
        rawData: {},
        historyType: '',
        chart: null, // Lưu biểu đồ để cập nhật dữ liệu
        selectedDate: new Date().toISOString().split('T')[0], // Lấy ngày hiện tại, theo định dạng YYYY-MM-DD
        labels: [], // Dữ liệu thời gian tính theo phút trong ngày
        datasets: [], // Sẽ lưu dữ liệu của các cảm biến, có thể là số lượng động
        colorsChar: ['#FADF73', '#63C7E0', '#FA899E', '#64CCB7', '#87D688', '#4E4E61'],
      };
    },
    mounted() {
      this.initPage();
    },
    methods: {
      async initPage() {
        try {
          // Đảm bảo thứ tự thực thi
          await this.fetchProjectHistories();
          await this.setupFakeData();
          this.renderChart(); // Chỉ gọi khi hai bước trước hoàn tất
        } catch (error) {
          console.error('Error initializing page:', error);
        }
      },
      async fetchProjectHistories() {
        try {
          let projectId = localStorage.getItem("project_id");
          const query = {
            projectId: projectId
          };
          const response = await getProjectHistories(query);
          let project = response.data.data[0].datastreams
          // let data = response.data.data[0].history.long_term
          // this.exportToCSV(data, projects)
          // console.log(this.updateProjectData(data, project))
          const historyData = response.data.data[0].history.long_term;
          this.rawData = this.mapHistoryData(historyData, project);
          console.log("rawdata1", this.rawData)
          // this.exportToCSV(mappedData);
        } catch (error) {
          console.error(error);
          alert("Login failed. Please check your credentials.");
        }
      },
      async fetchProjectHistoriesInDay() {
        try {
          let projectId = localStorage.getItem("project_id");
          const today = new Date();
          this.date =
            `${today.getFullYear()}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}`;
          const query = {
            projectId: projectId,
            date: this.date,
            historyType: 'long_term'
          };
          const response = await getProjectHistories(query);
          let project = response.data.data[0].datastreams
          // let data = response.data.data[0].history.long_term
          // this.exportToCSV(data, projects)
          // console.log(this.updateProjectData(data, project))
          const historyData = response.data.data[0].history.long_term;
          const mappedData = this.mapHistoryData(historyData, project);
          console.log(mappedData)
          this.exportToCSV(mappedData);
        } catch (error) {
          console.error(error);
          alert("Login failed. Please check your credentials.");
        }
      },

      // async setupFakeData() {
      //   try {
      //     // Lấy dữ liệu từ database
      //     const rawData = this.rawData; // Dữ liệu theo ngày
      //     console.log('rawData:', rawData);

      //     // Lấy danh sách các ngày có trong rawData
      //     const daysWithData = Object.keys(rawData);
      //     console.log('daysWithData:', daysWithData);

      //     if (daysWithData.length > 0) {
      //       // Chọn ngày đầu tiên (giả định dữ liệu chỉ có một ngày)
      //       const firstDay = daysWithData[0];
      //       const dataForDay = rawData[firstDay]; // Lấy dữ liệu theo ngày

      //       // Lấy danh sách các giờ trong ngày đó
      //       const hoursWithData = Object.keys(dataForDay);
      //       console.log('hoursWithData:', hoursWithData);

      //       // Tính số giờ có dữ liệu
      //       const numOfHours = hoursWithData.length;
      //       console.log('Number of hours with data:', numOfHours);

      //       // Ví dụ: Lọc và xử lý dữ liệu
      //       const processedData = hoursWithData.map((hour) => {
      //         console.log('dataForDay:', dataForDay)
      //         const hourData = dataForDay[hour];
      //         console.log('hourData:', hourData)
      //         return {
      //           hour,
      //           temperature: hourData.TEMPERATURE ?.Value || null,
      //           humidity: hourData.HUMIDITY ?.Value || null,
      //           light: hourData.LIGHT ?.Value || null,
      //           soilMoisture: hourData.SOIL_MOISTURE ?.Value || null,
      //         };
      //       });

      //       console.log('Processed Data:', processedData);

      //       console.log('crea, ', this.createDataset(processedData))
      //       // Lưu dữ liệu vào một state/reactive property nếu cần
      //       this.processedData = processedData;
      //     } else {
      //       console.warn('No data found in rawData');
      //     }
      //   } catch (error) {
      //     console.error('Error in setupFakeData:', error);
      //   }
      // },


      //         async setupFakeData() {
      //   // Lấy dữ liệu từ database, đây chỉ là ví dụ về cách lấy dữ liệu
      //   const rawData = this.rawData; // Dữ liệu theo ngày
      //   console.log('rawData:',rawData)
      //   const hoursWithData = Object.keys(rawData);  // Lấy danh sách các giờ có dữ liệu
      //   console.log('hoursWithData:',hoursWithData)
      //   const numOfHours = hoursWithData.length;
      //           console.log(numOfHours)
      //   // Nếu dữ liệu có đủ 24 giờ, ta lấy một giá trị cho mỗi giờ
      //   if (numOfHours >= 24) {
      //     this.labels = hoursWithData;  // Sử dụng các giờ làm nhãn
      //     this.datasets = this.createDataset(rawData);
      //   } else {
      //     // Nếu không đủ 24 giờ, ta sẽ phân bổ dữ liệu sao cho có ít nhất 12 giá trị
      //     const targetNum = 12;
      //     const hourGroups = Math.max(Math.floor(targetNum / numOfHours), 1);  // Tính số lượng giá trị cần phân bổ mỗi giờ

      //     // Dữ liệu đã chuẩn bị
      //     let expandedData = [];
      //     for (let hour of hoursWithData) {
      //       const dataForHour = rawData[hour];
      //       for (let i = 0; i < hourGroups; i++) {
      //         expandedData.push(dataForHour);
      //       }
      //     }

      //     // Cập nhật labels và datasets từ dữ liệu mở rộng
      //     this.labels = expandedData.map((_, index) => `${Math.floor(index / hourGroups)}:00`);
      //     this.datasets = this.createDatasetFromExpandedData(expandedData);
      //   }
      // },

      // Tạo datasets từ dữ liệu raw
      createDataset(rawData) {
        const sensorTypes = ['HUMIDITY', 'LIGHT', 'SOIL_MOISTURE', 'TEMPERATURE']; // Các cảm biến
        const hoursWithData = Object.keys(rawData); // Lấy các giờ có dữ liệu
        const numOfHours = hoursWithData.length;

        // Nếu không đủ 24 giờ, tính toán để phân bố đều dữ liệu
        const totalHours = 24;
        const interval = totalHours / numOfHours; // Khoảng cách giữa các giờ trong 24 giờ

        // Dự đoán các giờ để hiển thị, nếu có thiếu thì tính toán
        const fullHours = Array.from({
          length: totalHours
        }, (_, i) => {
          const index = Math.floor(i * interval);
          return hoursWithData[Math.min(index, hoursWithData.length - 1)];
        });

        // Tạo datasets cho các cảm biến
        return sensorTypes.map(sensor => {
          return {
            label: `${sensor.charAt(0).toUpperCase() + sensor.slice(1)}`,
            data: fullHours.map(hour => {
              const sensorData = rawData[hour] && rawData[hour][sensor];
              return sensorData ? sensorData.Value : null; // Trả về giá trị cảm biến, hoặc null nếu không có
            }),
            borderColor: this.colorsChar[sensorTypes.indexOf(sensor) % this.colorsChar.length],
            borderWidth: 1,
            fill: false,
            pointRadius: 0,
            showLine: true,
          };
        });
      },


      // Tạo datasets từ dữ liệu mở rộng (khi không đủ 12 giá trị)
      createDatasetFromExpandedData(expandedData) {
        const sensorTypes = ['HUMIDITY', 'LIGHT', 'SOIL_MOISTURE', 'TEMPERATURE'];
        return sensorTypes.map(sensor => {
          console.log(expandedData)
          return {
            label: `${sensor.charAt(0).toUpperCase() + sensor.slice(1)}`,
            data: expandedData.map(item => item[sensor].Value),
            borderColor: this.colorsChar[sensorTypes.indexOf(sensor) % this.colorsChar.length],
            borderWidth: 1,
            fill: false,
            pointRadius: 0,
            showLine: true,
          };
        });
      },

      renderChart() {
        const ctx = document.getElementById('myChart').getContext('2d');

        // Nếu chart đã tồn tại, hủy bỏ nó trước khi tạo chart mới
        if (this.chart) {
          this.chart.destroy();
        }

        const data = {
          labels: this.labels,
          datasets: this.datasets
        };

        const options = {
          responsive: true, // Đảm bảo responsive theo kích thước của màn hình
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)',
                lineWidth: 1,
              },
              ticks: {
                display: true,
                color: 'rgba(0, 0, 0, 0.65)',
                // Tùy chỉnh các ticks dựa trên độ rộng của màn hình
                callback: function (value) {
                  // Kiểm tra kích thước màn hình và thay đổi ticks
                  if (window.innerWidth <= 768) {
                    return value % 20 === 0 ? value : ''; // Trên điện thoại chỉ hiển thị các giá trị chia cho 20
                  } else {
                    return value % 10 === 0 ? value : ''; // Trên máy tính chỉ hiển thị các giá trị chia cho 10
                  }
                }
              }
            },
            x: {
              title: {
                display: true,
                text: 'Time (hours)'
              },
              grid: {
                display: false,
              },
              ticks: {
                display: true,
                color: 'rgba(0, 0, 0, 0.9)',
              }
            }
          },
          maintainAspectRatio: false, // Đảm bảo tỷ lệ khung hình không thay đổi
          aspectRatio: 1.5, // Bạn có thể tùy chỉnh tỷ lệ khung hình (ví dụ: 2:1)
          // width: 1200, // Kích thước chiều rộng cụ thể
          // height: 940, // Kích thước chiều cao cụ thể
        };

        // Khởi tạo biểu đồ mới
        this.chart = new Chart(ctx, {
          type: 'line',
          data: data,
          options: options,
        });
      },
      organizeDataByDate(combinedData) {
        const organized = {};
        combinedData.forEach((entry) => {
          Object.keys(entry.history).forEach((date) => {
            if (!organized[date]) {
              organized[date] = [];
            }
            organized[date].push({
              time: Object.keys(entry.history[date]),
              ...entry.history[date],
            });
          });
        });
        return organized;
      },


      mapHistoryData(historyData, projectDetails) {
        // console.log("Project Details:", projectDetails); // Log project details to check structure

        // Convert projectDetails to an array
        const projectDetailsArray = Object.values(projectDetails);
        // console.log("Project Details Array:", projectDetailsArray); // Log to verify conversion

        // Tạo pin mapping từ projectDetails
        const pinMapping = projectDetailsArray.reduce((acc, project) => {
          acc[project.pin] = project.name;
          return acc;
        }, {});

        // console.log("Pin Mapping:", pinMapping); // Log pin mapping to verify

        // Log the structure of historyData
        // console.log("History Data:", historyData);

        // Xử lý dữ liệu historyData
        return Object.keys(historyData).reduce((acc, pin) => {
          const pinData = historyData[pin].long_term; // Lấy long_term từ mỗi pin
          // console.log(`Data for ${pin}:`, pinData); // Log data cho từng pin

          // Duyệt qua tất cả các năm, tháng, ngày và thời gian
          Object.keys(pinData).forEach(year => {
            Object.keys(pinData[year]).forEach(month => {
              Object.keys(pinData[year][month]).forEach(day => {
                Object.keys(pinData[year][month][day]).forEach(time => {
                  const entry = pinData[year][month][day][
                    time
                  ]; // Mỗi mục có thông tin deviation, time, value
                  // console.log("Entry for time:", entry); // Log từng mục để kiểm tra

                  const dateKey = `${year}-${month}-${day}`; // Tạo key cho ngày (năm-tháng-ngày)
                  if (!acc[dateKey]) {
                    acc[dateKey] = {}; // Khởi tạo dữ liệu cho ngày nếu chưa có
                  }

                  // Thêm dữ liệu vào acc với key là thời gian (thời gian: pinName)
                  if (!acc[dateKey][time]) {
                    acc[dateKey][time] = {}; // Khởi tạo thời gian nếu chưa có
                  }

                  // Thêm dữ liệu vào acc với key là tên pin (sử dụng pinMapping)
                  acc[dateKey][time][pinMapping[pin]] = {
                    Time: entry.time,
                    Value: entry.value,
                    Deviation: entry.deviation
                  };
                });
              });
            });
          });

          return acc;
        }, {}); // Khởi tạo acc là một đối tượng trống
      },




      exportToCSV() {
        const workbook = XLSX.utils.book_new();
        let data = this.rawData
        // Lặp qua từng ngày trong dữ liệu
        Object.keys(data).forEach((date) => {
          const dailyData = data[date];

          // Chuẩn bị dữ liệu cho mỗi ngày dưới dạng mảng các đối tượng
          const sheetData = [];
          Object.keys(dailyData).forEach((time) => {
            const timeData = dailyData[time];
            sheetData.push({
              Time: time,
              HUMIDITY: timeData.HUMIDITY ? timeData.HUMIDITY.Value : '',
              LIGHT: timeData.LIGHT ? timeData.LIGHT.Value : '',
              SOIL_MOISTURE: timeData.SOIL_MOISTURE ? timeData.SOIL_MOISTURE.Value : '',
              TEMPERATURE: timeData.TEMPERATURE ? timeData.TEMPERATURE.Value : '',
            });
          });

          // Chuyển mảng dữ liệu thành worksheet
          const worksheet = XLSX.utils.json_to_sheet(sheetData);

          // Thêm worksheet vào workbook
          XLSX.utils.book_append_sheet(workbook, worksheet, date);
        });

        // Xuất file Excel
        XLSX.writeFile(workbook, "sensor_data.xlsx");
      },

      updateProjectData(data, project) {
        // Tạo một đối tượng mới để lưu kết quả
        let updatedProject = {};

        // Duyệt qua các pin trong dữ liệu `data`
        for (const pin in data) {
          // Kiểm tra xem `pin` có phải là thuộc tính trực tiếp của `data` hay không
          if (Object.prototype.hasOwnProperty.call(data, pin)) {
            console.log(project);

            // Kiểm tra nếu pin trong `data` tồn tại trong `project`
            if (Object.prototype.hasOwnProperty.call(project, pin)) {
              console.log(pin);

              let pinData = data[pin]; // Lấy dữ liệu tương ứng với pin trong data
              let projectData = project[pin]; // Lấy dữ liệu tương ứng với pin trong project

              // Duyệt qua các thời gian và giá trị trong pinData
              for (const time in pinData) {
                // Kiểm tra xem `time` có phải là thuộc tính trực tiếp của `pinData` không
                if (Object.prototype.hasOwnProperty.call(pinData, time)) {
                  let dataPoint = pinData[time]; // Mỗi điểm dữ liệu (deviation, time, value)

                  // Cập nhật các thuộc tính của project với dữ liệu từ `data`
                  if (dataPoint.value > projectData.highThreshold) {
                    projectData.lastValue = dataPoint.value;
                    projectData.deviation = dataPoint.deviation;
                    projectData.time = dataPoint.time;
                  }
                }
              }

              // Gán lại giá trị đã cập nhật vào đối tượng `updatedProject`
              updatedProject[pin] = projectData;
            }
          }
        }

        // Trả về đối tượng đã được cập nhật
        return updatedProject;
      },


      // exportToCSV(data, projects) {
      //     const workbook = XLSX.utils.book_new();

      //     // Lặp qua từng ngày trong data
      //     Object.keys(data).forEach((date) => {
      //       console.log(date)
      //       const sheetData = [];

      //       // Lặp qua các sensor (V1, V2, V3, V4)
      //       Object.keys(data[date]).forEach((sensorPin) => {
      //         const sensorHistory = data[date][sensorPin];

      //         // Lấy thông tin sensor từ projects
      //         const sensorInfo = projects[sensorPin];

      //         // Lặp qua từng thời gian trong lịch sử của sensor
      //         Object.keys(sensorHistory).forEach((time) => {
      //           const historyEntry = sensorHistory[time];

      //           // Thêm dữ liệu vào sheetData
      //           sheetData.push({
      //             Time: historyEntry.time,
      //             SensorName: sensorInfo ? sensorInfo.name : `Unknown (${sensorPin})`,
      //             Pin: sensorPin,
      //             Value: historyEntry.value,
      //             Deviation: historyEntry.deviation,
      //             Description: sensorInfo ? sensorInfo.description : 'No Description',
      //             Unit: sensorInfo ? sensorInfo.unit : 'N/A'
      //           });
      //         });
      //       });

      //       // Chuyển sheetData thành worksheet
      //       const worksheet = XLSX.utils.json_to_sheet(sheetData);

      //       // Thêm worksheet vào workbook với tên sheet là ngày (date)
      //       XLSX.utils.book_append_sheet(workbook, worksheet, date);
      //     });

      //     // Xuất file CSV
      //     XLSX.writeFile(workbook, "sensor_data.xlsx");
      //   },

      // // Setup dữ liệu giả lập linh hoạt với số lượng cảm biến khác nhau
      setupFakeData() {
        const rawData = this.rawData; // Dữ liệu từ Proxy Object

        // Chuyển đổi rawData thành mảng mới với cấu trúc yêu cầu
        const processedData = Object.keys(rawData['2024-11-22']).map(hour => {
          const data = rawData['2024-11-22'][hour]; // Lấy dữ liệu cho từng giờ (ví dụ: "06:40")

          return {
            hour: hour, // Giữ lại giờ
            humidity: data.HUMIDITY ?.Value, // Lấy giá trị độ ẩm
            light: data.LIGHT ?.Value, // Lấy giá trị ánh sáng
            soilMoisture: data.SOIL_MOISTURE ?.Value, // Lấy giá trị độ ẩm đất
            temperature: data.TEMPERATURE ?.Value // Lấy giá trị nhiệt độ
          };
        });

        console.log(processedData);

        console.log("3", this.rawData)
        // Chuyển dữ liệu processedData thành fakeData có cấu trúc mong muốn
        const fakeData = processedData.map(item => ({
          time: item.hour, // Chuyển hour sang index (0 đến 23)
          light: item.light,
          soilMoisture: item.soilMoisture,
          airHumidity: item.humidity,
          temperature: item.temperature
        }));

        console.log('Updated fakeData: ', fakeData);

        // Cập nhật labels cho chart hoặc các mục khác nếu cần
        this.labels = fakeData.map(item => item.time); // Cập nhật lại labels
        this.datasets = this.createDatasetsFromFakeData(fakeData); // Cập nhật lại datasets từ fakeData
      },

      // Hàm chuyển đổi giờ sang index
      convertHourToTimeIndex(hour) {
        const [hours, minutes] = hour.split(':').map(Number);
        console.log(minutes)
        return hours; // Chỉ lấy phần giờ, nếu cần có thể điều chỉnh thêm cho phút
      },

      // Tạo datasets từ fakeData
      createDatasetsFromFakeData(fakeData) {
        console.log(fakeData)
        const sensorTypes = ['light', 'soilMoisture', 'airHumidity', 'temperature'];
        return sensorTypes.map((sensor, index) => ({
          label: `${sensor.charAt(0).toUpperCase() + sensor.slice(1)}`,
          data: fakeData.map(item => item[sensor]),
          borderColor: this.colorsChar[index % this.colorsChar.length],
          borderWidth: 1,
          fill: false,
          pointRadius: 0,
          showLine: true
        }));
      },

      // Cập nhật biểu đồ khi thay đổi ngày
      updateChartDate() {
        // Reset dữ liệu cho ngày mới, có thể thêm logic tải dữ liệu theo ngày nếu cần
        this.setupFakeData();
        this.renderChart();
      },
    }
  };
</script>