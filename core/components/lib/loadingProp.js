export default {
    data() {
        return {
            running: false
        };
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        block: {
            default: true
        },
        title: {
            default: '正在处理您的请求',
            type: String
        }
    },
    mounted: function mounted() {
        this.$el.style.cssText = this.$el.style.cssText + ';display: none !important;';
    },

    watch: {
        running: function running() {
            if (this.running) {
                this.showTriggle && this.showTriggle();
            } else {
                this.hideTriggle && this.hideTriggle();
            }
            this.render();
            this.$emit('input', this.running);
        },

        value: {
            handler: function handler() {
                this.running = this.value;
            },

            immediate: true
        }
    },
    methods: {
        render() {
            this.$el.style.cssText = this.$el.style.cssText + ';display: ' + (this.running ? 'flex !important;flex-wrap: wrap;' : 'none !important') + ';';
        },
        show() {
            this.running = true;
        },
        hide() {
            this.running = false;
        },
        async wait(fn) {
            this.show();
            return new Promise(async (ok) => {
                let ds = await fn();
                this.hide();
                ok(ds);
            });
        }
    }
};