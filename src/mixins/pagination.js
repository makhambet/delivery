export default({
    computed: {
        order() {
            return this.$store.getters[this.paginationName]
        },
        filteredPagination(){
            let order = this.order
            const start = this.pageNumber * this.size,
                end = start*1.0 + this.size*1.0;
            this.length = order.length
            this.pageCount = Math.ceil(this.length/this.size)
            this.currentPage = Math.ceil(this.length/this.size)
            let src = this.$store.getters.SEARCH
            if(src)
            {
                order = order.filter(b => 
                b.name.toLowerCase().indexOf(src.toLowerCase()) >= 0)
                this.pageNumber = 0
            }
            return order.slice(start, end)
        },
    },
    methods: {
        prevPage(){
            return this.pageNumber--
        },
        nextPage(){
            return this.pageNumber++
        },
    },
    
})