<template>
	<div class="content user-profile">
		<div class="row">
			<!-- Profile Card -->
			<div class="col-md-4">
				<div class="card card-user">
					<div class="image">
						<img class="cover_photo" :src="user.coverPhoto" alt="Cover Photo" />
					</div>
					<div class="card-body">
						<div class="author">
							<a href="#">
								<img class="avatar border-gray" :src="user.avatar" alt="Avatar" />
								<h5 class="title">{{ user.fullName }}</h5>
							</a>
							<p class="description">
								@{{ user.username }}
							</p>
						</div>
						<p class="description text-center">
							"{{ user.quote }}"
						</p>
					</div>
					<div class="card-footer">
						<hr />
						<div class="button-container mt-3 ml-3" style="width: 100%">
							<div class="row" style="width: 100%">
								<div class="col-lg-4 col-md-4 col-4 ml-auto pl-4">
									<h5 class="pl-4">{{ user.files }}<br><small>Files</small></h5>
								</div>
								<div class="col-lg-4 col-md-4 col-4 ml-auto mr-auto">
									<h5 class="pl-2">{{ user.usedStorage }}<br><small>Used</small></h5>
								</div>
								<div class="col-lg-4 col-md-4 col-4 ml-auto mr-auto">
									<h5 class="pl-2">{{ user.spent }}<br><small>Spent</small></h5>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Edit Profile Form -->
			<div class="col-md-8">
				<div class="card card-user">
					<div class="card-header">
						<h5 class="card-title">Edit Profile</h5>
					</div>
					<div class="card-body">
						<form>
							<div class="row">
								<div class="col-md-5 pr-1">
									<div class="form-group">
										<label>Fullname</label>
										<input type="text" class="form-control" placeholder="Fullname" v-model="user.fullName" />
									</div>
								</div>
								<div class="col-md-3 px-1">
									<div class="form-group">
										<label>Username</label>
										<input type="text" class="form-control" placeholder="Username" v-model="user.username" />
									</div>
								</div>
								<div class="col-md-4 pl-1">
									<div class="form-group">
										<label>Email address</label>
										<input type="email" class="form-control" placeholder="Email" v-model="user.email" />
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<div class="form-group">
										<label>Address</label>
										<input type="text" class="form-control" placeholder="Home Address" v-model="user.address" />
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-4 pr-1">
									<div class="form-group">
										<label>Phone number</label>
										<input type="number" class="form-control" placeholder="Phone number" v-model="user.phoneNumber" />
									</div>
								</div>
								<div class="col-md-4 pr-1">
									<div class="form-group">
										<label>City</label>
										<input type="text" class="form-control" placeholder="City" v-model="user.city" />
									</div>
								</div>
								<div class="col-md-4 ">
									<div class="form-group">
										<label>Birthday</label>
										<input type="text" class="form-control" placeholder="Birthday" v-model="user.birthday" />
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<div class="form-group">
										<label>About Me</label>
										<textarea class="form-control textarea" style="height: 78px" v-model="user.aboutMe"></textarea>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="update ml-auto mr-auto">
									<button type="submit" class="btn btn-primary btn-round">Update Profile</button>
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
	name: 'UserProfile',
	data() {
		return {
			user: {
				fullName: 'Chet Faker',
				username: 'chetfaker',
				email: 'chetfaker@example.com',
				address: '123 Main St, Melbourne, Australia',
				phoneNumber: '123456789',
				city: 'Melbourne',
				birthday: '12/12/2024',
				aboutMe: 'Oh so, your weak rhyme You doubt I\'ll bother, reading into it',
				quote: 'I like the way you work it\nNo diggity\nI wanna bag it up',
				coverPhoto: require('@/assets/images/damir-bosnjak.jpg'),
				avatar: require('@/assets/images/mike.jpg'),
				files: 12,
				usedStorage: '2GB',
				spent: '24,6$',
			}
		};
	}
};
</script>
