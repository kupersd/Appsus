

export const networkPetService = {
    getNetworkPets
}


// FOR DEBUG
window.serv = networkPetService;

const url = 'http://www.filltext.com/?rows=10&name={firstName}&power={number}&pretty=true'

function getNetworkPets() {
    return axios.get(url)
        // .then(res => res.data)
}