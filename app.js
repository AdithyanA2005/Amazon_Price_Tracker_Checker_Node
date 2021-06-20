const nightmare = require('nightmare')();

const args = process.argv.slice(2);
const product_url = args[0];
const expected_price = args[1]; 


async function main() {
    const price_string = await nightmare.goto(product_url)  // This will return us with the entire html from the product_url
                                        .wait('#priceblock_ourprice')  // This will make the program to wait until the element with id="priceblock_ourprice" is parsed
                                        .evaluate(() => document.getElementById('priceblock_ourprice').innerText)  // This will give us the price string
                                        .end()  // This will close these functions

    const current_price = parseFloat(price_string.replace('₹', '')
                                                .replace('$', '')
                                                .replace(',', ''))
    
    
    console.log('\nWELCOME TO AMAZON PRICER');
    console.log('------------------------\n');

    console.log('  - Expect price =>  ' + expected_price);
    console.log('  - Orginal price =>  ' + current_price);
    console.log('\n');

    if (current_price < expected_price) {
        let saved_amount = expected_price - current_price;
        console.log("   => MAN IT'S CHEAPER ITS ONLY");
        console.log("   => MONEY SAVED = " + saved_amount);
    }

    else if (current_price === expected_price) {
        console.log("   => MAN THE PRICE IS STILL THE SAME");
    }

    else {
        let money_needed = current_price - expected_price;
        console.log("   => MAN THE PRICE IS MORE THAN EXPACTATIONS");
        console.log("   => MONEY NEEDED = " + money_needed);
    }
};

main()
