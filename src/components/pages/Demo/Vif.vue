<template>
    <div class="list-rendering">
        <div>dùng computed để lấy danh sách ok trước, rồi for danh sách đó</div>
        <ul>
            <li v-for="(todo, index) in listCompleteTodo" :key="index">{{ todo.name }} - {{ todo.isComplete }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            todos: [
                {
                    name: "to do 1",
                    isComplete: true
                },
                {
                    name: "to do 2",
                    isComplete: false
                },
                {
                    name: "to do 3",
                    isComplete: true
                }
            ]
        };
    },
    computed: {
        listCompleteTodo() {
            return this.todos.filter(item => item.isComplete);
        }
    }
};
</script>

<style lang="scss" scoped>
</style>