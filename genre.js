

const cheerio = require("cheerio");
const axios = require("axios");
const baseUrl = "https://books.toscrape.com/catalogue/category/books/";
bookList = [];
async function getGenre(url){
    try{
        const response = await axios.get(baseUrl + url);
        const $ = cheerio.load(response.data);
        const books = $("article");

        books.each(function(){
            title = $(this).find("h3 a").text();
            
            price = $(this).find(".price_color").text();
            bookList.push({title,price})
        });
        console.log(bookList);
    }
    catch(e){
        console.error(`Error on GET : ${e}`);
    }
}
getGenre("travel_2")