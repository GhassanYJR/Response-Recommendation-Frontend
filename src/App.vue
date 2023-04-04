<script setup></script>

<template>
	<main>
		<div class="flex h-full antialiased text-gray-800">
			<div class="flex flex-row h-screen w-full overflow-hidden">
				<div class="flex flex-col p-3 w-64 h-full bg-white flex-shrink-0">
					<div class="flex flex-row items-center justify-left h-12 w-full">
						<div class="font-bold text-2xl text-left">Chats</div>
					</div>
					<div>
						<div class="mt-2">
							<input
								v-model="searchQuery"
								type="text"
								name="name"
								id="name"
								class="block w-full rounded-md border-0 py-1.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none pl-3"
								placeholder="Search or start a new chat"
							/>
						</div>
					</div>
					<div class="flex flex-col mt-6">
						<div class="flex flex-row items-center justify-between text-xs">
							<span class="font-bold">Active Conversations</span>
							<span class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">{{ activeUserCount }}</span>
						</div>
						<div class="flex flex-col space-y-1 mt-4 -mx-2 h-full overflow-y-auto">
							<button v-for="user in filteredUsers" :key="user.name" class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
								<div class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">{{ user.image }}</div>
								<div class="ml-2 text-sm font-semibold">{{ user.name }}</div>
							</button>
						</div>
					</div>
				</div>
				<div class="flex flex-col flex-auto h-full">
					<div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-screen p-4">
						<div class="flex flex-col h-full overflow-x-auto mb-4">
							<div class="flex flex-col h-full">
								<div class="grid grid-cols-12 gap-y-2" v-for="chat in chats" :key="chat">
									<div class="col-start-1 col-end-8 p-3 rounded-lg" v-if="chat.from === 'agent'">
										<div class="flex flex-row items-center">
											<div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">M</div>
											<div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
												<div>{{ chat.content }}</div>
											</div>
										</div>
									</div>

									<div class="col-start-6 col-end-13 p-3 rounded-lg" v-if="chat.from === 'client'">
										<div class="flex items-center justify-start flex-row-reverse">
											<div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div>
											<div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
												<div>{{ chat.content }}</div>
											</div>
										</div>
									</div>

									<!-- <div class="col-start-1 col-end-8 p-3 rounded-lg">
										<div class="flex flex-row items-center">
											<div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div>
											<div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
												<div class="flex flex-row items-center">
													<button class="flex items-center justify-center bg-indigo-600 hover:bg-indigo-800 rounded-full h-8 w-10">
														<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
														</svg>
													</button>
													<div class="flex flex-row items-center space-x-px ml-4">
														<div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-4 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-12 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-6 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-5 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-4 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-3 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-10 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-1 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-1 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-8 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-2 w-1 bg-gray-500 rounded-lg"></div>
														<div class="h-4 w-1 bg-gray-500 rounded-lg"></div>
													</div>
												</div>
											</div>
										</div>
									</div> -->
								</div>
							</div>
						</div>
						<div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
							<div>
								<button class="flex items-center justify-center text-gray-400 hover:text-gray-600">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
									</svg>
								</button>
							</div>
							<div class="flex-grow ml-4">
								<div class="relative w-full">
									<input type="text" class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10 bg-gray-100" />
									<button class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
										<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
										</svg>
									</button>
								</div>
							</div>
							<div class="ml-4">
								<button class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
									<span>Send</span>
									<span class="ml-2">
										<svg class="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
										</svg>
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>
<script>
export default {
	data() {
		return {
			searchQuery: "",
			users: [
				{ name: "Mohammed", isActive: true, image: "M" },
				{ name: "Tze Byng", isActive: true, image: "B" },
				{ name: "Ghassan Ghassan", isActive: true, image: "G" },
				{ name: "Cristina", isActive: true, image: "C" },
			],
			chats: [
				{ from: "agent", content: "Hello" },
				{ from: "client", content: "How are you?" },
				{ from: "agent", content: "I'm fine" },
				{ from: "agent", content: "How can I help you?" },
			],
		};
	},
	methods: {
		searchUsers(query) {
			return this.users.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()));
		},
	},
	computed: {
		activeUserCount() {
			return this.users.filter((user) => user.isActive).length;
		},
		filteredUsers() {
			return this.searchUsers(this.searchQuery);
		},
	},
};
</script>

<style>
/* width */
::-webkit-scrollbar {
	width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
	background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #8d8d8d;
	border: solid 2px rgba(255, 255, 255, 0.9);
	border-radius: 4px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #555;
}
</style>
