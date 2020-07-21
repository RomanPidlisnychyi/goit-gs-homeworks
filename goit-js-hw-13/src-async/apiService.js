const apiService = {
    proxy: 'https://cors-anywhere.herokuapp.com/',
    baseUrl: 'https://pixabay.com/api/',
    key: '17512246-8cb81e257606609dfb7634e3b',
    query: '',
    page: 1,
    per_page: 12,
    last_page: false,
    get() {
        if (this.last_page) {
            return;
        }
        const url = `${this.baseUrl}?key=${this.key}&q=${this.query}&page=${this.page}&per_page=${this.per_page}`;

        this.page += 1;

        const asyncFetchImages = async() => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data.hits.lengs < this.per_page) {
                    this.page = 1;
                    this.last_page = true;
                }
                return data.hits;
            } catch (error) {
                throw error;
            }
        };

        return asyncFetchImages();
    },
};

export default apiService;