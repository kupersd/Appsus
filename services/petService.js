import { utilService } from './utilService.js';
import { storageService } from './storageService.js';

const KEY = 'petsDB';
export const petService = {
    query,
    remove,
    save,
    getById,
    getNextPrevPet
};
var gPets;
_createPets();

function _createPets() {
    // Try loading from localStorage
    gPets = storageService.load(KEY);
    if (!gPets || !gPets.length) {
        // Nothing in localStorage, use demo data
        gPets = _getDemoPets()
        _savePetsToStorage();
    }
}


function getNextPrevPet(petId) {
    return {
        prevPetId: null,
        nextPetId: null
    }
}

function query() {
    return Promise.resolve(gPets);
}

function save(pet) {
    if (pet.id) {
        return _update(pet);
    } else {
        return _add(pet);
    }
}

function _add(pet) {
    const petToAdd = {
        id: utilService.makeId(),
        ...pet
    };
    gPets = [petToAdd, ...gPets];
    _savePetsToStorage();
    return Promise.resolve(petToAdd); 
}

function _update(pet) {
    const petToUpdate = {
        ...pet
    };
    const petsCopy = [...gPets];
    const petIdx = petsCopy.findIndex(pet => pet.id === pet.id);
    petsCopy[petIdx] = petToUpdate;
    gPets = petsCopy;
    _savePetsToStorage();
    return Promise.resolve(petToUpdate);
}

function remove(petId) {
    gPets = gPets.filter(pet => pet.id !== petId);
    _savePetsToStorage();
    return Promise.resolve();
}

function getById(petId) {
    const pet = gPets.find(pet => pet.id === petId);
    return Promise.resolve(pet);
}

function _savePetsToStorage() {
    storageService.save(KEY, gPets)
}

function _getDemoPets() {
    const pets = [
        { id: 'i101', name: 'Puki', power: 98 },
        { id: 'i102', name: 'Muki', power: 101 },
        { id: 'i103', name: 'Shuki', power: 8 }
    ];
    return pets;
}