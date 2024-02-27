import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
    state: () => ({
        searchBar: "",
        SelectedUserType: "",
        loginData: [],

        // ===================== Create card information =====================
        createCard: {
            imgFrontSide: "",
            imgBackSide: "",
            name: "",
            companyName: "",
            designation: "",
            emailRequired: "",
            emailOptional: "",
            contactNoRequired: "",
            contactNoOptional: "",
            address: "",
            website: "",
            tags: "",
            searchBar: "",
        },

    }),
    actions: {
        updateSearchBar(newData){
            this.searchBar = newData;
            this.saveToLocalStorage()
        },        
        updateCard(newCardData) {
            this.createCard = { ...this.createCard, ...newCardData };
            this.saveToLocalStorage();
        },

        loadFromLocalStorage() {
            const storedData = localStorage.getItem('createCard');
            if (storedData) {
                this.createCard = JSON.parse(storedData);
            }
        },

        saveToLocalStorage() {
            localStorage.setItem('createCard', JSON.stringify(this.createCard));
        },

        saveImageFront(imgUrl) {
            this.createCard.imgFrontSide = imgUrl;
            this.saveToLocalStorage();
        },

        saveImageBack(imgUrl) {
            this.createCard.imgBackSide = imgUrl;
            this.saveToLocalStorage();
        },

        clearCreateCard() {
            this.createCard = {
                imgFrontSide: "",
                imgBackSide: "",
                name: "",
                companyName: "",
                designation: "",
                emailRequired: "",
                emailOptional: "",
                contactNoRequired: "",
                contactNoOptional: "",
                address: "",
                website: "",
                tags: "",
            };
            this.saveToLocalStorage();
        },
    },
})



