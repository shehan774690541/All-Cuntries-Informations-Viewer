<template>
    <div
        style="font-size: 15px; position: fixed; background-color: rgb(255, 255, 255); padding: 5px; border: 1px solid black; border-radius: 10px; bottom: 5px; right: 5px;">
        SAVE AS :
        <button @click="saveToExsell()"
            style="background-color: rgba(207, 233, 255, 0.623); font-size: 20px; border: solid 1px; border-radius: 5px; padding: 0px 10px 0px 10px;">EXSELL</button>
        |
        <button @click="saveTOPDF()"
            style="background-color: rgba(207, 233, 255, 0.623); font-size: 20px; border: solid 1px; border-radius: 5px; padding: 0px 10px 0px 10px;">PDF</button>
    </div>
    <div style="height: 100%; width: 100%; display: flex;" ref="contentToConvert">
        <dataView :columns="tableColumns" :items="tableData" />
    </div>
</template>
  

<script>
import dataView from '@/components/dataView.vue';
import axios from 'axios';
// import html2pdf from 'html2pdf';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';


export default {
    components: {
        dataView,
    },
    data() {
        return {
            tableColumns: [
                { title: 'Flag', key: 'flags', align: 'center' },
                { title: 'Country', key: 'name' },
                { title: 'TLD', align: 'center', key: 'tld' },
                { title: 'Continents', key: 'continents' },
                { title: 'Timezones', key: 'timezones' },
                { title: 'Population', key: 'population' },
                { title: 'Capital', key: 'capital' },
                { title: 'Languages', key: 'languages' },
                { title: 'Currencies', key: 'currencies' },
            ],
            tableData: [],

            data: [
                { name: 'John', age: 30, city: 'New York' },
                { name: 'Jane', age: 25, city: 'Los Angeles' },
                { name: 'Bob', age: 35, city: 'Chicago' },
            ],

        };
    },
    methods: {
        async loadData() {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                console.log(response.data)
                this.tableData = [];

                response.data.forEach(country => {
                    try {
                        this.tableData.push({
                            flags: `<img width="150px" src="${country.flags.png}" />`,
                            name: `<a href="${country.maps.googleMaps}" target="_blank"> ${country.name.common} (${country.cca2})</a>`,
                            tld: country.tld,
                            continents: country.continents,
                            population: country.population,
                            capital: country.capital,
                            languages: Object.values(country.languages).join(', '),
                            currencies: `<b>(${Object.values(country.currencies).map(currency => currency.symbol).join(' , ')})</b> ${Object.values(country.currencies).map(currency => currency.name).join(', ')} `,
                            timezones: Object.values(country.timezones).join(', ')

                        });
                    } catch (error) {
                        console.log(error)
                    }
                });

                // console.log('Table Data:', this.tableData); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        saveTOPDF() {
            try {
                console.log("export pdf...")

                window.print();

                // const content = this.$refs.contentToConvert;

                // html2canvas(content, {
                //     scale: 2,
                //     useCORS: true
                // }).then(canvas => {
                //     const imgData = canvas.toDataURL('image/png');
                //     const pdf = new jsPDF('p', 'mm', 'a4');
                //     const imgWidth = pdf.internal.pageSize.getWidth();
                //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

                //     let position = 0;
                //     let pageHeight = pdf.internal.pageSize.getHeight();
                //     let remainingHeight = imgHeight;

                //     while (remainingHeight > 0) {
                //         pdf.addImage(imgData, 'PNG', 0, position, imgWidth, 0, null, 'NONE');
                //         remainingHeight -= pageHeight;
                //         position -= pageHeight;
                //         if (remainingHeight > 0) {
                //             pdf.addPage();
                //         }
                //     }

                //     pdf.save('document.pdf');
                // });

                console.log("export Successfull!")
            } catch (error) {
                console.error('Error generating PDF:', error);
            }
        },
        saveToExsell() {
            // this.exportToCsv() 
            import('xlsx').then(XLSX => {
                const preprocessedData = this.tableData.map(item => {
                    return {
                        // flags: item.flags.includes('src=') ? { t: 's', v: item.flags } : item.flags,
                        name: item.name.replace(/<[^>]*>/g, ''),
                        tld: (item.tld ? JSON.stringify(item.tld) : '').replace(/\[|\]/g, '').replace(/\"/g, ''),
                        continents: (item.continents ? JSON.stringify(item.continents) : '').replace(/\[|\]/g, '').replace(/\"/g, ''),
                        population: item.population,
                        capital: (item.capital ? JSON.stringify(item.capital) : '').replace(/\[|\]/g, '').replace(/\"/g, ''),
                        languages: item.languages,
                        currencies: item.currencies.replace(/<[^>]*>/g, ''),
                        timezones: item.timezones
                    };
                });

                console.log(preprocessedData)

                const worksheet = XLSX.utils.json_to_sheet(preprocessedData);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
                const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
                const fileName = 'data.xlsx';
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(data);
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        },
    },
    created() {
        this.loadData()
    }

}
</script>
    
<style>
.container {
    background-color: rgba(255, 255, 255, 0.842);
    width: 100%;
    height: 100vh;
    /* display: flex; */
}

.tableBg {
    background-color: coral;
    width: 200px;
    height: 100px;
    border: 1px solid black;
    overflow: scroll;
}
</style>