export default({
    methods: {
        pred(){
            this[this.countBtn].count--;
        },
        next(){
            this[this.countBtn].count++;
        },
    },
})