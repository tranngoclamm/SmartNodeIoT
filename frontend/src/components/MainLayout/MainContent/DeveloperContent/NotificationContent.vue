<template>
    <div class="developer__notification-wrapper">
        <div class="notification-content p-4">
            <div class="notification-channel mb-8">
                <label for="" class="mb-4">Notification Channels</label>
                <div class="row pl-2 mb-2">
                    <div class="col-4">
                        <div class="form-switch d-flex align-items-center ">
                            <input type="checkbox"  v-model="devicePageChecked">
                            <label for="" class="">
                                Device page (website)
                            </label>
                        </div>
                        
                    </div>
                    <div class="col-4 d-flex align-items-center choose-user-type">
                        <div class="d-flex align-items-center mr-3">
                            <input type="checkbox"> <span>Admins</span>
                        </div>
                        <div class="d-flex align-items-center mr-3">
                            <input type="checkbox"> <span>Developers</span>
                        </div>
                        <div class="d-flex align-items-center mr-3">
                            <input type="checkbox"> <span>Users</span>
                        </div>
                    </div>
                    <p class="col-12 mt-2">Sends notifications about device status directly on the website’s device page, ensuring real-time visibility for users based on their roles.</p>
    
                  </div>
                  <div class="row pl-2 mb-2">
                      <div class="form-switch d-flex align-items-center col-4">
                        <input type="checkbox"  v-model="emailChecked">
                        <label for="" class=col-3>
                            Email
                        </label>
                      </div>
                      <div class="col-4 d-flex align-items-center choose-user-type">
                        <div class="d-flex align-items-center mr-3">
                            <input type="checkbox"> <span>Admins</span>
                        </div>
                        <div class="d-flex align-items-center mr-3">
                            <input type="checkbox"> <span>Developers</span>
                        </div>
                        <div class="d-flex align-items-center mr-3">
                            <input type="checkbox"> <span>Users</span>
                        </div>
                    </div>
                      <p class="col-12 mt-2">Sends important alerts and updates directly to registered email addresses, helping users stay informed even when not logged in to the platform.</p>
    
                  </div>
            </div>
            <hr>
            <div class="notification-types mt-4">
                <label for="" class="mb-4">Notification Types</label>
                <div class="row pl-2 mb-2">
                    <div class="form-switch d-flex align-items-center col-4">
                        
                      <input type="checkbox"  v-model="thresholdChecked" @change="resetChildCheckboxes">
                      
                      <label for="">
                          
                          Threshold exceeded notification
                      </label>
                    </div>
                    <div class="col-4 d-flex align-items-center choose-user-type">
                        <div class="d-flex align-items-center mr-3">
                            <input type="checkbox"> <span>Admins</span>
                        </div>
                        <div class="d-flex align-items-center mr-3">
                            <input type="checkbox"> <span>Developers</span>
                        </div>
                        <div class="d-flex align-items-center mr-3">
                            <input type="checkbox"> <span>Users</span>
                        </div>
                    </div>
                    <p class="col-12 mt-2">Triggers alerts when data values exceed predefined limits, ensuring timely action to prevent potential issues.</p>
  
                    <div class="col-12 threshold-notification-content" v-if="thresholdChecked">
                        <div v-for="type in notificationTypes" :key="type.label" class="threshold-notification-item">
                          <label class="col-2">{{ type.label }}</label>
                          <input type="Number" v-model="type.value">
                          <span>{{ type.units }}</span>
                        </div>
                      </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'NotificationContent',
        data() {
            return{
                notificationSettings: '',
                notiModeOn: false,
                devicePageChecked: false,
                emailChecked: false,
                thresholdChecked: false,
                notificationTypes: [],
            };
        },
        methods: {
            resetChildCheckboxes() {
                if (!this.thresholdChecked) {
                    this.devicePageChecked = false;
                }
            },
            fetchNotificationTypes() {
                this.notificationTypes = [
                    { label: 'LIGHT', value: '34', units:'%' },
                    { label: 'HUMIDITY', value: '67', units:'%' },
                    { label: 'SOIL_MOISTURE', value: '45', units:'%' },
                    { label: 'RAINFALL', value: '34', units:'%' }
                ];
            },
        },
        created() {
            this.fetchNotificationTypes();
        },
    }
</script>