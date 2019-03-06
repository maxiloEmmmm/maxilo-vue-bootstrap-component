<template>
    <div>
        <mxl-input-group class="mxl-date">
            <mxl-input readonly="true" v-model="core" @focus="show = true"></mxl-input>
            <mxl-input-group-text slot="append"><i class="fa fa-calendar"></i></mxl-input-group-text>
        </mxl-input-group>
        <mxl-card v-show="show">
            <mxl-list-in-line slot="header">
                <mxl-btn @click="doOneYear(-1)">&lt;&lt;</mxl-btn>
                <mxl-btn @click="doOneMonth(-1)">&lt;</mxl-btn>
                <mxl-btn @click="changeView">{{ `${current.year}` + ( view >= 2 ?  `-${current.month}` : '') + ( view === 3 ?  `-${current.day}` : '') }}</mxl-btn>
                <mxl-btn @click="doOneMonth(1)">&gt;</mxl-btn>
                <mxl-btn @click="doOneYear(1)">&gt;&gt;</mxl-btn>
            </mxl-list-in-line>
            <mxl-box :groups="viewGroup" class="text-center mxl-date-core-box">
                <template v-if="view === 3">
                    <div class="fillDay" v-for="(day, index) in fillOtherDay.prev" :key="index">{{ day }}</div>
                    <div @click="touchDay(day)" v-for="(day, index) in currentDayCount" :key="index" :class="['mxl-date-day-item', current.day == day ? 'active' : '']">{{ day }}</div>
                    <div class="fillDay" v-for="(day, index) in fillOtherDay.next" :key="index">{{ day }}</div>
                </template>
                <template v-if="view === 2">
                    <div v-for="(month, index) in 12" :key="index" @click="touchMonth(month)" :class="[current.month == month ? 'active' : '']">{{ month }}</div>
                </template>
                <template v-if="view === 1">
                    <div v-for="(year, index) in 9" :key="index" @click="touchYear(current.year - 4 + index)" :class="[current.year == (current.year - 4 + index) ? 'active' : '']">{{ current.year - 4 + index }}</div>
                </template>
            </mxl-box>
            <mxl-btn-group size="sm" class="float-right" slot="footer">
                <mxl-btn @click="setCurrent">今天</mxl-btn>
                <mxl-btn @click="show = false">取消</mxl-btn>
            </mxl-btn-group>
        </mxl-card>
    </div>
</template>

<script>
export default {
    name: 'date',
    data(){
        return {
            current: {
                year: 1970,
                month: 1,
                day: 1
            },
            view: 3,
            core: '',
            show: false
        }
    },
    props: {
        split: {
            default: '-',
            type: String
        },
        value: {
            default: '',
            type: String
        }
    },
    watch: {
        value: {
            handler(){
                this.repairValue();
            },
            immediate: true
        }
    },
    methods: {
        doOneYear(fix){
            this.$set(this.current, 'year', this.current.year + fix);
        },
        doOneMonth(fix){
            let t = this.current.month + fix;
            if(t < 1) {
                this.doOneYear(-1);
                t = 12;
            }
            if(t > 12) {
                this.doOneYear(1);
                t = 1;
            }
            this.$set(this.current, 'month', t);
        },
        changeView(){
            if(this.view === 3) {
                this.view = 2;
            }else {
                this.view = 1;
            }
        },
        touchYear(year){
            this.$set(this.current, 'year', year);
            this.input();
            this.view = 2;
        },
        touchMonth(month){
            this.$set(this.current, 'month', month);
            this.input();
            this.view = 3;
        },
        touchDay(day){
            this.$set(this.current, 'day', day);
            this.input();
            this.show = false;
        },
        setCurrent(){
            this.set(new Date());
            this.show = false;
        },
        set(d){
            if(isNaN(d.getFullYear())) {console.log('日期错误: ' + this.value); return ;}
            this.current = {
                year: d.getFullYear(),
                month: d.getMonth() + 1,
                day: d.getDate()
            };
            this.input();
        },
        async input(){
            await this.$nextTick();
            this.core = this._view
            this.$emit('input', this._view);
        },
        repairValue(){
            this.set(new Date(this.value.replace(this.split, '-')));
        }
    },
    computed: {
        _view(){
            return this.current.year + this.split + this.current.month + this.split + this.current.day;
        },
        viewGroup(){
            return [3, 3, 7][this.view - 1];
        },
        isR(){
            return (this.current.year % 4 === 0 && this.current.year % 100 !== 0) || this.current.year % 400 === 0;
        },
        monthDayCount(){
            return [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1].map((v, i) => {
                return i === 2
                    ? this.isR 
                        ? 29 : 28
                    : v === 1 ? 31 : 30
            });
        },
        currentDayCount(){
            return this.monthDayCount[this.current.month];
        },
        firstMonthDayWeek(){
            let i = (new Date(`${this.current.year}-${this.current.month}-1`)).getUTCDay();
            return isNaN(i) ? 0 : i;
        },
        lastMonthDayWeek(){
            let i = (new Date(`${this.current.year}-${this.current.month}-${this.monthDayCount[this.current.month]}`)).getUTCDay();
            return 6 - (isNaN(i) ? 0 : i);
        },
        prevMonthViewDay(){
            let t = parseInt(this.current.month);
            return this.monthDayCount[t === 1 ? 12 : t-1];
        },
        NextMonthViewDay(){
            let t = parseInt(this.current.month);
            return this.monthDayCount[t === 12 ? 1 : t+1];
        },
        fillOtherDay(){
            let prev = [];
            for (let index = 0; index < this.firstMonthDayWeek; index++) {
                prev.push(this.prevMonthViewDay - this.firstMonthDayWeek + index);
            }

            let next = [];
            for (let index = 0; index < this.lastMonthDayWeek; index++) {
                next.push(index + 1);
            }
            return {prev, next};
        }
    },
    created () {
        
    }
}
</script>

<style scoped>
    .fillDay {
        color: #cecece;
    }

    .mxl-date >>> input, .mxl-date >>> .input-group-text {
        background-color: #fff;
    }

    .mxl-date-day-item {
        /* webkit-transition: all .3s;
        transition: all .3s;
        background: #1890ff;
        color: #fff; */
    }

    .mxl-date-core-box >>> .mxl-box-rules:hover{
        background: #1890ff;
        color: #fff;
        cursor:pointer;
        border-radius: 0.2rem;
    }

    .mxl-date-core-box >>> .mxl-box-rules div.active{
        color: #1890ff;
        border-radius: 0.2rem;
    }
    .mxl-date-core-box >>> .mxl-box-rules div.active:hover{
        color: #fff;
    }
</style>


