<template>
    <div class="content setting-wrapper">
        <div class="row">
            <!-- Edit Profile Form -->
            <div class="col-md-12">
                <div class="card card-user">
                    <div class="card-header">
                        <h5 class="card-title">Setting </h5>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="row">
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <label>Name</label>
                                        <input spellcheck="false" type="text" class="form-control" placeholder="Name" v-model="project.name" />
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                      <label>Hardware</label>
                                      <select v-model="project.hardware" class="form-control">
                                        <option value="Arduino">Arduino</option>
                                        <option value="Esp8266">Esp8266</option>
                                        <option value="Esp32">Esp32</option>
                                        <option value="Raspberry Pi">Raspberry Pi</option>
                                      </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                      <label>Connection Type</label>
                                      <select v-model="project.connectionType" class="form-control">
                                        <option value="Ethernet">Ethernet</option>
                                        <option value="WiFi">WiFi</option>
                                        <option value="Satellite">Satellite</option>
                                        <option value="GSM">GSM</option>
                                      </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Address</label>
                                        <input spellcheck="false" type="text" class="form-control" placeholder="Home Address" v-model="project.address" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 pr-1">
                                  <div class="form-group">
                                    <label>Owner</label>
                                    <p class="form-control outline-none">{{ project.owner_name }}</p>
                                  </div>
                                </div>
                                <div class="col-md-4 pr-1">
                                  <div class="form-group">
                                    <label>Email</label>
                                    <p class="form-control outline-none">{{ project.owner_email }}</p>
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div class="form-group">
                                    <label>Created At</label>
                                    <p class="form-control font-italic outline-none">{{ project.created_at }}</p>
                                  </div>
                                </div>
                            </div>							  
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Description</label>
                                        <textarea spellcheck="false" class="form-control textarea" style="height: 78px" v-model="project.description"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="update ml-auto mr-auto">
                                    <button type="submit" class="btn btn-primary btn-round">Save Settings</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SettingComponent',
    data() {
        return {
            project: {
                name: 'SmartGreenHouse',
                hardware: 'Esp32', 
                connectionType: 'WiFi', 
                address: '34 Nguyễn Trác, Hà Đông, Hà Nội',
                owner_name: 'Trần Ngọc Tuấn',
                owner_email: 'tuantran53@gmail.com',
                created_at: '5:35 15/10/2024',
                description: 'Oh so, your weak rhyme You doubt I\'ll bother, reading into it',
            }
        };
    }
};
</script>
