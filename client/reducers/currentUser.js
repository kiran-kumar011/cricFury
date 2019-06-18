
export const currentUser = (state = {}, action) => {
	switch(action.type) {
		case 'ADD_CURRENT_USER':
		console.log(action.data,'...........reducer data..............');
			return {...action.data};
		case "REMOVE_USER":
			return {};
		default:
			return state;
	}
}

export const recentlyAddedTeam = (state = [], action) => {
	switch(action.type) {
		case 'ADDED_NEW_TEAM':
			return action.data;
		default:
			return state;
	}
}