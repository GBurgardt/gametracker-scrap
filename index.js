const cheerio = require('cheerio');
const rp = require('request-promise');

const getScrapRequest = (method, url) =>
    rp({
        method: method,
        uri: url,
        headers: {
            'User-Agent': 'Request-Promise'
          },
        json:true 
    }).then(
        html => {
            const $ = cheerio.load(
                html,
                { decodeEntities: false }
            );

            return $
        }
    )


const test = () => 
    getScrapRequest('GET', `https://www.gametracker.com/search/mohaa/AR/`)
        .then(
            $ => {
                const test = $('.table_lst_srs tr');
                return test + ""
            }
        )
        .catch(
            ({ message: body, statusCode }) => ({ body, statusCode })
        );


test().then( 
    resp => console.log(resp)
)

