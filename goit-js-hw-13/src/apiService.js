const apiService = {
    proxy: 'https://cors-anywhere.herokuapp.com/',
    baseUrl: 'https://pixabay.com/api/',
    key: '17512246-8cb81e257606609dfb7634e3b',
    query: '',
    page: 1,
    per_page: 12,
    last_page: false,
    get() {
        const url = `${this.baseUrl}?key=${this.key}&q=${this.query}&page=${this.page}&per_page=${this.per_page}`;

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                return data.hits;
            })
            .catch(error => console.error(error));
    },
};

export default apiService;