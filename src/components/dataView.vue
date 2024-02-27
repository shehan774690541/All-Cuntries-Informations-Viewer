<template>
    <div style="height: 80vh;">
      <table>
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.key">{{ column.title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" @click="handleRowClick(item)">
            <td v-for="column in columns" :key="column.key" v-bind:style="{ textAlign: column.align }" v-html="renderCellContent(item[column.key])"></td>
          </tr>
        </tbody>
      </table>
      
    </div>
  </template>
  
  
<script>
export default {
    props: {
        columns: {
            type: Array,
            required: true
        },
        items: {
            type: Array,
            required: true
        }
    },
    methods: {
        handleRowClick(item) {
            // Handle row click event, e.g., navigate to the unique link
            // console.log('Clicked row:', item);
            let items = item
            if (items) {
                null
            }
            // Example: window.location.href = item.uniqueLink;
        },
        renderCellContent(content) {
            // Render HTML content in table cell
            return content;
        }
    }
}
</script>
  
<style scoped>
table {
    /* border: solid 1px; */
    border: none;
}

th {
    padding: 0px 20px 0px 10px;
    color: rgb(0, 0, 0);
    background: linear-gradient(to bottom, #fff, #5c6d7786);


}

tr:nth-child(2n+2) {
    background-color: #c4e9ff67;
    /* Light gray */
}
</style>
  

<!-- <template>
    <div class="table-container">
        <v-data-table-virtual :headers="headers" :items="data" item-value="name"></v-data-table-virtual>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    data() {
        return {
            headers: [
                { title: 'Country', align: 'center', key: 'name.common' },
                { title: 'Top-Level Domain.', align: 'end', key: 'tld' },
                { title: 'Length (m)', align: 'end', key: 'length' },
                { title: 'Price ($)', align: 'end', key: 'price' },
                { title: 'Year', align: 'end', key: 'year' },
            ],
            data: []
        }
    },
    methods: {
        
        fetchData() {
            console.log("sdata");
            const url = 'https://restcountries.com/v3.1/all';

            axios.get(url)
                .then(response => {
                    console.log("Complete request");
                    this.data = response.data
                })
                .catch(error => {
                    console.log('Error fetching data:', error);
                    this.data = null
                });
        }

    },
    created() {
        this.fetchData()
    }
}
</script>

<style scoped>
.table-container {
    height: 400px;
    /* Adjust as needed */
    overflow: auto;
}
</style> -->