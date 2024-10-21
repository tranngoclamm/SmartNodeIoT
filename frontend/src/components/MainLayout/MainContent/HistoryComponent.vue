<template>
  <div class="content history-wrapper">
    <!-- Biểu tượng và Input chọn ngày -->
    <div class="header-wrapper d-flex justify-content-between">
      <div class="picker-date">
        <label for="datePicker">Chọn ngày: </label>
        <input type="date" id="datePicker" v-model="selectedDate" @change="updateChartDate" />
      </div>
      <div class="excel-wrapper">
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
    import { Chart } from 'chart.js/auto';

    export default {
      name: 'HistoryComponent',
      data() {
        return {
          chart: null, // Lưu biểu đồ để cập nhật dữ liệu
          selectedDate: new Date().toISOString().split('T')[0], // Lấy ngày hiện tại, theo định dạng YYYY-MM-DD
          labels: [],  // Dữ liệu thời gian tính theo phút trong ngày
          datasets: [],  // Sẽ lưu dữ liệu của các cảm biến, có thể là số lượng động
          colorsChar: ['#FADF73', '#63C7E0', '#FA899E', '#64CCB7', '#87D688', '#4E4E61'],
        };
      },
      mounted() {
        this.setupFakeData();  // Gọi hàm để setup dữ liệu giả
        this.renderChart();
      },
      methods: {
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
              responsive: true,  // Đảm bảo responsive theo kích thước của màn hình
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
                    callback: function(value) {
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
              }
            };

            // Khởi tạo biểu đồ mới
            this.chart = new Chart(ctx, {
              type: 'line',
              data: data,
              options: options,
            });
        },

        // Setup dữ liệu giả lập linh hoạt với số lượng cảm biến khác nhau
        setupFakeData() {
          // Giả lập dữ liệu cho labels (sử dụng giờ trong ngày từ 0 đến 24)
          const fakeData = Array.from({ length: 24 }, (_, index) => ({
            time: index,
            light: Math.floor(Math.random() * 100),
            soilMoisture: Math.floor(Math.random() * 100),
            airHumidity: Math.floor(Math.random() * 100),
            co2: Math.floor(Math.random() * 100),
            temperature: Math.floor(Math.random() * 100),  // Ví dụ thêm cảm biến nhiệt độ
          }));

          // Thiết lập labels (thời gian trong ngày)
          this.labels = fakeData.map(item => `${item.time}`);  // Labels là thời gian theo giờ
          // Tạo datasets linh hoạt, có thể thêm hoặc bớt các cảm biến tùy ý
          const sensorTypes = ['light', 'soilMoisture', 'airHumidity', 'co2', 'temperature'];
          this.datasets = sensorTypes.map((sensor, index) => {
          return {
            label: `${sensor.charAt(0).toUpperCase() + sensor.slice(1)} Sensor`,
            data: fakeData.map(item => item[sensor]),
            borderColor: this.colorsChar[index % this.colorsChar.length], // Sử dụng màu từ colorsChar
            borderWidth: 1,
            fill: false,
            pointRadius: 0,
            showLine: true,
          };
          });
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
