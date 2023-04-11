<template>
	<main>
		<div class="flex h-full antialiased text-gray-800">
			<div class="flex flex-row h-screen w-full overflow-hidden">
				<div class="hidden sm:flex flex-col p-3 w-64 h-full bg-white flex-shrink-0">
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
					<div class="flex flex-col mt-6 overflow-x-hidden overflow-y-auto">
						<div class="flex flex-row items-center justify-between text-xs">
							<span class="font-bold">Active Conversations</span>
							<span class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">{{ activeUserCount }}</span>
						</div>
						<div class="flex flex-col space-y-1 mt-4 -mx-2 h-full">
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
									<div class="col-start-6 col-end-13 p-3 rounded-lg" v-if="chat.from === 'agent'">
										<div class="flex items-center justify-start flex-row-reverse">
											<div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div>
											<div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
												<div>{{ chat.content }}</div>
											</div>
										</div>
									</div>
									<div class="col-start-1 col-end-8 p-3 rounded-lg" v-if="chat.from === 'client'">
										<div class="flex flex-row items-center">
											<div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">M</div>
											<div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
												<div>{{ chat.content }}</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="rounded-xl bg-white w-full px-3 py-2 transition" :class="{ 'h-16': isReplied, 'h-auto grid grid-rows-2 gap-2': !isReplied }">
							<div v-if="!isReplied" class="col-span-1 flex justify-end">
								<div class="flex" v-if="lastFrom === 'client'">
									<div v-for="response in suggestedResponse" :key="response" class="mr-1 h-full flex items-center">
										<button class="transition bg-indigo-500 hover:text-indigo-500 hover:bg-transparent rounded-lg py-1 px-2 text-sm text-white outline-none" @click="copyText($event.target)">
											{{ response.response }}
										</button>
									</div>
								</div>
							</div>
							<div class="flex flex-row h-full items-center">
								<div>
									<button class="flex items-center justify-center text-gray-400 hover:text-gray-600">
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
										</svg>
									</button>
								</div>
								<div class="flex-grow ml-4">
									<div class="relative w-full">
										<input
											type="text"
											class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 px-3 h-10 bg-gray-100 truncate"
											ref="textbox"
											id="textbox"
											v-model="newMessage"
											@click="handle({ type: 'prompt', value: true })"
											v-on:blur="handle({ type: 'prompt', value: false })"
										/>
										<!-- <button class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
											<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
											</svg>
										</button> -->
									</div>
								</div>
								<div class="ml-4">
									<form @submit.prevent="addMessage">
										<button class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0" type="submit">
											<span>Send</span>
											<span class="ml-2">
												<svg class="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
												</svg>
											</span>
										</button>
									</form>
								</div>
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
			isReplied: false,
			searchQuery: "",
			users: [
				{ name: "Mohammed", isActive: true, image: "M" },
				{ name: "Tze Byng", isActive: true, image: "B" },
				{ name: "Ghassan Ghassan", isActive: true, image: "G" },
				{ name: "Cristina", isActive: true, image: "C" },
			],
			chats: [
				{ from: "client", content: "Hello" },
				{ from: "client", content: "How are you?" },
				{ from: "agent", content: "I'm fine" },
				{ from: "agent", content: "How can I help you?" },
				{ from: "client", content: "How can I check my order?" },
			],
			suggestedResponse: [
				// { response: "You can try shutdown the laptop or restart it.", isClicked: false },
				// { response: "Try to contact us.", isClicked: false },
			],
			newMessage: "",
			canPush: true,
		};
	},
	methods: {
		handle(e) {},
		searchUsers(query) {
			return this.users.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()));
		},
		copyText(button) {
			const buttonText = button.textContent;
			this.$refs.textbox.value = buttonText;
			this.newMessage = buttonText;
		},
		addMessage() {
			if (this.canPush) {
				this.chats.push({ from: "agent", content: this.newMessage });
				this.newMessage = "";
				this.canPush = true;
				this.isReplied = !this.isReplied;
			}
		},
	},
	computed: {
		activeUserCount() {
			return this.users.filter((user) => user.isActive).length;
		},
		filteredUsers() {
			return this.searchUsers(this.searchQuery);
		},
		lastFrom() {
			return this.chats[this.chats.length - 1].from;
		},
	},
	mounted() {
		const API_BASE = "http://193.168.10.183:5000/suggest";
		if (this.chats[this.chats.length - 1].from === "client") {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ question: this.chats[this.chats.length - 1].content }),
			};
			fetch(API_BASE, requestOptions)
				.then((r) => {
					if (!r.ok) {
						throw Error(r.statusText);
					}
					return r.json();
				})
				.then((d) => this.suggestedResponse.push({ response: d.suggestion, isClicked: false }))
				.catch((error) => console.error(error));

			// { response: "You can try shutdown the laptop or restart it.", isClicked: false }
		}
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
