const cheerio = require("cheerio");
const axios = require("axios");
const url = "https://books.toscrape.com/catalogue/category/books/mystery_3/index.html";
const baseUrl = "https://books.toscrape.com/catalogue/category/books/mystery_3/";
const bookList = [];


async function getBooks(url){
    try{
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const books = $("article");

        books.each(function(){
            title = $(this).find("h3 a").text();
            
            price = $(this).find(".price_color").text();
            bookList.push({title,price})
        });
        if($(".next a").length > 0){
            nextpage = baseUrl +$(".next a").attr("href");
            getBooks(nextpage)
        }else{
            console.log(bookList);
        }
        
    }
    catch(e){
        console.error(`Error on GET : ${e}`);
    }
}


getBooks(url);