<template>
	<div class="content">
		<div class="row">
			<div class="col-md-12">
				<div class="card">
					<div class="card-header">Google Maps</div>
					<div class="card-body">
						<div id="map" class="map" style="position: relative; overflow: hidden;">
							<p>Vĩ độ: {{ latitude }}</p>
							<p>Kinh độ: {{ longitude }}</p>
							<!-- <div style="height: 100%; width: 100%; position: absolute; top: 0px; left: 0px; background-color: rgb(229, 227, 223);">
								<iframe width="100%" height="100%" style="border:0" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" :src="mapSrc" @load="onMapLoad"></iframe>
							</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
/*global google*/
export default {
  name: 'GoogleMap',
  data() {
    return {
      latitude: 20.960056,
      longitude: 105.753278,
      map: null,
      marker: null,
      intervalId: null,
    };
  },
  mounted() {
    this.initMap();
    this.startUpdatingLocation();
  },
  methods: {
    initMap() {
      const mapOptions = {
        center: { lat: this.latitude, lng: this.longitude },
        zoom: 13,
      };

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      // Tạo một marker cho vị trí
      this.marker = new google.maps.Marker({
        position: { lat: this.latitude, lng: this.longitude },
        map: this.map,
      });
    },
    startUpdatingLocation() {
      // Thiết lập khoảng thời gian để cập nhật vị trí
      this.intervalId = setInterval(() => {
        this.fakeDataLocation();
      }, 2000); // Thay đổi địa chỉ mới mỗi 2 giây
    },
    fakeDataLocation() {
      // Mô phỏng việc chọn địa chỉ mới với delay 500ms
      setTimeout(() => {
        // Tạo tọa độ ngẫu nhiên gần vị trí hiện tại
        const newLatitude = this.latitude + (Math.random() - 0.5) * 0.01; // Chênh lệch ±0.005 độ
        const newLongitude = this.longitude + (Math.random() - 0.5) * 0.01; // Chênh lệch ±0.005 độ

        // Cập nhật vị trí
        this.updatePosition({ lat: newLatitude, lng: newLongitude });
      }, 500);
    },
    updatePosition(latLng) {
      // Cập nhật vĩ độ và kinh độ
      this.latitude = latLng.lat;
      this.longitude = latLng.lng;

      // Cập nhật vị trí của marker
      this.marker.setPosition(latLng);
      // Cập nhật trung tâm bản đồ để phù hợp với vị trí mới
      this.map.setCenter(latLng);
    },
  },
  beforeUnmount() {
    // Dọn dẹp khi component bị hủy
    clearInterval(this.intervalId);
  },
};
</script>
