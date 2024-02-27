<!-- Example usage -->
<template>
  <div>
    <dataView :columns="tableColumns" :items="tableData" />
  </div>
</template>

<script>
import dataView from '@/components/dataView.vue';

export default {
  components: {
    dataView
  },
  data() {
    return {
      tableColumns: [
        { title: 'Name', key: 'name' },
        { title: 'Age', key: 'age' },
        { title: 'Age', key: 'age' },
        // Add more columns as needed
      ],
      tableData: [
        { id: 1, name: 'John', age: 30 },
        { id: 2, name: 'Jane', age: 25 },
        // Add more data rows as needed
      ]
    };
  }
}
</script>
